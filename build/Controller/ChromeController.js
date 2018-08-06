class ChromeController {
    getSync(obj, func) {
        chrome.storage.sync.get(obj, func);
    }
    getSyncPromise(obj) {
        return new Promise(resolve => chrome.storage.sync.get(obj, resolve));
    }
}
export default ChromeController;
