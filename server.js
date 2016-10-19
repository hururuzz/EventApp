var express = require("express"),
    request = require("request"),
    bodyParser = require("body-parser"),
    http = require("http"),
    md5 = require("md5"),
    randomString = require('randomstring'),
    cookieParser = require("cookie-parser"),
    emailer = require("nodemailer"),
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
          res.end("Valid account");
        } else {
          res.send("Password incorrect");
        }
      }
    });
});

app.post("/ForgotPassword", function(req, res){
    var id = req.body.userName;
    var email = req.body.email;

    var table = "user/";

    var doc = JSON.parse(randomString.generate(7));
    console.log(doc);
    
    request.put({
      url: dbUrl + table + id,
      header: "Content-Type: application/json",
      json: true,
      body: doc
    }), function(error, response, body){
        if(error){
          console.log(error);
          res.send(error).end();  
        } else if (body.error){
          console.log(body.error);
          res.send(body.error).end();
        } else {
          console.log(response.body);
          res.send(response.body).end();
        }
    };
});



app.listen(8000, function(){
    console.log("The server is listening port 8000");
});