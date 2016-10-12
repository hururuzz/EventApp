"use strict";
var FormValidationMessage_1 = require("../Models/FormValidationMessage");
var FormFieldValidator = (function () {
    function FormFieldValidator() {
    }
    FormFieldValidator.ValidateIsEmpty = function (fieldText, fieldName) {
        if (typeof (fieldText) === "undefined") {
            //FormValidationMessage.isThefieldFailure = true;
            //FormValidationMessage.formFieldFailureMessage = fieldName + "Cannot be empty.";
            return FormValidationMessage_1.FormValidationMessage;
        }
        else {
            //FormValidationMessage.isThefieldFailure = false;
            return FormValidationMessage_1.FormValidationMessage;
        }
    };
    FormFieldValidator.ValidateIsEmailForm = function (fieldText, fieldName) {
        /*
        if (typeof(this.email) === "undefined"){
            this.$scope.IsEmailFailure = true;
            this.$scope.emailFailureMessage = "Email address cannot be empty.";
        }

        if (typeof(this.email) !== "undefined"){
            if(this.email.indexOf("\@") < 0 || this.email.indexOf(".") < 0){
                this.$scope.IsEmailFailure = true;
                this.$scope.emailFailureMessage = "The email address is not valid format.";
            }
        }
        */
    };
    return FormFieldValidator;
}());
exports.FormFieldValidator = FormFieldValidator;
