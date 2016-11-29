/// <reference path="../../../typings/angularjs/angular.d.ts"/>
// Used DefinitelyType to use AngularJS in TypeScript file
var DbContext = (function () {
    function DbContext($scope, $http) {
        this.$scope = $scope;
        this.$http = $http;
        this.GetHostedEvent = function (username, callback) {
            this.$http({
                method: 'POST',
                url: '/HostedEvent',
                header: {
                    'Content-Type': 'application/json'
                },
                data: {
                    username: username
                }
            }).then(function (response) {
                callback(response.data.rows);
            }, function (error) {
                callback(error);
            });
        };
    }
    DbContext.prototype.CreateNewAccount = function (userName, email, password) {
        this.$http({
            method: "POST",
            url: "/SignUp",
            header: {
                "Content-Type": "application/json"
            },
            data: {
                userName: userName,
                email: email,
                password: password
            }
        }).then(function (response) {
            if (response.data === "") {
                alert("Successfully Created!");
                location.reload();
            }
            else if (response.data === "conflict") {
                alert("The username is already taken.");
            }
            else {
                alert("Database error: " + response.data);
            }
        }, function (error) {
            alert(error);
        });
    };
    DbContext.prototype.GetUser = function (userName, password) {
        this.$http({
            method: "POST",
            url: "/SignIn",
            header: {
                "Content-Type": "application-json"
            },
            data: {
                userName: userName,
                password: password
            }
        }).then(function (response) {
            if (response.data === "Valid account") {
                document.cookie = "username=" + userName + "; path=/";
                // store a cookie
                window.location.href = "/";
            }
            else if (response.data === "not_found" || response.data === "Password incorrect") {
                alert("Please verify username and password");
            }
        }, function (error) {
            alert(error);
        });
    };
    DbContext.prototype.ResetPassword = function (userName, email) {
        this.$http({
            method: "POST",
            url: "/ForgotPassword",
            header: {
                "Content-Type": "application-json"
            },
            data: {
                userName: userName,
                email: email
            }
        }).then(function (response) {
            console.log(response.data);
            if (response.data === true) {
                alert('Password has been successfully reset.');
                window.location.href = "/signin";
            }
            else {
                alert('Please check your username and email.');
            }
        }, function (error) {
            alert(error);
        });
    };
    DbContext.prototype.CreateEvent = function (eventName, tag, date, location, invitees, description) {
        var username = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
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
                description: description,
                eventHost: username,
                isActive: 'y'
            }
        }).then(function (response) {
            if (response.data === "") {
                alert('Successfully Created!');
                document.location.reload();
            }
            else if (response.data === "conflict") {
                alert("There is a database conflict");
            }
        }, function (error) {
            alert(error);
        });
    };
    DbContext.prototype.ChangePassword = function (username, password, newPassword) {
        this.$http({
            method: 'POST',
            url: '/ChangePassword',
            header: {
                'Content-Type': 'application/json'
            },
            data: {
                username: username,
                password: password,
                newPassword: newPassword
            }
        }).then(function (response) {
            //console.log(response.data);
            alert('The password has been successfully changed.');
            window.location.href = '/SignIn';
        }, function (error) {
            console.log(error);
        });
    };
    return DbContext;
}());
//import angular module to use AngularJS in TypeScript file
angular.module("EventApp");
