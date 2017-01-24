pmLogger.init({
    originFile: 'background.js'
});

chrome.browserAction.onClicked.addListener(function (){
    pmLogger.log('clickerd');

    chrome.browserAction.setPopup({popup: 'popup.html'});
});
