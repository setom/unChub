angular.module('unChub.controllers', ['unChub.activitiesDB', 'unChub.healthIndexDB'])

.controller('MenuCtrl', function($scope) {

})

.controller('HomeCtrl', function($timeout, $scope, $state, healthIndexDB){
   
    
    $timeout(function() {
           healthIndexDB.getPoints().then(function(points){
            if (points !== null) {
                $scope.score = points;
                if($scope.score <=0){
                    $scope.greeting = "You're looking kinda chubby";
                } else {
                    $scope.greeting = "You're successfully un-chubbing";
                }
            } else {
                $scope.score = 0;
                $scope.greeting = "unChub your life!"
            }
        });
        
        if($scope.score <=0){
            $scope.greeting = "You're looking kinda chubby";
        } else {
            $scope.greeting = "You're successfully un-chubbing";
        }
        
        //chart controls   
        $scope.labels = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
        healthIndexDB.getWeeklyPoints().then(function(pts){
            $scope.data = [pts];
        });
        $scope.colours = ["#004358"];
        
    }, 500);
    
    $scope.goLog = function() {
        $state.go('app.logActivity');
    };

})

.controller('LogActivityCtrl', function($timeout, $scope, $state, $ionicPopup, activitiesDB){

    $scope.logActivity = function(name, points){
        //confirmation dialog
        var confirmPopup = $ionicPopup.confirm({
            title: name,
            template: "Log This Activity?"
        });
        confirmPopup.then(function(res){
            if(res){
                activitiesDB.logActivity(name, points);
                $state.go("app.home");
            } else {
                console.log("cancelled by user");
            }
        });
    };

})

.controller('SettingsCtrl', function($scope, $state, $ionicPopup, activitiesDB, healthIndexDB){
    
    $scope.eraseTable = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: "Erase All Records",
            template: "Are you sure?"
        });
        confirmPopup.then(function(res){
            if(res){
                activitiesDB.eraseTable();
                healthIndexDB.eraseTable();
                $state.go("app.home");
            } else {
                console.log("cancelled by user");
            }
        });
    };
    
});




