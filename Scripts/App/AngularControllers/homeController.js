app.controller('HomeController', function($scope, $http, angularService){
    console.log('This is HomeController');

    $scope.eventSearched = false;


    $scope.SearchEvents = function(){
        $scope.eventSearched = true;

        $http({
            method: 'POST',
            url: '/EventSearchList',
            header: {
                'Content-Type': 'application/json'
            },
            data: {
                keyword: $scope.searchKeyword,
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
});