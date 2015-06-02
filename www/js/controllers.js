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
   }, 1000);
})

.controller('LogActivityCtrl', function($timeout, $scope, activitiesDB){
   $timeout(function() {
        $scope.logActivity = function(name, points){
            activitiesDB.logActivity(name, points);
        };
   }, 1000);
})

.controller('SettingsCtrl', function($scope, activitiesDB, healthIndexDB){
    
    $scope.eraseTable = function() {
        activitiesDB.eraseTable();
        healthIndexDB.eraseTable();
    };
});




