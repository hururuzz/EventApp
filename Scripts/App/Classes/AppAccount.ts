/// <reference path="../../../typings/angularjs/angular.d.ts"/>
// Used DefinitelyType to use AngularJS in TypeScript file

/// <reference path="IAccount.ts" />
/// <reference path="FormFieldValidator.ts" />
/// <reference path="DbContext.ts" />

class AppAccount implements IAccount {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    
    constructor(private $scope, private $http){

    }
    // parameterized $scope to use its AngularJS directive

    
    SignUp(userName, email, password, confirmPassword){
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        
        this.$scope.IsUserNameFailure = FormFieldValidator.ValidateIsEmpty(this.userName, "Username").isTheFieldFailure;
        this.$scope.userNameFailureMessage = FormFieldValidator.ValidateIsEmpty(this.userName, "Username").formFieldFailureMessage;
         
        this.$scope.IsEmailFailure = FormFieldValidator.ValidateIsEmailForm(this.email, "Email").isTheFieldFailure;
        this.$scope.emailFailureMessage = FormFieldValidator.ValidateIsEmailForm(this.email, "Email").formFieldFailureMessage;

        this.$scope.IsPasswordFailure = FormFieldValidator.ValidateIsPassword(this.password, "Password").isTheFieldFailure;
        this.$scope.passwordFailureMessage = FormFieldValidator.ValidateIsPassword(this.password, "Password").formFieldFailureMessage;

        this.$scope.IsConfirmPasswordFailure = FormFieldValidator.ValidateIsSameValue(this.confirmPassword, this.password, "Confirm Password").isTheFieldFailure;
        this.$scope.confirmPasswordFailureMessage = FormFieldValidator.ValidateIsSameValue(this.confirmPassword, this.password, "Confirm Password").formFieldFailureMessage;

        if (
            this.$scope.IsUserNameFailure === false &&
            this.$scope.IsEmailFailure === false &&
            this.$scope.IsPasswordFailure === false &&
            this.$scope.IsConfirmPasswordFailure === false
        ){
            var db = new DbContext(this.$http);
            db.CreateNewAccount(this.userName, this.email, this.password);
        }
    }

    SignIn(userName, password){
        this.userName = userName;
        this.password = password;

        this.$scope.IsUserNameFailure = FormFieldValidator.ValidateIsEmpty(this.userName, "Username").isTheFieldFailure;
        this.$scope.userNameFailureMessage = FormFieldValidator.ValidateIsEmpty(this.userName, "Username").formFieldFailureMessage;
             
        this.$scope.IsPasswordFailure = FormFieldValidator.ValidateIsEmpty(this.password, "Password").isTheFieldFailure;
        this.$scope.passwordFailureMessage = FormFieldValidator.ValidateIsEmpty(this.password, "Password").formFieldFailureMessage;     
    
        if(this.$scope.IsUserNameFailure === false && this.$scope.IsPasswordFailure === false){
            var db = new DbContext(this.$http);
            db.GetUser(this.userName, this.password);
        }
    }

    ResetPassword(userName, email){
        this.userName = userName;
        this.email = email;

        this.$scope.IsUserNameFailure = FormFieldValidator.ValidateIsEmpty(this.userName, "Username").isTheFieldFailure;
        this.$scope.userNameFailureMessage = FormFieldValidator.ValidateIsEmpty(this.userName, "Username").formFieldFailureMessage;
             
        this.$scope.IsEmailFailure = FormFieldValidator.ValidateIsEmailForm(this.email, "Email").isTheFieldFailure;
        this.$scope.emailFailureMessage = FormFieldValidator.ValidateIsEmailForm(this.email, "Email").formFieldFailureMessage;     
        
        
        if(this.$scope.IsUserNameFailure === false && this.$scope.IsEmailFailure === false){
            var db = new DbContext(this.$http);
            db.ResetPassword(this.userName, this.email);
        }   
    }
}

//import angular module to use AngularJS in TypeScript file
angular.module("EventApp").controller("SignUpController", AppAccount);
angular.module("EventApp").controller("SignInController", AppAccount);
angular.module("EventApp").controller("ForgotPasswordController", AppAccount)