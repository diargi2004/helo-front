var url = 'http://52.90.86.132/helo/services/';

angular.module('BlurAdmin').factory('RESTServices', function($http,$q){
    return{
        login: function(parametros){
            return $http.post(url+'login.php',parametros)
                .then(function(response){
                    return response.data;
                },function(error){
                    return $q.reject(error);
                })
        },
        get_zonas: function(parametros){
            return $http.post(url+'lista_zonas.php',parametros)
                .then(function(response){
                    return response.data;
                },function(error){
                    return $q.reject(error);
                })
        },
        set_programacion: function(parametros){
            return $http.post(url+'programacion_zona.php',parametros)
                .then(function(response){
                    return response.data;
                },function(error){
                    return $q.reject(error);
                })
        },
        get_programacion: function(parametros){
            return $http.post(url+'lista_programacion.php',parametros)
                .then(function(response){
                    return response.data;
                },function(error){
                    return $q.reject(error);
                })
        },
        delete_programacion: function(parametros){
            return $http.post(url+'elimina_programacion.php',parametros)
                .then(function(response){
                    return response.data;
                },function(error){
                    return $q.reject(error);
                })
        },
        edit_programacion: function(parametros){
            return $http.post(url+'edita_programacion.php',parametros)
                .then(function(response){
                    return response.data;
                },function(error){
                    return $q.reject(error);
                })
        }
    }
});




