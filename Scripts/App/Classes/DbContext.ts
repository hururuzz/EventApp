/// <reference path="../../../typings/angularjs/angular.d.ts"/>
// Used DefinitelyType to use AngularJS in TypeScript file

class DbContext {
    constructor(private $http){

    }

    CreateNewAccount(userName, email, password) {
        this.$http({
            method: "POST",
            url: "/SignUp",
            header: {
                "Content-Type": "application/json"
            },
            data:{
                userName: userName,
                email: email,
                password: password
            }
        }).then(function(response){
            if(response.data === ""){
                alert("Successfully Created!");
                location.reload();
            } else if (response.data === "conflict") {
                alert("The username is already taken.");
            }
        }, function(error){
            alert(error);
        });
    }

    GetUser(userName, password){
        this.$http({
            method: "POST",
            url: "/SignIn",
            header: {
                "Content-Type": "application-json"
            },
            data: {
                userName: userName,
                password: password
            }
        }).then(function(response){
            if (response.data === "Valid account"){
                document.cookie = "username=" + userName + "; path=/";
                // store a cookie
                window.location.href = "/";
                // redirect to homepage
            }
            else if (response.data === "not_found" || response.data === "Password incorrect"){
                alert("Please verify username and password");
            }        
        }, function(error){
            alert(error);
        });
    }

    ResetPassword(userName, email){
        this.$http({
            method: "POST",
            url: "/ForgotPassword",
            header: {
                "Content-Type": "application-json"
            },
            data: {
                userName: userName,
                email: email
            }
        }).then(function(response){
            console.log(response.data);
            if (response.data === true){
                alert('Password has been successfully reset.');
                window.location.href = "/signin";
            } else {
                alert('Please check your username and email.');
            }
        }, function(error){
            alert(error);
        });
    }

    CreateEvent(eventName, tag, date, location, invitees, description) {
        this.$http({
            method: 'POST',
            url: '/CreateEvent',
            header: {
                'Content-Type': 'application/json'
            },
            data:{
                eventName: eventName,
                tag: tag,
                date: date,
                location: location,
                invitees: invitees,
                description: description
            }
        }).then(function(response){
            if(response.data === ""){
                alert('Successfully Created!');
                //location.reload();
            } else if (response.data === "conflict") {
                alert("There is a database conflict");
            }
        }, function(error){
            alert(error);
        });
    }

    ChangePassword(username, password, newPassword){
        this.$http({
            method: 'POST',
            url: '/ChangePassword',
            header: {
                'Content-Type': 'application/json'
            },
            data: {
                username: username,
                password: password,
                newPassword: newPassword
            }
        }).then(function(response){
            //console.log(response.data);
            alert('The password has been successfully changed.');
            window.location.href = '/SignIn';
        }, function(error){
            console.log(error);
        });
    }
}