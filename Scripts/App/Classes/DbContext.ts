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
            alert('Successfully Created!');
            location.reload();
        }, function(error){
            alert('Error');
        });
    }

    GetUser(email, password){
        this.$http({
            method: 'POST',
            url: '/SignIn',
            header:{
                'Content-Type': 'application/json'
            },
            data: {
                email: email,
                password: password
            }
        }).then(function(response){
            
        }, function(error){

        });
    }
}