/// <reference path="../../../typings/angularjs/angular.d.ts"/>
// Used DefinitelyType to use AngularJS in TypeScript file

class FormValidationMessage {
    isTheFieldFailure: boolean;
    formFieldFailureMessage: string;

    constructor(){

    }
}

//import angular module to use AngularJS in TypeScript file
angular.module("EventApp").controller("MyAccountController", FormValidationMessage);