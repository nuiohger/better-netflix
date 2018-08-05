import ChromeController from "../Controller/ChromeController";
import defaultKeys from "../Constants/Options";
class UserOptionsModel {
    constructor(zoomIn = "", zoomOut = "", resetZoom = "", fullZoom = "", disableMouse = "", enableMouse = "", timeElapsed = true, toggleStatistics = "") {
        if (!this._chromeController)
            this._chromeController = new ChromeController();
        const _this = this;
        this._chromeController.getSync(defaultKeys, items => {
            _this._selectHighestBitrate = items.selectHighestBitrate;
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
    static get optionKeys() {
        return new UserOptionsModel("+", "-", ",", ".", "d", "e", true, "q");
    }
    static getPromise() {
        return new ChromeController().getSyncPromise(defaultKeys);
    }
}
export default UserOptionsModel;
