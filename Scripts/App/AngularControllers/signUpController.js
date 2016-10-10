//app.controller('SignUpController', function($scope, $http, angularService){
    //console.log('This is SignUpController');

    $scope.singUp = function(username, password, email){
        $http.post({
            method: 'POST',
            url: '/SignUp',
            header: {
                'Content-Type': 'application/json'
            },
            data:{
                username: this.username,
                password: this.password,
                email: this.email
            }
        }).then(function(response){
            alert('Successfully Created!');
        }, function(error){
            alert('Error');
        });
    }
//});