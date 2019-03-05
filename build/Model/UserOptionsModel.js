import ChromeController from "../Controller/ChromeController";
import defaultKeys from "../Constants/Options";
class UserOptionsModel {
    constructor(zoomIn = "", zoomOut = "", resetZoom = "", fullZoom = "", disableMouse = "", enableMouse = "", timeElapsed = true, toggleStatistics = "") {
        if (!this._chromeController)
            this._chromeController = new ChromeController();
        const _this = this;
        this._chromeController.getSync(defaultKeys, items => {
            _this._selectHighestBitrate = items.selectHighestBitrate;
            _this._menuOnTop = items.menuOnTop;
            _this._volumeMouseWheel = items.volumeMouseWheel;
        });
        this._zoomIn = zoomIn;
        this._zoomOut = zoomOut;
        this._resetZoom = resetZoom;
        this._fullZoom = fullZoom;
        this._disableMouse = disableMouse;
        this._enableMouse = enableMouse;
        this._timeElapsed = timeElapsed;
        this._toggleStatistics = toggleStatistics;
    }
    get zoomIn() {
        return this._zoomIn;
    }
    get zoomOut() {
        return this._zoomOut;
    }
    get resetZoom() {
        return this._resetZoom;
    }
    get fullZoom() {
        return this._fullZoom;
    }
    get disableMouse() {
        return this._disableMouse;
    }
    get enableMouse() {
        return this._enableMouse;
    }
    get timeElapsed() {
        return this._timeElapsed;
    }
    get toggleStatistics() {
        return this._toggleStatistics;
    }
    get selectHighestBitrate() {
        return this._selectHighestBitrate;
    }
    get menuOnTop() {
        return this._menuOnTop;
    }
    get volumeMouseWheel() {
        return this._volumeMouseWheel;
    }
    static get optionKeys() {
        return new UserOptionsModel("+", "-", ",", ".", "d", "e", true, "q");
    }
    static getPromise() {
        return new ChromeController().getSyncPromise(defaultKeys);
    }
    static callWithOptions(func) {
        return this.getPromise().then(func);
    }
}
export default UserOptionsModel;
