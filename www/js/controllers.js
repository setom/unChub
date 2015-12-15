angular.module('unChub.controllers', [])

.controller('MenuCtrl', function($scope) {

})

.controller('HomeCtrl', function($timeout, $scope, $state){
    
    $scope.goLog = function() {
        $state.go('app.logActivity');
    };

})

.controller('LogActivityCtrl', function($timeout, $scope, $state, $ionicPopup){

    $scope.logActivity = function(name, points){
        //confirmation dialog
        var confirmPopup = $ionicPopup.confirm({
            title: name,
            template: "Log This Activity?"
        });
        confirmPopup.then(function(res){
            if(res){
                $state.go("app.home");
            } else {
                console.log("cancelled by user");
            }
        });
    };

})

.controller('SettingsCtrl', function($scope, $state, $ionicPopup){
    
    $scope.eraseTable = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: "Erase All Records",
            template: "Are you sure?"
        });
        confirmPopup.then(function(res){
            if(res){
                $state.go("app.home");
            } else {
                console.log("cancelled by user");
            }
        });
    };
    
});




