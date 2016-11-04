/// <reference path="../../../typings/angularjs/angular.d.ts"/>
// Used DefinitelyType to use AngularJS in TypeScript file

class DateTimeConverter {
    constructor(private $scope){

    }
    
    ConvertJSDateToDateFormart(datetime): string{
        var date: string = datetime.getFullYear() + '/' + (datetime.getMonth() + 1) + '/' + datetime.getDate();

        return date;
    }
    
    ConvertJSDateToTimeFormat(datetime): string{
        var time: string = datetime.getHours() + ':' + datetime.getMinutes();
        
        return time;
    }

    CombineConvertedDateAndTimeToMsFormat(date, time): number{
        var dateFormatted: Date = new Date(date + ' ' + time);
        var ms: number = dateFormatted.getTime();
        
        return ms;
    }

    ConvertMsFormatToDate(ms): string{
        var JsDateFormat: Date = new Date(ms);
        
        var datePart = this.ConvertJSDateToDateFormart(JsDateFormat);
        var timePart = this.ConvertJSDateToTimeFormat(JsDateFormat);

        return datePart + ' ' + timePart;
    }

    ConvertMsFormatToGoogleCalendarDateQueryFormat(ms): string{
        var JsDateFormat: Date = new Date(ms);
        var startDateTime, endDateTime: string = JsDateFormat.getFullYear() + (JsDateFormat.getMonth() + 1) + JsDateFormat.getDate() + 'T' + JsDateFormat.getHours() + JsDateFormat.getMinutes() + JsDateFormat.getSeconds() + 'Z';
        
        return startDateTime + '/' + endDateTime;
    }
}

//import angular module to use AngularJS in TypeScript file
angular.module("EventApp");