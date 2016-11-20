/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('DashboardCtrl', DashboardCtrl);

  /** @ngInject */
  function DashboardCtrl($scope, $window,RESTServices,$filter,ngDialog, $localStorage) {
  	$scope.flag1 = false;
	$scope.flag2 = false;	

	//Verificar que se haya iniciado sesión desde el login. Si refrescan la página redirecciona al login
	if($localStorage.login==undefined){
		delete $localStorage.id_cliente;
		$window.location.href='#/login';
	}

	$scope.nombre_cliente = $localStorage.nombre_cliente;

	var field = {
		"id_cliente": $localStorage.id_cliente
	};

	//Listado de zonas asociadas al cliente
	RESTServices.get_zonas(field).then(function(data){
		if(data.code==200){
			$scope.ids = data.id;
			$scope.nombres = data.nombre;
		}
	});

	$scope.add_programacion = function(zona){
		ngDialog.open({                  
            template: 'templates/add_programacion.html',
            className: 'ngdialog-theme-plain',
            closeByDocument: false,
    		controller: ['$scope',  function($scope) {
        		// controller logic
        		$scope.titleModal = 'Programación de apagado';
        		$scope.bodyModal = 'Aquí podrás definir los horarios de apagado para la zona seleccionada';
        		$scope.zona = zona;
        		$scope.agenda=[]
        		$scope.agenda.day=undefined;
    			$scope.agenda.hini=undefined;
    			$scope.agenda.hfin=undefined;
    			$scope.agenda.frequency=undefined;

        		$scope.cerrar = function(){
        			ngDialog.close();
        		}
        		$scope.agendar = function(){	
	        		if(!(($scope.agenda.day==undefined)||($scope.agenda.hini==undefined)||($scope.agenda.hfin==undefined)||($scope.agenda.frequency==undefined))){
	        			var field = {
							"id_zona": $scope.zona,
							"dia": $filter('date')($scope.agenda.day, 'yyyy/MM/dd'),
							"hora_inicio":$filter('date')($scope.agenda.hini, 'HH:mm:ss'),
							"hora_fin":$filter('date')($scope.agenda.hfin, 'HH:mm:ss'),
							"frecuencia": $scope.agenda.frequency
						};

						//Agregar programación
						RESTServices.set_programacion(field).then(function(data){
							if(data.code==200){							
			        			$scope.showmsg = function(){
									ngDialog.open({
							    		template: 'templates/mensaje.html',
							    		className: 'ngdialog-theme-plain',
							    		controller: ['$scope',  function($scope) {
							        		// controller logic
							        		$scope.titleModal = 'Programación de apagado';
							        		$scope.bodyModal = 'Se ha programado el apagado de la zona correctamente';
							        		
							        		$scope.close = function(){
							        			ngDialog.close();
											};
							    		}]   		
									});
								};
				        		$scope.showmsg();	        		
				        		ngDialog.close();
							}else{
			        			$scope.showmsg = function(){
									ngDialog.open({
							    		template: 'templates/mensaje.html',
							    		className: 'ngdialog-theme-plain',
							    		controller: ['$scope',  function($scope) {
							        		// controller logic
							        		$scope.titleModal = 'Programación de apagado';
							        		$scope.bodyModal = 'No se ha podido registrar la programación de forma correcta';
							        		
							        		$scope.close = function(){
							        			ngDialog.close();
											};
							    		}]   		
									});
								};
				        		$scope.showmsg();	        		
				        		ngDialog.close();								
							}
						});
	        		}else{
	        			$scope.showmsg = function(){
							ngDialog.open({
					    		template: 'templates/mensaje.html',
					    		className: 'ngdialog-theme-plain',
					    		controller: ['$scope',  function($scope) {
					        		// controller logic
					        		$scope.titleModal = 'Programación de apagado';
					        		$scope.bodyModal = 'Para programar el apagado de la zona debe ingresar todos los campos del formulario';
					        		
					        		$scope.close = function(){
					        			ngDialog.close();
									};
					    		}]   		
							});
						};
		        		$scope.showmsg();
	        		}        		
        		}		
    		}]
		});
	};

	//Listado de programaciones agendadas por zona
	$scope.list_programacion = function(zona){
		ngDialog.open({                  
            template: 'templates/list_programacion.html',
            className: 'ngdialog-theme-plain',
            closeByDocument: false,
    		controller: ['$scope',  function($scope) {
    			$scope.titleModal = 'Lista de programación de apagados';
				var parameters = {
					"id_zona": zona
				};
    			RESTServices.get_programacion(parameters).then(function(data){
					$scope.prog_ids = data.id;
					$scope.prog_dias = data.dia;
					$scope.prog_hinis = data.hora_inicio;
					$scope.prog_hfins = data.hora_fin;
					$scope.prog_frecs = data.frecuencia;					
				});

        		$scope.cerrar = function(){
        			ngDialog.close();
        		}

        		$scope.delete_programacion = function(id){
					ngDialog.open({                  
			            template: 'templates/confirmacion.html',
			            className: 'ngdialog-theme-plain',
			            closeByDocument: false,
			    		controller: ['$scope',  function($scope) {
			    			$scope.bodyModal = '¿Realmente desea eliminar la programación seleccionada?';

			        		$scope.cancelar = function(){
			        			ngDialog.close();
			        		}

			        		$scope.aceptar = function(){
			        			var field = {
			        				"id_programacion":id
			        			};
			        			RESTServices.delete_programacion(field).then(function(data){
			        				if(data.code ==200){
			        					$scope.showmsg = function(){
											ngDialog.open({
									    		template: 'templates/mensaje.html',
									    		className: 'ngdialog-theme-plain',
									    		controller: ['$scope',  function($scope) {
									        		// controller logic
									        		$scope.titleModal = 'Programación de apagado';
									        		$scope.bodyModal = 'Se ha eliminado la programación correctamente';
									        		
									        		$scope.close = function(){
									        			ngDialog.close();
													};
									    		}]   		
											});
										};
						        		$scope.showmsg();	        		
						        		ngDialog.close();
			        				}
			        			});
			        		}
			    		}]
					}); 
        		}

        		$scope.edit_programacion = function(id,dia,hini,hfin,frecuencia){
					ngDialog.open({                  
			            template: 'templates/confirmacion.html',
			            className: 'ngdialog-theme-plain',
			            closeByDocument: false,
			    		controller: ['$scope',  function($scope) {
			    			$scope.bodyModal = '¿Realmente desea editar la programación seleccionada?';

			        		$scope.cancelar = function(){
			        			ngDialog.close();
			        		}

			        		$scope.aceptar = function(){
	        					$scope.showmsg = function(){
									ngDialog.open({
							    		template: 'templates/add_programacion.html',
							    		className: 'ngdialog-theme-plain',
							    		controller: ['$scope',  function($scope) {
							        		// controller logic
							        		$scope.titleModal = 'Programación de apagado';
							        		$scope.bodyModal = 'Se ha eliminado la programación correctamente';
							        		$scope.agenda=[];
											$scope.agenda.day = new Date(dia); 
											$scope.agenda.day.setTime($scope.agenda.day.getTime() + $scope.agenda.day.getTimezoneOffset()*60*1000 );
											$scope.agenda.hini = new Date(2016,8,31,parseInt(hini.substr(0,2)),parseInt(hini.substr(3,5)),parseInt(hini.substr(6,8)));
											$scope.agenda.hfin = new Date(2016,8,31,parseInt(hfin.substr(0,2)),parseInt(hfin.substr(3,5)),parseInt(hfin.substr(6,8)));
											$scope.agenda.frequency = frecuencia;	

							        		$scope.cerrar = function(){
							        			ngDialog.close();
							        		}

							        		$scope.agendar = function(){	
								        		if(!(($scope.agenda.day==undefined)||($scope.agenda.hini==undefined)||($scope.agenda.hfin==undefined)||($scope.agenda.frequency==undefined))){
								        			var field = {
														"id_programacion": id,
														"dia": $filter('date')($scope.agenda.day, 'yyyy/MM/dd'),
														"hora_inicio":$filter('date')($scope.agenda.hini, 'HH:mm:ss'),
														"hora_fin":$filter('date')($scope.agenda.hfin, 'HH:mm:ss'),
														"frecuencia": $scope.agenda.frequency
													};

													//Agregar programación
													RESTServices.edit_programacion(field).then(function(data){
														if(data.code==200){							
										        			$scope.showmsg = function(){
																ngDialog.open({
														    		template: 'templates/mensaje.html',
														    		className: 'ngdialog-theme-plain',
														    		controller: ['$scope',  function($scope) {
														        		// controller logic
														        		$scope.titleModal = 'Programación de apagado';
														        		$scope.bodyModal = 'Se ha editado la programación de la zona correctamente';
														        		
														        		$scope.close = function(){
														        			ngDialog.close();
																		};
														    		}]   		
																});
															};
											        		$scope.showmsg();	        		
											        		ngDialog.close();
														}else{
										        			$scope.showmsg = function(){
																ngDialog.open({
														    		template: 'templates/mensaje.html',
														    		className: 'ngdialog-theme-plain',
														    		controller: ['$scope',  function($scope) {
														        		// controller logic
														        		$scope.titleModal = 'Programación de apagado';
														        		$scope.bodyModal = 'No se ha podido editar la programación de forma correcta';
														        		
														        		$scope.close = function(){
														        			ngDialog.close();
																		};
														    		}]   		
																});
															};
											        		$scope.showmsg();	        		
											        		ngDialog.close();								
														}
													});
								        		}
								        	}
							    		}]   		
									});
								};
				        		$scope.showmsg();	        		
				        		ngDialog.close();		
			        		}
			    		}]
					}); 
        		}        		
    		}]
		});
	};

	$scope.show = function(){
		$scope.flag1 = !$scope.flag1;
	}

	$scope.show_menu = function(){
		$scope.flag2 = !$scope.flag2;
	}

	$scope.cerrar_sesion = function(){
		delete $localStorage.login;
		delete $localStorage.nombre_cliente;
		delete $localStorage.id_cliente;
		$window.location.href='#/login';
	}

  }

})();
