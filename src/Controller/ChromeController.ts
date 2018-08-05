class ChromeController {
    public getSync(obj, func): void {
        chrome.storage.sync.get(obj, func);
    }

    public getSyncPromise(obj): any {
        return chrome.storage.sync.get(obj);
    }

    // public static getUrlToFile(path: string): string {
    //     return chrome.extension.getURL(path);
    // }
}

export default ChromeController;
