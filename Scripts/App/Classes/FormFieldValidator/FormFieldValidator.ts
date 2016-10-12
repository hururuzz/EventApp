import { FormValidationMessage } from "../Models/FormValidationMessage";

export class FormFieldValidator{
    static ValidateIsEmpty(fieldText: string, fieldName: string){
        if(typeof(fieldText) === "undefined"){
            FormValidationMessage.isThefieldFailure = true;
            FormValidationMessage.formFieldFailureMessage = fieldName + "Cannot be empty.";

            return FormValidationMessage;
        } else{
            FormValidationMessage.isThefieldFailure = false;
            
            return FormValidationMessage;
        }
    }

    static ValidateIsEmailForm(fieldText: string, fieldName: string){
        

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
    }
}