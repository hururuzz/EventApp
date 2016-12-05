# Introduction
Event App project for CPSC542

# Installation
1. Install Node.js
<a href="https://nodejs.org/en/download/">Click here to download Node.js</a>

2. Install CouchDB
<a href="https://couchdb.apache.org/">Click here to download CouchDB</a>

3. Install POSTMAN or curl
<a href="https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop">Click here to download POSTMAN (w/ Chrome extension)</a>
<a href="https://curl.haxx.se/download.html">Click here to download curl</a>

4. Database Setup for CouchDB
- Run the following command to add documents <br/>

POSTMAN: <br/>
    PUT, http://localhost:5984/event <br/>
    PUT, http://localhost:5984/user <br/>
curl: <br/>
    curl -X PUT http://localhost:5984/event<br/>
    curl -X PUT http://localhost:5984/user<br/>

- Run the following command to add design views<br/>
POSTMAN: <br/>
    PUT, http://localhost:5984/event/_design/event, Body->binary->choose 'event.json file in InitialSetup folder of the app. <br/>
    PUT, http://localhost:5984/user/_design/user, Body->binary->choose 'user.json file in InitialSetup folder of the app. <br/>
curl: 
    curl -X PUT http://localhost:5984/event/_design/event --data-binary @event.json <br/>
    curl -X PUT http://localhost:5984/user/_design/user --data-binary @user.json <br/>

5. Run the application
- Run CouchDB service if it is off.
- Open a command prompt
- Change the directory to the root folder of the application
- Type 'node server'
- Open a web browser, go to http://localhost:8000