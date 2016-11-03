/// <reference path="../../../typings/angularjs/angular.d.ts"/>
// Used DefinitelyType to use AngularJS in TypeScript file
/// <reference path="DbContext.ts" />
/// <reference path="User.ts" />

class UserEvent {
        // Other variables
        private eventId: number;
        private address: string;
        private eventHost: Array<User>;
        private participants: number;
        // User input variables
        private eventName: string;
        private tag: string;
        private date: Date;
        private location: string;
        private invitees: string; // temporary
        private description: string;

    constructor(private $scope, private $http){

    };
    // parameterized $scope to use its AngularJS directive

    SearchEvents(){

    }

    CreateEvent(eventName, tag, date, time, location, invitees, description){
        //implemented in createEventController.js
    }

    JoinEvent(eventId: number){

    }

    DeleteEvent(eventId: number){

    }

    LeaveEvent(eventId: number){

    }
}

//import angular module to use AngularJS in TypeScript file
//angular.module("EventApp").controller("CreateEventController", UserEvent);
