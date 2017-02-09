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
     * define angular module
     */
    var app = angular.module('options', ['ui.router']);

    /**
     * app configurations
     */
    app.config(['$compileProvider', function($compileProvider) {

        /**
         * add chrome extension path to img src whitelist to load 
         * images dinamicaly
         */
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|chrome-extension):/);

    }]);


    app.service('ConfigService', ['$http', function($http) {
        var service = this;

        var language;
        var optionsFolder;
        var optionsConfig;

        var getBrowserLanguage = function() {
            return navigator.language;
        }

        var buildFolderPath = function(moduleName) {
            language = getBrowserLanguage();
            optionsFolder = 'config/' + language + '/' + moduleName + '.json';
        }

        service.loadConfigFile = function(moduleName) {
            buildFolderPath(moduleName);
            service.config = $http.get(optionsFolder);
        };

        service.getConfig = function() {
            return service.config;
        }
    }]);

    app.component('modulesContainer', {

        transclude: true,
        templateUrl: '../components/options/modules-container.html',
        controllerAs: 'model',
        controller: ['ConfigService', function(ConfigService) {
            var model = this;

            model.panels = [];

            var addPanel = function(panel) {
                model.panels.push(panel);

                console.log(model.panels);
            };

            model.$onInit = function() {                
                addPanel('core');
            }
        }]
    });

    app.component('modulePanel', {

        transclude: true,
        templateUrl: '../components/options/module-panel.html',
        bindings: {
            name: '@'
        },
        require: {
            "parent": "^modulesContainer"
        },
        controllerAs: 'model',
        controller: ['ConfigService', function(ConfigService) {
            var model = this;

            model.$onInit = function() {
                ConfigService.loadConfigFile(model.name + '.template');

                model.config = ConfigService.getConfig();
                model.config.then(function(response){
                    model.config = response.data;
                })
            }
        }]

    });
}());