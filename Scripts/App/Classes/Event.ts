/// <reference path="../../../typings/angularjs/angular.d.ts"/>
// Used DefinitelyType to use AngularJS in TypeScript file
/// <reference path="IAccount.ts" />
/// <reference path="DbContext.ts" />
/// <reference path="User.ts" />

export class Event {
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
        alert(eventName + " " + tag + " " + date + " " + time + " " + location + " " + invitees + " " + description);
        
        this.eventName = eventName;
        this.tag = tag;
        this.date = date;
        this.location = location;
        this.invitees = invitees;
        this.description = description;

        var db = new DbContext(this.$http);
        db.CreateEvent(this.eventName, this.tag, this.date, this.location, this.invitees, this.description);
    }

    JoinEvent(eventId: number){

    }

    DeleteEvent(eventId: number){

    }

    LeaveEvent(eventId: number){

    }
}

//import angular module to use AngularJS in TypeScript file
angular.module("EventApp").controller("CreateEventController", Event);
