"use strict";

(function() {

    var appModule = angular.module('app');

    function Routes ($stateProvider, $urlRouterProvider) {
        var homeState = {
            name: 'home',
            url: '/home',
            templateUrl: 'app/components/home/home.html',
            controller: 'HomeController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('app/components/home/home.controller.js');
                }]
            }
        }

        var aboutState = {
            name: 'about',
            url: '/about',
            template: '<div class="otherPages"><h3>about</h3></div>'
        }

        var portfolioState = {
            name: 'portfolio',
            url: '/portfolio',
            template: '<div class="otherPages"><h3>portfolio</h3></div>'
        }

        var blogState = {
            name: 'blog',
            url: '/blog',
            template: '<div class="otherPages"><h3>blog</h3></div>'
        }

        $stateProvider.state(homeState);
        $stateProvider.state(aboutState);
        $stateProvider.state(portfolioState);
        $stateProvider.state(blogState);

        $urlRouterProvider.otherwise('/home')

    }

    Routes.$inject = ['$stateProvider', '$urlRouterProvider'];

    appModule.config(Routes);

}());