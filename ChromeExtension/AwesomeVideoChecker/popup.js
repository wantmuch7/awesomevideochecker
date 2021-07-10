let tbApliLink = document.getElementById("api-link");
let btApiSave = document.getElementById("api-link-save-button");
let btDeleteCache = document.getElementById("delete-cache-button");
let body = document.getElementById("main-body");
let message = document.getElementById("message");

const loadApiLink = function(){
    var apiValue = localStorage.getItem("awesomevideochecker-docker-api-link");
    if( apiValue == undefined || apiValue == ""){
        tbApliLink.value = "127.0.0.1:54320";
        localStorage.setItem("awesomevideochecker-docker-api-link", tbApliLink.value);
        apiValue = tbApliLink.value;
    }
    else{
        document.getElementById("api-link").value = apiValue
    }
    chrome.storage.local.set({api: apiValue}, function() {
        console.log('Value is set to ' + apiValue);
      });
}
const saveApiLink = function(){
    localStorage.setItem("awesomevideochecker-docker-api-link", tbApliLink.value);
    chrome.storage.local.set({api: tbApliLink.value}, function() {
        console.log('Value is set to ' + tbApliLink.value);
      });
    message.innerHTML = "Saved";
}

const deleteCache = function(){
    document.location = 'http://' + localStorage.getItem("awesomevideochecker-docker-api-link") + '/delete_cache.php';
    message.innerHTML = "Done";
}

btApiSave.onclick = saveApiLink;
btDeleteCache.onclick = deleteCache;
body.onload = loadApiLink;