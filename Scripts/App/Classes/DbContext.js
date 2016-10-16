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
            alert('Successfully Created!');
            location.reload();
        }, function (error) {
            alert('Error');
        });
    };
    DbContext.prototype.GetUser = function (email, password) {
        this.$http({
            method: 'POST',
            url: '/SignIn',
            header: {
                'Content-Type': 'application/json'
            },
            data: {
                email: email,
                password: password
            }
        }).then(function (response) {
        }, function (error) {
        });
    };
    return DbContext;
}());
