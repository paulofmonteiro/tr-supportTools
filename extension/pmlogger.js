/**
 * PMLogger 0.1
 * A simple JS log plugin
 * by Paulo Monteiro
 */

/**
 * @name PMLogger
 * @version 0.1
 * @description A simple JS log plugin 
 * 
 * @author Paulo Monteiro
 * @contact paulofelipemonteiro@gmail.com
 * @license MIT license
 */

/**
 * UMD (Universal Module Definition)
 * @see https://github.com/umdjs/umd
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory(root));
    } else if (typeof exports === 'object') {
        module.exports = factory(root);
    } else {
        root.pmLogger = factory(root);
    }
})(typeof global !== "undefined" ? global : this.window || this.global, function(root) {

    'use strict';

    // Object for public APIs
    var logger = {};

    /**
     *variables
     */
    //plugin settings
    var settings;

    // Default settings
    var defaults = {
        defaultLevel: "0",
        originFile: "",
        originObject: "",
        withDate: true,
        withTime: true,
        dateSeparator: "/",
        saveToStorage: true,
        saveToFile: true
    };

    var avalibleSettings = [
        "defaultLevel",
        "originFile",
        "originObject",
        "withDate",
        "withTime",
        "dateSeparator",
        "saveToStorage",
        "saveToFile"
    ]

    // log avalible methods
    var logMethods = [
        { name: "log", avalible: true },
        { name: "trace", avalible: true },
        { name: "debug", avalible: true },
        { name: "info", avalible: true },
        { name: "warn", avalible: true },
        { name: "error", avalible: true }
    ];

    /**
     * @name extendObjects
     * @description Extend an Object by adding the properties of a extendsObj
     * 
     * @private
     * @param {Object} defaultObj Default Object who will be extend
     * @param {Object} extendObj Object who will extend defaul Object
     * 
     * @returns {Object} extend Object with the extend properties of the 2 objects
     */
    var extendObjects = function(defaultObj, extendObj) {
        var extend = {};
        var prop;

        //loop through all properties
        for (prop in defaultObj) {
            //verify if the object has the propertie 
            if (Object.prototype.hasOwnProperty.call(defaultObj, prop)) {
                extend[prop] = defaultObj[prop]
            }
        }

        for (prop in extendObj) {
            if (Object.prototype.hasOwnProperty.call(extendObj, prop)) {
                for (var i = 0; i < avalibleSettings.length; i++) {
                    if (prop == avalibleSettings[i]) {
                        extend[prop] = extendObj[prop]
                    }
                }
            }
        }

        return extend;
    }

    /**
     * @name checkConsoleMethod
     * @description verify if a console method is avalible to use
     * 
     * @private
     * @param {String} method method which will be verify
     * @returns {Boolean}
     */
    var checkConsoleMethod = function(method) {
        if (console[method]) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @name createTimeStamp
     * @description create a formated timeStamp
     * 
     * @private
     * @returns {String} timeStamp formated timeStamp
     */
    var createTimeStamp = function() {
        var timeStamp = '';
        var date = new Date();

        if (settings.withDate) {
            //slice(-2) get the 2 last characters, so if stay 010 returns only 10
            timeStamp += ('0' + date.getDate()).slice(-2) + settings.dateSeparator + ('0' + date.getMonth()).slice(-2) + settings.dateSeparator + date.getFullYear();
        }

        if (settings.withTime) {
            if (settings.withDate) {
                timeStamp += ' ';
            }
            timeStamp += ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
        }

        return timeStamp;
    }

    /**
     * @name createPrefix
     * @description create a prefix for all log message
     * the prefix can contains: 
     *  01. the timeStamp - self explanatory  
     *  02. originFile - the fileName which called the logger
     *  03. originObject - the objectName which called the looger 
     * 
     * @private
     * @returns {String} prefix formated prefix
     */
    var createPrefix = function() {
        var prefix = '';

        prefix += '[' + createTimeStamp() + ']';

        if (settings.originFile && settings.originObject) {
            prefix += '[' + settings.originFile + ' | ' + settings.originObject + ']';
        } else if (settings.originFile) {
            prefix += '[' + settings.originFile + ']';
        } else if (settings.originObject) {
            prefix += '[' + settings.originObject + ']'
        }

        return prefix;
    }

    /**
     * @name logMessage
     * @description create de complete log message, the message have a prefix
     * create a placeholder for the level of the log
     * @private
     * @return {String} completeMsg log message with prefix + levelPlaceHolder + msg
     */
    var createMessage = function(msg) {
        var completeMsg = '';
        var levelPlaceHolder = '{level}';

        completeMsg += createPrefix();
        completeMsg += levelPlaceHolder;
        completeMsg += msg;

        return completeMsg;
    }

    /**
     * @name sendLog
     * @description send the logMessage to the Browser's Console, substitute '{level}' whith the actual level text 
     * and send a logMessage with the proprer level if its avalible
     * 
     * @private
     */
    var sendLog = function(level, logMessage) {
        var logMessage = createMessage(logMessage);

        logMethods.forEach(function(method) {
            if (method.name == level) {
                logMessage = logMessage.replace('{level}', '[' + level.toUpperCase() + ']');

                if (method.avalible) {
                    console[method.name](logMessage);
                } else {
                    console.log(logMessage);
                }
            }
        }, this);
    }

    /**
     * @name createLoggerMethods
     * @description create Logger public methods dinamicaly
     * 
     * @private 
     */
    var createLoggerMethods = function() {
        logMethods.forEach(function(method) {
            logger[method.name] = function(logMessage) {
                sendLog(method.name, logMessage);
            }
        }, this);
    }

    /**
     *@name init
     *@description Initialize the plugin settings
     * 
     *@public
     *@param {Object} options The plugin options that could be configurable by the user 
     */
    logger.init = function(options) {
        settings = extendObjects(defaults, options);

        logMethods.forEach(function(method) {
            method.avalible = checkConsoleMethod(method.name);
        }, this);

        createLoggerMethods();
    }

    return logger
});