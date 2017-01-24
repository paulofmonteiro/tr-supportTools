chrome.browserAction.onClicked.addListener(function (tab){
    pmLogger.log(tab);
    pmLogger.log('clickerd');
});