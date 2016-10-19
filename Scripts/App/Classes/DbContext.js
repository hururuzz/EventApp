/// <reference path="../../../typings/angularjs/angular.d.ts"/>
// Used DefinitelyType to use AngularJS in TypeScript file
var DbContext = (function () {
    function DbContext($http) {
        this.$http = $http;
    }
    DbContext.prototype.CreateNewAccount = function (userName, email, password) {
        this.$http({
            method: 'POST',
            url: '/SignUp',
            header: {
                'Content-Type': 'application/json'
            },
            data: {
                userName: userName,
                email: email,
                password: password
            }
        }).then(function (response) {
            if (response.data === "") {
                alert('Successfully Created!');
                location.reload();
            }
            else if (response.data === "conflict") {
                alert("The username is already taken.");
            }
        }, function (error) {
            alert(error);
        });
    };
    DbContext.prototype.GetUser = function (userName, password) {
        this.$http({
            method: 'POST',
            url: '/SignIn',
            header: {
                'Content-Type': 'application-json'
            },
            data: {
                userName: userName,
                password: password
            }
        }).then(function (response) {
            console.log(response.data);
            if (response.data === "not_found" || response.data === "Password incorrect") {
                alert("Please verify username and password");
            }
        }, function (error) {
            alert(error);
        });
    };
    DbContext.prototype.CreateEvent = function (eventName, tag, date, location, invitees, description) {
        this.$http({
            method: 'POST',
            url: '/CreateEvent',
            header: {
                'Content-Type': 'application/json'
            },
            data: {
                eventName: eventName,
                tag: tag,
                date: date,
                location: location,
                invitees: invitees,
                description: description
            }
        }).then(function (response) {
            if (response.data === "") {
                alert('Successfully Created!');
            }
            else if (response.data === "conflict") {
                alert("There is a database conflict");
            }
        }, function (error) {
            alert(error);
        });
    };
    return DbContext;
}());
