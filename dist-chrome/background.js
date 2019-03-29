// From https://github.com/truedread/netflix-1080p

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        return {
            redirectUrl: chrome.extension.getURL("resources/cadmium-playercore.js")
        };
    }, {
        urls: [
            "*://assets.nflxext.com/*/ffe/player/html/*",
            "*://www.assets.nflxext.com/*/ffe/player/html/*"
        ]
    }, ["blocking"]
);
