(function() {

/**
 * init the dependencies
 */
pmLogger.init({
    originFile: 'options.js'
});

var configFirebase = {
    apiKey: "AIzaSyCarMcaUpS9konr4FyroyRbS0C1AZm6DDo",
    authDomain: "tr-suport-tools.firebaseapp.com",
    databaseURL: "https://tr-suport-tools.firebaseio.com",
    storageBucket: "tr-suport-tools.appspot.com",
    messagingSenderId: "1069050264322"
};
firebase.initializeApp(configFirebase);


/**
 * define angular app
 */
var app = angular.module('options', ['ui-router']);

app.service('ConfigService', ['$http', function($http){
   var service = this;

   var language;
   var optionsFolder;
   var optionsConfig;

    var getBrowserLanguage = function(){
        return navigator.language;
    }

    var buildFolderPath = function(){
        language = getBrowserLanguage();
        optionsFolder = 'config/' + language + '/options.json';
    }

    service.loadConfigFile = function(){
        buildFolderPath();

        service.config = $http.get(optionsFolder);
    };

    service.getConfig = function(){
        return service.config;
    }   
}]);

app.controller('MainController', ['$scope', 'ConfigService', function($scope, ConfigService) {
    
}]);

app.component('optionPanel', {

    transclude: true,
	templateUrl: '../components/options/option-panel.html',
    controllerAs: 'model',
	controller: ['ConfigService', function(ConfigService){
		var model = this;
        
         ConfigService.loadConfigFile();
        console.log(ConfigService.getConfig());

        var config = ConfigService.getConfig();
        config.then(function(response){
            console.log(response.data);

            model.title = response.data.modules[0].components[0].title;
        })
	}]

});

}());