/// <reference path="../../../typings/angularjs/angular.d.ts"/>
// Used DefinitelyType to use AngularJS in TypeScript file
/// <reference path="DbContext.ts" />
/// <reference path="User.ts" />
var UserEvent = (function () {
    function UserEvent($scope, $http) {
        this.$scope = $scope;
        this.$http = $http;
    }
    ;
    // parameterized $scope to use its AngularJS directive
    UserEvent.prototype.SearchEvents = function () {
    };
    UserEvent.prototype.CreateEvent = function (eventName, tag, date, time, location, invitees, description) {
        this.eventName = eventName;
        this.tag = tag;
        this.date = date + time;
        this.location = location;
        this.invitees = invitees;
        this.description = description;
        var db = new DbContext(this.$scope, this.$http);
        db.CreateEvent(this.eventName, this.tag, this.date, this.location, this.invitees, this.description);
    };
    UserEvent.prototype.JoinEvent = function (eventId) {
    };
    UserEvent.prototype.DeleteEvent = function (eventId) {
    };
    UserEvent.prototype.LeaveEvent = function (eventId) {
    };
    return UserEvent;
}());
//import angular module to use AngularJS in TypeScript file
//angular.module("EventApp").controller("CreateEventController", UserEvent);
