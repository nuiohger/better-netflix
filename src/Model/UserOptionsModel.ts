import ChromeController from "../Controller/ChromeController";
import defaultKeys from "../Constants/Options";

class UserOptionsModel {
    private _zoomIn: string;
    private _zoomOut: string;
    private _resetZoom: string;
    private _fullZoom: string;
    private _disableMouse: string;
    private _enableMouse: string;
    private _timeElapsed: boolean;
    private _toggleStatistics: string;
    private _selectHighestBitrate: boolean;
    private _menuOnTop: boolean;
    private _volumeMouseWheel: boolean;

    private _chromeController: ChromeController;

    private constructor(zoomIn: string = "", zoomOut: string = "", resetZoom: string = "", fullZoom: string = "", disableMouse: string = "", enableMouse: string = "", timeElapsed: boolean = true, toggleStatistics: string = "") {
        if(!this._chromeController) this._chromeController = new ChromeController();

        const _this: UserOptionsModel = this;
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

    public get zoomIn(): string {
        return this._zoomIn;
    }
    public get zoomOut(): string {
        return this._zoomOut;
    }
    public get resetZoom(): string {
        return this._resetZoom;
    }
    public get fullZoom(): string {
        return this._fullZoom;
    }
    public get disableMouse(): string {
        return this._disableMouse;
    }
    public get enableMouse(): string {
        return this._enableMouse;
    }
    public get timeElapsed(): boolean {
        return this._timeElapsed;
    }

    public get toggleStatistics(): string {
        return this._toggleStatistics;
    }

    public get selectHighestBitrate(): boolean {
        return this._selectHighestBitrate;
    }

    public get menuOnTop(): boolean {
        return this._menuOnTop;
    }

    public get volumeMouseWheel(): boolean {
        return this._volumeMouseWheel;
    }

    public static get optionKeys(): UserOptionsModel {
        return new UserOptionsModel("+", "-", ",", ".", "d", "e", true, "q");
    }

    public static getPromise(): any {
        return new ChromeController().getSyncPromise(defaultKeys);
    }

    public static callWithOptions(func: Function): any {
        return this.getPromise().then(func);
    }
}

export default UserOptionsModel;
