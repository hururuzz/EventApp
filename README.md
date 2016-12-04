# Introduction
Event App project for CPSC542

# Installation
1. Install Node.js
- <a href="https://nodejs.org/en/download/">Go to Node.js</a>

2. Install CouchDB
- <a href="https://couchdb.apache.org/">Go to CouchDB</a>

3. Database Setup for CouchDB
- Run the following command to add documents<br>
POSTMAN: <br>
    PUT, http://localhost:5984/event <br>
    PUT, http://localhost:5984/user <br>
curl: <br>
    curl -X PUT http://localhost:5984/event<br>
    curl -X PUT http://localhost:5984/user<br>

- Run the following command to add design views<br>
POSTMAN: <br>
    PUT, http://localhost:5984/event/_design/event, Body->binary->choose 'event.json file in InitialSetup folder of the app. <br>
    PUT, http://localhost:5984/user/_design/user, Body->binary->choose 'user.json file in InitialSetup folder of the app. <br>
curl: <br>
    curl -X PUT http://localhost:5984/event/_design/event --data-binary @event.json <br>
    curl -X PUT http://localhost:5984/user/_design/user --data-binary @user.json <br>