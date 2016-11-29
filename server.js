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
app.use("/fonts", express.static("fonts", {index: false}));

app.set("view engine", "ejs");
app.set("Views", __dirname + "/Views");

app.get("/", function (req, res) {
  res.render("index.ejs", {layout: "layout.ejs", eventListForm: "eventListForm.ejs"});
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
  res.render("myAccount.ejs", {layout: "layout.ejs", eventListForm: "eventListForm.ejs"});
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
  var table = "user";

  request.put({
    url: [dbUrl, table, id].join('/'),
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
    
    var table = "user";

    request.get({
      url: [dbUrl, table, id].join('/'),
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

    var table = "user";

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

app.post("/ChangePassword", function(req, res){
    var id = req.body.username;
    var password = req.body.password;
    var newPassword = req.body.newPassword;

    var table = "user";

    couchDbContext.getData(dbUrl, table, id, function(error, response, body){
        callback(response.body);
    });

    function callback(response){
      //console.log(response);
      if (response.password !== md5(password)){
        alert('Password is incorrect');
        res.send(false).end();
      } else {
        couchDbContext.saveData(dbUrl, table, id, {
          _id: response._id,
          _rev: response._rev,
          password: md5(newPassword)
        }, function(response){
          console.log(response);
        })
      }
    }

    res.send(true).end();

});

app.post("/CreateEvent", function(req, res) {
    var temporaryDate = new Date();

    var id = temporaryDate.getTime(); 
    var table = "event";

    request.put({
      url: [dbUrl, table, id].join('/'),
      header: 'Content-Type: application/json',
      body:{
        eventName: req.body.eventName,
        tag: req.body.tag,
        date: req.body.date,
        location: req.body.location,
        invitees: req.body.invitees,
        description: req.body.description,
        eventHost: req.body.eventHost,
        isActive: req.body.isActive
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

app.post('/HostedEvent', function(req,res){
    var username = req.body.username;
    var viewName = req.body.viewName;
    var table = 'event';

    /*
    couchDbContext.viewData(dbUrl, table, 'event', 'getAllEvents', null, function(error, response, body){
      callback(response);
    });

    function callback(response){
      console.log(response);
    }
    */

    //var searchKeyword = (typeof searchKeyword === undefined) ? '' : '"?key="' + searchKeyword + '"';

    request({
        method: 'GET',
        url: [dbUrl, table, '_design', 'event', '_view', viewName + '?key="' + username + '"'].join('/'),
        json: true
    },function(error, response, body){
      if (error){
        console.log(error);
      } else if (body.error){
        console.log(body.error);
      } else {
        console.log(body.rows);
        res.send(body.rows).end();
      }
    });
});

app.post('/JoinedEvent', function(req,res){
    var username = req.body.username;
    var viewName = req.body.viewName;
    var table = 'event';

    request({
        method: 'GET',
        //url: [dbUrl, table, '_design', 'event', '_view', viewName + '?startkey="' + username + '"&endkey="' + username + 'ZZZZZ"'].join('/'),
        url: [dbUrl, table, '_design', 'event', '_view', viewName + '?startkey=["' + username + '"]&endkey={}'].join('/'),
        json: true
    },function(error, response, body){
      if (error){
        console.log(error);
      } else if (body.error){
        console.log(body.error);
      } else {
        console.log(body.rows);
        res.send(body.rows).end();
      }
    });
});

app.post('/UserList', function(req,res){
    var username = req.body.username;
    var viewName = req.body.viewName;
    var table = 'user';

    request({
        method: 'GET',
        url: [dbUrl, table, '_design', 'user', '_view', viewName + '?startkey="' + username + '"&endkey="' + username + 'ZZZZZ"'].join('/'),
        json: true
    },function(error, response, body){
      if (error){
        console.log(error);
      } else if (body.error){
        console.log(body.error);
      } else {
        console.log(body.rows);
        res.send(body.rows).end();
      }
    });
});

app.post('/EventSearchList', function(req,res){
    var keyword = req.body.keyword;
    var viewName = req.body.viewName;
    var table = 'event';

    request({
        method: 'GET',
        url: [dbUrl, table, '_design', 'event', '_view', viewName + '?startkey="' + keyword + '"&endkey="' + keyword + 'ZZZZZ"'].join('/'),
        json: true
    },function(error, response, body){
      if (error){
        console.log(error);
      } else if (body.error){
        console.log(body.error);
      } else {
        console.log(body.rows);
        res.send(body.rows).end();
      }
    });
});

app.post('/ValidateUserInEvent', function(req,res){
      var eventId = req.body.eventId;
      var table = 'event';

      request({
        url: [dbUrl, table, eventId].join('/'),
        header: "Content-Type: application-json",
        json: true
      }, function(error, response, body){
        if (error){
          console.log(error);
        } else if (body.error){
          console.log(body.error);
          res.send(body.error).end();
        } else {
          console.log(body);
          res.send(body.eventHost).end();
        }
      });
});

app.post('/UpdateEvent', function(req,res){
    var table = 'event';
    var eventId = req.body.eventId;
    var eventName = req.body.eventName;
    var date = req.body.date;
    var description = req.body.description;
    var eventHost = req.body.eventHost;
    var invitees = req.body.invitees;
    var isActive = req.body.isActive;
    var location = req.body.location;
    var tag = req.body.tag;

    console.log(invitees);

    couchDbContext.getData(dbUrl, table, eventId, function(error, response, body){
        callback(response.body);
    });

    function callback(response){
        couchDbContext.saveData(dbUrl, table, eventId, {
          _id: response._id,
          _rev: response._rev,
          date: date,
          description: description,
          eventHost: eventHost,
          eventName: eventName,
          invitees: invitees,
          isActive: isActive,
          location: location,
          tag: tag
        }, function(response){
          //console.log(response);
        });
      }

    res.send(true).end();
});

app.post('/DeleteEvent', function(req, res){
    var rev_id = req.body.rev_id;
    var eventId = req.body.eventId;
    var table = 'event';

    request({
        method: 'DELETE',
        url: [dbUrl, table, eventId + '?rev=' + rev_id].join('/'),
        json: true
    },function(error, response, body){
      if (error){
        console.log(error);
        res.send(error).end();
      } else if (body.error){
        console.log(body.error);
        res.send(body.error).end();
      } else {
        console.log(body);
        res.send(body).end();
      }
    });
});

app.listen(8000, function(){
    console.log("The server is listening port 8000");
});