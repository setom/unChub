angular.module('unChub.controllers', ['unChub.activitiesDB'])

.controller('MenuCtrl', function($scope) {

})

.controller('HomeCtrl', function(){
            
})

.controller('LogActivityCtrl', function($scope, DB){

    $scope.logRun = function(){
        var name = "Run";
        var points = "4";
        DB.logActivity(name, points);
    };

})

.controller('SettingsCtrl', function($scope, DB){
    
    $scope.eraseTable = function() {
        DB.eraseTable();
    };
});




