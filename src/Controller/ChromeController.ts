class ChromeController {
    public getSync(obj, func: Function): void {
        // chrome.storage.sync.get(obj, func);
        func(obj);
    }

    // public static getUrlToFile(path: string): string {
    //     return chrome.extension.getURL(path);
    // }
}

export default ChromeController;
