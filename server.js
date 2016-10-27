var express = require("express"),
    request = require("request"),
    bodyParser = require("body-parser"),
    http = require("http"),
    md5 = require("md5"),
    randomString = require("randomstring"),
    cookieParser = require("cookie-parser"),
    couchDbContext = require("couchdb-dbcontext"),
    emailSender = require("emailsender"),
    app = express();

// for parsing application/json
app.use(bodyParser.json());

app.use(cookieParser());

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// vars for Couch DB
var dbUrl = "http://localhost:5984/";
//var db = "eventapp/";

// url for creating CouchDB databse
// http://localhost:5984/user
// http://localhost:5984/event

// Load script files when http server starts
app.use("/scripts", express.static("scripts", {index: false}));
app.use("/CSS", express.static("CSS", {index: false}));
app.use("/Models", express.static("Models", {index: false}));

app.set("view engine", "ejs");
app.set("Views", __dirname + "/Views");

app.get("/", function (req, res) {
  res.render("index.ejs", {layout: "layout.ejs"});
});

app.get("/signin", function (req, res) {
  res.render("signin.ejs", {layout: "layout.ejs"});
});

app.get("/signup", function (req, res) {
  res.render("signup.ejs", {layout: "layout.ejs"});
});

app.get("/forgotpassword", function (req, res) {
  res.render("forgotPassword.ejs", {layout: "layout.ejs"});
});

app.get("/myaccount", function (req, res) {
  res.render("myAccount.ejs", {layout: "layout.ejs"});
});

app.get("/signout", function (req, res) {
  //console.log(req.headers.cookie);
  res.clearCookie(req.headers.cookie, {path: "/"});
  res.render("index.ejs", {layout: "layout.ejs"});
});

app.get('/createevent', function (req, res) {
  res.render('createEvent.ejs', {layout: 'layout.ejs'});
});

app.post("/signup", function(req, res){
  var id = req.body.userName;
  var table = "user/";

  request.put({
    url: dbUrl + table + id,
    header: "Content-Type: application/json",
    body:{
      email: req.body.email,
      password: md5(req.body.password)
      // Password is hashed in md5
    },
    json: true
  }, function(error, response, body){
    if(error){
      console.log(error);
      res.send(error);
    }
    else if(body.error){
      console.log(body.error);
      res.send(body.error);
    }
    else{
      console.log("The account has been successfully created.");
      res.end();
    }
  });
});

app.post("/signin", function(req, res){
    var id = req.body.userName;
    var password = md5(req.body.password);
    // Password is hashed in md5
    
    var table = "user/";

    request.get({
      url: dbUrl + table + id,
      header: "Content-Type: application-json",
      json: true
    }, function(error, response, body){
      if(error){
        console.log(error);
        res.send(error);
      }
      else if(body.error){
        console.log(body.error);
        res.send(body.error);
        //Couch DB returns data with "error" field.
      }
      else{
        if (password === body.password){
          console.log("Log in: " + id + ", " + Date.now());
          res.send("Valid account").end();
        } else {
          res.send("Password incorrect").end();
        }
      }
    });
});

app.post("/ForgotPassword", function(req, res){
    var id = req.body.userName;
    var email = req.body.email;

    var table = "user/";

    couchDbContext.getData(dbUrl, table, id, function(error, response, body){
        callback(response.body);
    });

    //callback function for user data retrieval
    function callback(response){
        if (response._id && (response.email === email)){
            var newPassword = randomString.generate(7);
            var newPasswordEncrypted = md5(newPassword);
            
            var emailContents = emailSender.setEmailContents(response.email, "Your password has been reset", "New Password: " + newPassword);
            emailSender.sendEmail(emailContents);

            couchDbContext.saveData(dbUrl, table, id, {
              _id: response._id,
              _rev: response._rev,
              email: response.email,
              password: newPasswordEncrypted
            }, function(response){
              console.log("log from server.js" + response); 
            });

            res.send(true).end();
        } else {
          res.send(false).end();
        }
    }
});

app.post("/CreateEvent", function(req, res) {
    var temporaryDate = new Date();

    var id = temporaryDate.getTime(); 
    var table = "event/";

    request.put({
      url: dbUrl + table + id,
      header: 'Content-Type: application/json',
      body:{
        eventName: req.body.eventName,
        tag: req.body.tag,
        date: req.body.date,
        location: req.body.location,
        invitees: req.body.invitees,
        description: req.body.description
      },
      json: true
    }, function(error, response, body){
    if(error){
      console.log(error);
      res.send(error);
    }
    else if(body.error){
      console.log(body.error);
      res.send(body.error);
    }
    else{
      console.log('The event has been succesfully created.');
      res.end();
    }
  });
});

app.listen(8000, function(){
    console.log("The server is listening port 8000");
});