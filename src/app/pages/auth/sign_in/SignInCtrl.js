/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.auth')
    .controller('SignInCtrl', SignInCtrl);

  /** @ngInject */
  function SignInCtrl($scope, $window, $localStorage, RESTServices) {

  		$scope.showmsg = function(){
			ngDialog.open({
	    		template: 'templates/mensaje.html',
	    		className: 'ngdialog-theme-plain',
	    		controller: ['$scope',  function($scope) {
	        		// controller logic
	        		$scope.titleModal = 'Acceso denegado';
	        		$scope.bodyModal = 'El usuario y/o la contraseña ingresada son incorrectos';
	        		
	        		$scope.close = function(){
	        			ngDialog.close();
					};
	    		}]   		
			});
		};  

  	    $scope.login = function(usuario,contrasena){
		var field = {
			"usuario": usuario,
			"contrasena": contrasena
		};    	
    	RESTServices.login(field).then(function(data){
			if(data.code==200){
				$localStorage.id_cliente = data.id;
				$localStorage.nombre_cliente = data.nombre;
				$localStorage.login = true;
				$window.location.href='#/dashboard';
			}else{
				$localStorage.id_cliente = undefined;
				$localStorage.nombre_cliente = undefined;
				$localStorage.login = undefined;
				$scope.showmsg();
			}
		});
        
    }
  }

})();
