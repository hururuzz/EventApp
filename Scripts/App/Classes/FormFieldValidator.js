/// <reference path="FormValidationMessage.ts" />
var FormFieldValidator = (function () {
    function FormFieldValidator() {
    }
    FormFieldValidator.ValidateIsEmpty = function (fieldText, fieldName) {
        var msg = new FormValidationMessage();
        if (typeof (fieldText) === "undefined") {
            msg.isTheFieldFailure = true;
            msg.formFieldFailureMessage = fieldName + " cannot be empty.";
            return msg;
        }
        else {
            msg.isTheFieldFailure = false;
            msg.formFieldFailureMessage = "";
            return msg;
        }
    };
    FormFieldValidator.ValidateIsEmailForm = function (fieldText, fieldName) {
        var msg = new FormValidationMessage();
        if (typeof (fieldText) === "undefined") {
            return FormFieldValidator.ValidateIsEmpty(fieldText, fieldName);
        }
        else if (fieldText.indexOf("\@") < 0 || fieldText.indexOf(".") < 0 || fieldText.indexOf(".") - fieldText.indexOf("\@") === 1) {
            // If the email address has no "@" or "." or "@", "." are adjacent eg.) a@.com
            msg.isTheFieldFailure = true;
            msg.formFieldFailureMessage = "The email address is not valid format.";
            return msg;
        }
        else {
            msg.isTheFieldFailure = false;
            msg.formFieldFailureMessage = "";
            return msg;
        }
    };
    FormFieldValidator.ValidateIsPassword = function (fieldText, fieldName) {
        var msg = new FormValidationMessage();
        if (typeof (fieldText) === "undefined") {
            return FormFieldValidator.ValidateIsEmpty(fieldText, fieldName);
        }
        else if (fieldText.length < 6) {
            msg.isTheFieldFailure = true;
            msg.formFieldFailureMessage = "The minimum length of password is 6";
            return msg;
        }
        else {
            msg.isTheFieldFailure = false;
            msg.formFieldFailureMessage = "";
            return msg;
        }
    };
    FormFieldValidator.ValidateIsSameValue = function (fieldText, fieldText2, fieldName) {
        var msg = new FormValidationMessage();
        if (typeof (fieldText) === "undefined") {
            return FormFieldValidator.ValidateIsEmpty(fieldText, fieldName);
        }
        else if (fieldText !== fieldText2) {
            msg.isTheFieldFailure = true;
            msg.formFieldFailureMessage = "The confirm password does not match.";
            return msg;
        }
        else {
            msg.isTheFieldFailure = false;
            msg.formFieldFailureMessage = "";
            return msg;
        }
    };
    return FormFieldValidator;
}());
