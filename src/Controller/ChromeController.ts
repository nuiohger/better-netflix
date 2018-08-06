class ChromeController {
    public getSync(obj, func): void {
        chrome.storage.sync.get(obj, func);
    }

    public getSyncPromise(obj): any {
        //Chrome workaround: Chrome's sync.get does not return a Promise.
        return new Promise(resolve => chrome.storage.sync.get(obj, resolve));
    }

    // public static getUrlToFile(path: string): string {
    //     return chrome.extension.getURL(path);
    // }
}

export default ChromeController;
