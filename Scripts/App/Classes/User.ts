/// <reference path="../../../typings/angularjs/angular.d.ts"/>
// Used DefinitelyType to use AngularJS in TypeScript file
/// <reference path="DbContext.ts" />

class User {
    username: string;

    constructor(private $scope, private $http){

    };
    // parameterized $scope to use its AngularJS directive


    //implemented in $scope.GetHostedEvent function in userControllder.js
    ViewUserEvents(){
        /*
        var db = new DbContext(this.$scope, this.$http);
        
        db.GetHostedEvent(this.username, function(response){
            show_results(response);
        });

        function show_results(response){
            console.log(response);
        }
        */
    }
}

//import angular module to use AngularJS in TypeScript file
//angular.module("EventApp").controller("MyAccountController", User);