/// <reference path="../../../typings/angularjs/angular.d.ts"/>
// Used DefinitelyType to use AngularJS in TypeScript file
/// <reference path="IAccount.ts" />
/// <reference path="DbContext.ts" />
/// <reference path="User.ts" />
"use strict";
var Event = (function () {
    function Event($scope, $http) {
        this.$scope = $scope;
        this.$http = $http;
    }
    ;
    // parameterized $scope to use its AngularJS directive
    Event.prototype.SearchEvents = function () {
    };
    Event.prototype.CreateEvent = function (eventName, tag, date, time, location, invitees, description) {
        alert(eventName + " " + tag + " " + date + " " + time + " " + location + " " + invitees + " " + description);
        this.eventName = eventName;
        this.tag = tag;
        this.date = date;
        this.location = location;
        this.invitees = invitees;
        this.description = description;
        var db = new DbContext(this.$http);
        db.CreateEvent(this.eventName, this.tag, this.date, this.location, this.invitees, this.description);
    };
    Event.prototype.JoinEvent = function (eventId) {
    };
    Event.prototype.DeleteEvent = function (eventId) {
    };
    Event.prototype.LeaveEvent = function (eventId) {
    };
    return Event;
}());

//import angular module to use AngularJS in TypeScript file
angular.module("EventApp").controller("CreateEventController", Event);
