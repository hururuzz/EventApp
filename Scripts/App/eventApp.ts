/// <reference path="../../typings/angularjs/angular.d.ts"/>
// Used DefinitelyType to use AngularJS in TypeScript file

export interface IAccount {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;

    SignUp(userName, email, password, confirmPassword);
    SignIn(email, password);
}


class AppAccount implements IAccount {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    
    constructor(private $scope, private $http){
        //super();
    }
    // parameterized $scope to use its AngularJS directive

    
    SignUp(userName, email, password, confirmPassword){
        this.$scope.IsUserNameFailure = false;
        this.$scope.IsEmailFailure = false;
        this.$scope.IsPasswordFailure = false;
        this.$scope.IsConfirmPasswordFailure = false;
        
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        

        /*
        if (typeof(this.userName) === "undefined"){
            this.$scope.IsUserNameFailure = true;
            this.$scope.userNameFailureMessage = "Username cannot be empty.";
        }
        */

        //console.log(FormFieldValidator.ValidateIsEmpty(this.userName, "Username"));

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

        if (typeof(this.password) === "undefined"){
            this.$scope.IsPasswordFailure = true;
            this.$scope.passwordFailureMessage = "Password cannot be empty.";
        }

        if (typeof(this.confirmPassword) === "undefined"){
            this.$scope.IsConfirmPasswordFailure = true;
            this.$scope.confirmPasswordFailureMessage = "Confirm password cannot be empty.";
        } else {
            if (this.password !== this.confirmPassword){
                this.$scope.confirmPasswordFailureMessage = "Please confirm the password.";
            }
        }


        /*
        this.$http({
            method: 'POST',
            url: '/SignUp',
            header: {
                'Content-Type': 'application/json'
            },
            data:{
                userName: this.userName,
                password: this.password,
                email: this.email
            }
        }).then(function(response){
            alert('Successfully Created!');
            location.reload();
        }, function(error){
            alert('Error');
        });
        */
    }

    SignIn(email, password){
        this.email = email;
        this.password = password;    
    }
}

class GoogleAccount implements IAccount {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;

    SignUp(userName, email, password, confirmPassword){

    };
    
    SignIn(email, password){

    };

    IntegrateAccount(){
        
    };
}


class FormFieldValidator {   
    static ValidateIsEmpty(fieldText: string, fieldName: string){
        if(typeof(fieldText) === "undefined"){
            //FormValidationMessage.isThefieldFailure = true;
            //FormValidationMessage.formFieldFailureMessage = fieldName + "Cannot be empty.";

            return fieldText + fieldName;
        } else{
            //FormValidationMessage.isThefieldFailure = false;
            
            return "failed22";
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

class FormValidationMessage {
    static isThefieldFailure: boolean;
    static formFieldFailureMessage: string;

    constructor(){
        //console.log("hello");
        console.log(FormFieldValidator.ValidateIsEmpty("Username", "Username"));
        //console.log(FormFieldValidator.);

    }
}



//import angular module to use AngularJS in TypeScript file
angular.module("EventApp").controller("SignUpController", AppAccount);