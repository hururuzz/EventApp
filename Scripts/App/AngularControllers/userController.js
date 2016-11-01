app.controller('UserController', function($scope, $http, angularService){
    console.log('This is UserController');

    var username = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    $scope.ViewUserEvents = function(username, callback){
        $http({
            method: 'POST',
            url: '/HostedEvent',
            header: {
                'Content-Type': 'application/json'
            },
            data: {
                username: username
            }
        }).then(function(response){
            $scope.userEventList = response.data;
            console.log($scope.userEventList);
        }, function(error){
            console.log(error);
        });
    }
});