/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.auth', [])
      .config(routeConfig);

  /** @ngInject */
   function routeConfig($stateProvider) {
    $stateProvider
     .state('sign_in', {
          url: '/sign_in',
          templateUrl: 'app/pages/auth/sign_in/sign_in.html',
          title: 'Sign in',
          controller: 'SignInCtrl',
        })
    .state('sign_up', {
          url: '/sign_up',
          templateUrl: 'app/pages/auth/sign_up/sign_up.html',
          title: 'Sign up',
          controller: 'SignUpCtrl',
        });
   }

})();
