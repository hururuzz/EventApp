app.controller('HomeController', function($scope, $http, angularService){
    console.log('This is HomeController');

    $scope.eventSearched = false;

    $scope.SearchEvents = function(keyword){
        $scope.eventSearched = true;

        var keyword = (keyword === undefined) ? '' : keyword;
        //console.log(keyword);

        $http({
            method: 'POST',
            url: '/EventSearchList',
            header: {
                'Content-Type': 'application/json'
            },
            data: {
                keyword: keyword,
                viewName: 'GetEventsByTag'
            }
        }).then(function(response){
            $scope.searchedEventList = response.data;
            
            if ($scope.searchedEventList.length === 0){
                $scope.noSearchResult = true;
                $scope.eventsSearched = false;
            } else {
                $scope.eventsSearched = true;
                $scope.noSearchResult = false;
            }
        }, function(error){
            console.log(error);
        });
    }

    $scope.ActOnEvent = function(rev_id, eventId, invitees, eventDate, description, eventHost, eventName, location, tag){
        var loggedInUsername = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        var eventId = eventId;
        var rev_id = rev_id;
        var invitees = invitees;
        var eventDate = eventDate;
        var description = description;
        var eventHost = eventHost;
        var eventName = eventName;
        var location = location;
        var tag = tag;

        console.log(invitees);
        if (invitees === undefined || invitees === ''){
            var invitees = [];
        }

        function isTheUserHost (name){
            return name === loggedInUsername;
        }

        //console.log(invitees.find(isTheUserHost));

        //console.log(eventId);
        ///console.log(rev_id);
        //console.log(invitees);
        //console.log(location);

        //var invitess = document.getElementById('invitees').value;
        //console.log(invitees + ', ' + loggedInUsername + ', ');

        if(loggedInUsername === ''){
            document.location.href='/SignIn';
        } else if (invitees.find(isTheUserHost)){
            alert('You have joined this event.');
        } else if (loggedInUsername === eventHost) {
            alert('You have hosted this event.');
        } else {
            invitees.push(loggedInUsername);
            console.log(invitees);

            $http({
                method: 'POST',
                url: '/ValidateUserInEvent',
                header: {
                    'Content-Type': 'application/json'
                },
                data: {
                    eventId: eventId
                }
            }).then(function(response){
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
                        alert('You have been successfully joined this event!');
                    }, function(error){
                        alert('Error on the system');
                    });
            }, function(error){
                alert('Error on the system');
            });
        }
    }
});