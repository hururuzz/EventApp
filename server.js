var express = require('express'),
    request = require('request'),
    bodyParser = require('body-parser'),
    http = require('http'),
    emailer = require('nodemailer'),
    app = express();

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// vars for Couch DB
var dbUrl = 'http://localhost:5984/';
var db = 'eventapp/';

// command for creating CouchDB databse
// http://localhost:5984/evetapp

// Load script files when http server starts
app.use('/scripts', express.static('scripts', {index: false}));
app.use('/CSS', express.static('CSS', {index: false}));
app.use('/Models', express.static('Models', {index: false}));

app.set('view engine', 'ejs');
app.set('Views', __dirname + '/Views');

app.get('/', function (req, res) {
  res.render('index.ejs', {layout: 'layout.ejs'});
});

app.get('/signin', function (req, res) {
  res.render('signin.ejs', {layout: 'layout.ejs'});
});

app.get('/signup', function (req, res) {
  res.render('signup.ejs', {layout: 'layout.ejs'});
});

app.get('/myaccount', function (req, res) {
  res.render('myAccount.ejs', {layout: 'layout.ejs'});
});


app.post('/signup', function(req, res){
  var id = Date.now();

  request.put({
    url: dbUrl + db + id,
    header: 'Content-Type: application/json',
    body:{
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    },
    json: true
  }, function(error, response, body){
    if(error){
      return console.error(error);
    }
    else{
      console.log('The account has been successfully created.', body);
      res.end();
    }
  });
});

app.get('/signin', function(req, res){

});



app.listen(8000, function(){
    console.log('The server is listening port 8000');
});