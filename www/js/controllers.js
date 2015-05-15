angular.module('unChub.controllers', ['unChub.activitiesDB', 'unChub.healthIndexDB'])

.controller('MenuCtrl', function($scope) {

})

.controller('HomeCtrl', function($scope, healthIndexDB){
    healthIndexDB.getPoints().then(function(points){
       if (points !== null) {
           $scope.score = points;
       } else {
           $scope.score = 0;
       }
    });
})

.controller('LogActivityCtrl', function($scope, activitiesDB){

    $scope.logActivity = function(name, points){
        activitiesDB.logActivity(name, points);
    };

})

.controller('SettingsCtrl', function($scope, activitiesDB, healthIndexDB){
    
    $scope.eraseTable = function() {
        activitiesDB.eraseTable();
        healthIndexDB.eraseTable();
    };
});




