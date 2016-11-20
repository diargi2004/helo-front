/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',

    'BlurAdmin.pages.dashboard',
    // 'BlurAdmin.pages.ui',
    // 'BlurAdmin.pages.components',
    // 'BlurAdmin.pages.form',
    // 'BlurAdmin.pages.tables',
    // 'BlurAdmin.pages.charts',
    // 'BlurAdmin.pages.maps',
    'BlurAdmin.pages.statistics',
    'BlurAdmin.pages.help',
    'BlurAdmin.pages.profile',
    'BlurAdmin.pages.auth'
    //'BlurAdmin.pages.index',

  ])
      .config(routeConfig);

  /** @ngInject */
   function routeConfig($stateProvider,$urlRouterProvider) {

     $urlRouterProvider.otherwise('/dashboard');

     // $stateProvider
     //        .state('sign_in', {
     //            url: "/sign_in",
     //            templateUrl: "app/auth/sign_in/sign_in.html"
     //        })
     //        .state('sign_up', {
     //            url: "/sign_up",
     //            templateUrl: "app/auth/sign_up/sign_up.html",
     //        })
     //        .state('otherwise', {
     //            url: "/dashboard"
     //        })

// $stateProvider

//      .state('auth', {
//           url: "/auth",
//           templateUrl: "app/pages/auth/index.html"
//       })
//       .state('working', {
//           url: "/working",
//           templateUrl: "app/pages/index.html"
//       })
//      .state('otherwise',{
//           url: "/",
//           templateUrl: "app/pages/auth/index.html"
//       });


    // baSidebarServiceProvider.addStaticItem({
      // title: 'Pages',
      // icon: 'ion-document',
      // subMenu: [{
        // title: 'Sign In',
        // fixedHref: 'auth.html',
        // blank: true
      // }, {
        // title: 'Sign Up',
        // fixedHref: 'reg.html',
        // blank: true
      // }, {
        // title: 'User Profile',
        // stateRef: 'profile'
      // }, {
        // title: '404 Page',
        // fixedHref: '404.html',
        // blank: true
      // }]
    // });
  //   baSidebarServiceProvider.addStaticItem({
  //     title: 'Menu Level 1',
  //     icon: 'ion-ios-more',
  //     subMenu: [{
  //       title: 'Menu Level 1.1',
  //       disabled: true
  //     }, {
  //       title: 'Menu Level 1.2',
  //       subMenu: [{
  //         title: 'Menu Level 1.2.1',
  //         disabled: true
  //       }]
  //     }]
  //   });
   }

})();

angular.module('BlurAdmin.pages').config(function($httpProvider) {
  $httpProvider.defaults.headers.common.Accept = 'application/json; charset=utf-8';
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

  /**
   * The workhorse; converts an object to x-www-form-urlencoded serialization.
   * @param {Object} obj
   * @return {String}*/
   var param = function(obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
    
    for(name in obj) {
      value = obj[name];
      
      if(value instanceof Array) {
        for(i=0; i<value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value instanceof Object) {
        for(subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }
    
    return query.length ? query.substr(0, query.length - 1) : query;
  };

  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];

})
