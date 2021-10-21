

function getKeyName(url){
   return url.replace('http://','').replace('https://','').split(/[\/?#]/)[0].replace(/\./g, '');
}


chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
chrome.declarativeContent.onPageChanged.addRules([{
  conditions: [new chrome.declarativeContent.PageStateMatcher({
    //pageUrl: {hostEquals: 'developer.chrome.com'},
  })],
  actions: [new chrome.declarativeContent.ShowPageAction()]
}]);
});

