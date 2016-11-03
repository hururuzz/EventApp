# EventApp
Event App project for CPSC542

# Intial Setup for CouchDB
- Run the following command to add design view on CouchDB <br>
POSTMAN: 
    PUT, http://localhost:5984/event/_design/event, Body->binary->choose 'event.json file in InitialSetup folder. <br>
    PUT, http://localhost:5984/user/_design/user, Body->binary->choose 'user.json file in InitialSetup folder. <br>

curl: 
    curl -X PUT http://localhost:5984/event/_design/event --data-binary @event.json <br>
    curl -X PUT http://localhost:5984/user/_design/user --data-binary @user.json <br>
