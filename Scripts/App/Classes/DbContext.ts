/// <reference path="../../../typings/angularjs/angular.d.ts"/>
// Used DefinitelyType to use AngularJS in TypeScript file

class DbContext {
    constructor(private $http){

    }

    CreateNewAccount(userName, email, password) {
        this.$http({
            method: 'POST',
            url: '/SignUp',
            header: {
                'Content-Type': 'application/json'
            },
            data:{
                userName: userName,
                email: email,
                password: password
            }
        }).then(function(response){
            if(response.data === ""){
                alert('Successfully Created!');
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
            method: 'POST',
            url: '/SignIn',
            header: {
                'Content-Type': 'application-json'
            },
            data: {
                userName: userName,
                password: password
            }
        }).then(function(response){
            console.log(response.data);
            if(response.data === "not_found" || response.data === "Password incorrect"){
                alert("Please verify username and password");
            }        
        }, function(error){
            alert(error);
        });
    }
}