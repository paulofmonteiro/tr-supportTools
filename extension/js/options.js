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
    var app = angular.module('options', ['ui.router']);

    app.config(['$compileProvider', function($compileProvider) {
        var home = window.location.href;

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

        var buildFolderPath = function() {
            language = getBrowserLanguage();
            optionsFolder = 'config/' + language + '/options.json';
        }

        service.loadConfigFile = function() {
            buildFolderPath();
            service.config = $http.get(optionsFolder);
        };

        service.getModulesIndex = function() {
            service.config.then(function(response) {
                return response.data.index;
            })
        }

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

            var loadPanels = function(modulesIndex) {
                console.log(modulesIndex);

                modulesIndex.forEach(function(module) {
                    console.log(module);

                    addPanel(module);
                }, this);
            };

            model.$onInit = function() {
                ConfigService.loadConfigFile();

                model.config = ConfigService.getConfig();
                model.config.then(function(response) {
                    model.config = response.data;

                    console.log(model.config);

                    loadPanels(model.config.index);
                });
            }

            model.getModuleConfig = function(index) {
                console.log(model.config.modules[index]);
                return model.config.modules[index];
            }
        }]
    });

    app.component('modulePanel', {

        transclude: true,
        templateUrl: '../components/options/module-panel.html',
        bindings: {
            config: '<'
        },
        require: {
            "parent": "^modulesContainer"
        },
        controllerAs: 'model',
        controller: ['ConfigService', function(ConfigService) {
            var model = this;

            model.$onInit = function() {

            }
        }]

    });
}());