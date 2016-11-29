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
            $scope.userHostedEventList = response.data;
            //console.log($scope.userHostedEventList);
        }, function(error){
            console.log(error);
        });
    }

    $scope.ViewUserJoinedEvents = function(){
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
            $scope.userJoinedEventList = response.data;
            //console.log($scope.userJoinedEventList);
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

    $scope.ActOnEvent = function(rev_id, eventId, invitees, eventDate, description, eventHost, eventName, location, tag){
        this.evendId = eventId;
        this.rev_id = rev_id;
        var eventType = (eventHost === $scope.username) ? 'Drop': 'Leave'; 

        if (eventType === 'Drop'){
            //var rev_id = document.getElementById('rev_id').value;

            $http({
                method: 'POST',
                url: '/DeleteEvent',
                header: {
                    'Content-Type': 'application/json'
                },
                data: {
                    eventId: this.evendId,
                    rev_id: this.rev_id
                }
            }).then(function(response){
                if(response.data.ok !== true){
                    alert('Error on the system');
                } else{
                    alert('The event has been successfully deleted.');
                }
            }, function(error){
                alert('Error on the system');
            });
        } else {// eventType ==='Leave'
            invitees.pop($scope.username);

            $http({
                method: 'POST',
                url: '/UpdateEvent',
                header: {
                    'Content-Type': 'application/json'
                },
                data: {
                    eventId: eventId,
                    date: eventDate,
                    description: description,
                    eventHost: eventHost,
                    eventName: eventName,
                    invitees: invitees,
                    isActive: 'y',
                    location: location,
                    tag: tag
                }
            }).then(function(response){
                alert('You have been successfully left this event!');
            }, function(error){
                alert('Error on the system');
            });
        }
    }
});