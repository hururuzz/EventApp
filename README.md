# Introduction
Event App project for CPSC542

# Installation
1. Install Node.js
<a href="https://nodejs.org/en/download/">Click here to download Node.js</a>

2. Install CouchDB
a href="https://couchdb.apache.org/">Click here to download CouchDB</a>

3. Database Setup for CouchDB
Run the following command to add documents
POSTMAN: 
    PUT, http://localhost:5984/event 
    PUT, http://localhost:5984/user 
curl: 
    curl -X PUT http://localhost:5984/event
    curl -X PUT http://localhost:5984/user

- Run the following command to add design views
POSTMAN: 
    PUT, http://localhost:5984/event/_design/event, Body->binary->choose 'event.json file in InitialSetup folder of the app. 
    PUT, http://localhost:5984/user/_design/user, Body->binary->choose 'user.json file in InitialSetup folder of the app. 
curl: 
    curl -X PUT http://localhost:5984/event/_design/event --data-binary @event.json 
    curl -X PUT http://localhost:5984/user/_design/user --data-binary @user.json 