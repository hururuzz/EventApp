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


// Load script files when http server starts
app.use('/scripts', express.static('scripts', {index: false}));

app.set('view engine', 'ejs');
app.set('Views', __dirname + '/Views');

app.get('/', function (req, res) {
  res.render('index.ejs', {layout: 'layout.ejs'});
});

app.listen(8000, function(){
    console.log('The server is listening port 8000');
});