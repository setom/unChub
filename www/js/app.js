/**
 * unChub 
 * @Author Matt Seto
 * 14 May, 2015
 * 
 */
angular.module('unChub', ['ionic', 'unChub.controllers', 'unChub.activitiesDB'])

.run(function($ionicPlatform, DB) {
  $ionicPlatform.ready(function() {    
    //open the DB
    DB.openDB();
    
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'MenuCtrl'
  })

  .state('app.home', {
    url: "/home",
    views: {
      'menuContent': {
        templateUrl: "templates/home.html",
        controller: 'HomeCtrl'
      }
    }
  })
  
  .state('app.logActivity', {
    url: "/logActivity",
    views: {
      'menuContent': {
        templateUrl: "templates/logActivity.html",
        controller: 'LogActivityCtrl'
      }
    }
  });

    // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
