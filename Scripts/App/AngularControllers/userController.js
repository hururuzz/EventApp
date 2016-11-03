app.controller('UserController', function($scope, $http, angularService){
    console.log('This is UserController');

    $scope.username = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    $scope.ViewUserHostedEvents = function(){
        $http({
            method: 'POST',
            url: '/HostedEvent',
            header: {
                'Content-Type': 'application/json'
            },
            data: {
                username: $scope.username,
                viewName: 'GetEventsByHost'
            }
        }).then(function(response){
            $scope.userEventList = response.data;
            console.log($scope.userEventList);
        }, function(error){
            console.log(error);
        });
    }

    $scope.ViewUserHostedEvents = function(){
        $http({
            method: 'POST',
            url: '/JoinedEvent',
            header: {
                'Content-Type': 'application/json'
            },
            data: {
                username: $scope.username,
                viewName: 'GetEventsByGuest'
            }
        }).then(function(response){
            $scope.userEventList = response.data;
            console.log($scope.userEventList);
        }, function(error){
            console.log(error);
        });
    }

    $scope.CreateEvent = function(eventName, tag, date, time, location, invitees, description){
        this.eventName = eventName;
        this.tag = tag;
        this.date = date;
        this.location = location;
        this.invitees = invitees;
        this.description = description;

        var db = new DbContext(this.$scope, this.$http);
        db.CreateEvent(this.eventName, this.tag, this.date, this.location, this.invitees, this.description);
    }
});