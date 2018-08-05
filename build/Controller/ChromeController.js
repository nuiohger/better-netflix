class ChromeController {
    getSync(obj, func) {
        chrome.storage.sync.get(obj, func);
    }
    getSyncPromise(obj) {
        return chrome.storage.sync.get(obj);
    }
}
export default ChromeController;
