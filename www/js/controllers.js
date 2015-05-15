angular.module('unChub.controllers', ['unChub.activitiesDB'])

.controller('MenuCtrl', function($scope) {

})

.controller('HomeCtrl', function(){
            
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




