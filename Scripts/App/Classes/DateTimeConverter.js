/// <reference path="../../../typings/angularjs/angular.d.ts"/>
// Used DefinitelyType to use AngularJS in TypeScript file
var DateTimeConverter = (function () {
    function DateTimeConverter($scope) {
        this.$scope = $scope;
    }
    DateTimeConverter.prototype.ConvertJSDateToDateFormart = function (datetime) {
        var date = datetime.getFullYear() + '/' + (datetime.getMonth() + 1) + '/' + datetime.getDate();
        return date;
    };
    DateTimeConverter.prototype.ConvertJSDateToTimeFormat = function (datetime) {
        var time = datetime.getHours() + ':' + datetime.getMinutes();
        return time;
    };
    DateTimeConverter.prototype.CombineConvertedDateAndTimeToMsFormat = function (date, time) {
        var dateFormatted = new Date(date + ' ' + time);
        var ms = dateFormatted.getTime();
        return ms;
    };
    DateTimeConverter.prototype.ConvertMsFormatToDate = function (ms) {
        var JsDateFormat = new Date(ms);
        var datePart = this.ConvertJSDateToDateFormart(JsDateFormat);
        var timePart = this.ConvertJSDateToTimeFormat(JsDateFormat);
        return datePart + ' ' + timePart;
    };
    DateTimeConverter.prototype.ConvertMsFormatToGoogleCalendarDateQueryFormat = function (ms) {
        var JsDateFormat = new Date(ms);
        var startDateTime, endDateTime = JsDateFormat.getFullYear() + (JsDateFormat.getMonth() + 1) + JsDateFormat.getDate() + 'T' + JsDateFormat.getHours() + JsDateFormat.getMinutes() + JsDateFormat.getSeconds() + 'Z';
        return startDateTime + '/' + endDateTime;
    };
    return DateTimeConverter;
}());
//import angular module to use AngularJS in TypeScript file
angular.module("EventApp");
