angular.module('igniteApp')
.config(['$urlRouterProvider', '$stateProvider','$locationProvider', function ($urlRouterProvider, $stateProvider,$locationProvider) {
    
    
    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard.html',
            controller: 'igniteController'
        })

        .state('details', {
            url: '/details',
            templateUrl: 'views/details.html',
            controller: 'detailsController'
        });

       $urlRouterProvider.otherwise('/dashboard'); 
       $locationProvider.html5Mode(true);
}])

.component('dashboard', {
    templateUrl: 'views/dashboard.html',
    controller: 'igniteController'
})
.component('details', {
    templateUrl: 'views/details.html',
    controller: 'igniteController'
});

