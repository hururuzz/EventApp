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
            } else {
                $scope.eventsSearched = true;
            }
        }, function(error){
            console.log(error);
        });
    }

    $scope.ActOnEvent = function(){
        var loggedInUsername = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        var eventId = document.getElementById('eventId').value;

        if($scope.username === ''){
            document.location.href='/SignIn';
        } else {
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
                if (loggedInUsername === response.data){
                    alert('You have hosted this event.');
                } else {
                    $http({
                        method: 'POST',
                        url: '/UpdateEvent',
                        header: {
                            'Content-Type': 'application/json'
                        },
                        data: {
                            eventId: $scope.eventId,
                            date: $scope.eventDate,
                            description: $scope.description,
                            eventHost: $scope.eventHost,
                            eventName: $scope.eventName,
                            invitees: $scope.invitees + ', ' + loggedInUsername + ', ',
                            isActive: 'y',
                            location: $scope.location,
                            tag: $scope.tag
                        }
                    }).then(function(response){
                        alert('You have been successfully joined this event!');
                    }, function(error){
                        alert('Error on the system');
                    });
                }
            }, function(error){
                alert('Error on the system');
            });


        }
    }
});