/// <reference path="../Classes/DbContext.ts" />

app.controller('CreateEventController', function($scope, $http, angularService){
    //console.log('This is CreateEventController');
    var currentDateTime = new Date();
    
    $scope.date = currentDateTime;
    $scope.time = currentDateTime;
    $scope.invitees = '';

    $scope.OpenCalendar = function(){
        $scope.isOpen = true;
    }

    $scope.dateOptions = {
        formatYear: 'yy',
        minDate: new Date(),
        startingDay: 1
    }

    $scope.GetUserList = function(user){
        return $http({
            method: 'POST',
            url: '/UserList',
            header: {
                'Content-Type': 'application/json'
            },
            data: {
                username: user,
                viewName: 'GetUserList'
            }
        }).then(function(response){
            return response.data.map(function(item){
                //return "Username: " + item.value[0] + ", Email: " + item.value[1];
                return item.value[1];
            });
        }, function(error){
            console.log(error);
        });
    }

    $scope.AddInvitee = function(invitee){
        $scope.invitees += (invitee + ', ');
        $scope.invitee = '';
    }

    $scope.CreateEvent = function(eventName, tag, date, time, location, invitees, description){
        this.eventName = eventName;
        this.tag = tag;
        this.date = date + time;
        this.location = location;
        this.invitees = invitees;
        this.description = description;

        var db = new DbContext($scope, $http);
        db.CreateEvent(this.eventName, this.tag, this.date, this.location, this.invitees, this.description);
    }
});