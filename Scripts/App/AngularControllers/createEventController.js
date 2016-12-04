/// <reference path="../Classes/DbContext.ts" />
/// <reference path="../Classes/DateTimeConverter.ts" />
/// <reference path="../Classes/FormFieldValidator.ts" />

app.controller('CreateEventController', function($scope, $http, angularService){
    //console.log('This is CreateEventController');
    var currentDateTime = new Date();
    
    $scope.date = currentDateTime;
    $scope.time = currentDateTime;
    $scope.invitees = '';
    var inviteeList = [];

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
                return item.value[0];
            });
        }, function(error){
            console.log(error);
        });
    }

    $scope.AddInvitee = function(invitee){
        function isInviteeInTheList (name){
            return name === invitee;
        }

        if(!inviteeList.find(isInviteeInTheList)){
            inviteeList.push(invitee);
            $scope.invitee = '';
        }

        $scope.invitees = inviteeList;
    }

    $scope.CreateEvent = function(eventName, tag, date, time, location, invitees, description){
        if (this.eventName === undefined){
            $scope.IsEventNameFailure = true;
            $scope.eventNameFailureMessage = 'Event Name cannot be empty.';
        } else {
            $scope.IsEventNameFailure = false;
        }
        
        if($scope.IsEventNameFailure === false){
            var dt = new DateTimeConverter($scope);
        
            var date = dt.ConvertJSDateToDateFormart($scope.date);
            var time = dt.ConvertJSDateToTimeFormat($scope.time);

            this.eventName = eventName;
            this.tag = tag;
            this.date = dt.CombineConvertedDateAndTimeToMsFormat(date, time);
            this.location = location;
            this.invitees = invitees;
            this.description = description;

            var db = new DbContext($scope, $http);
            db.CreateEvent(this.eventName, this.tag, this.date, this.location, this.invitees, this.description);
        } 
    }
});