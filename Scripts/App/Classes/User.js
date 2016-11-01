/// <reference path="../../../typings/angularjs/angular.d.ts"/>
// Used DefinitelyType to use AngularJS in TypeScript file
/// <reference path="DbContext.ts" />
var User = (function () {
    function User($scope, $http) {
        this.$scope = $scope;
        this.$http = $http;
    }
    ;
    // parameterized $scope to use its AngularJS directive
    //implemented in $scope.GetHostedEvent function in userControllder.js
    User.prototype.ViewUserEvents = function () {
        /*
        var db = new DbContext(this.$scope, this.$http);
        
        db.GetHostedEvent(this.username, function(response){
            show_results(response);
        });

        function show_results(response){
            console.log(response);
        }
        */
    };
    return User;
}());
//import angular module to use AngularJS in TypeScript file
//angular.module("EventApp").controller("MyAccountController", User); 
