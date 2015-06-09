angular.module('unChub.controllers', ['unChub.activitiesDB', 'unChub.healthIndexDB'])

.controller('MenuCtrl', function($scope) {

})

.controller('HomeCtrl', function($timeout, $scope, healthIndexDB){
   
    
    $timeout(function() {
           healthIndexDB.getPoints().then(function(points){
            if (points !== null) {
                $scope.score = points;
            } else {
                $scope.score = 0;
            }
        });
        
        //chart controls   
        $scope.labels = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
        healthIndexDB.getWeeklyPoints().then(function(pts){
            $scope.data = [pts];
        });
        
    }, 500);

})

.controller('LogActivityCtrl', function($timeout, $scope, $ionicPopup, activitiesDB){

    $scope.logActivity = function(name, points){
        //confirmation dialog
        var confirmPopup = $ionicPopup.confirm({
            title: name,
            template: "Log This Activity?"
        });
        confirmPopup.then(function(res){
            if(res){
                activitiesDB.logActivity(name, points);
            } else {
                console.log("cancelled by user");
            }
        });
    };

})

.controller('SettingsCtrl', function($scope, $ionicPopup, activitiesDB, healthIndexDB){
    
    $scope.eraseTable = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: "Erase All Records",
            template: "Are you sure?"
        });
        confirmPopup.then(function(res){
            if(res){
                activitiesDB.eraseTable();
                healthIndexDB.eraseTable();
            } else {
                console.log("cancelled by user");
            }
        });
    };
    
});




