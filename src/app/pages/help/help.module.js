/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.help', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('help', {
          url: '/help',
          templateUrl: 'app/pages/help/help.html',
          title: 'Ayuda',
          controller: 'HelpCtrl',
          sidebarMeta: {
            icon: 'ion-help',          },
        });
  }

})();
