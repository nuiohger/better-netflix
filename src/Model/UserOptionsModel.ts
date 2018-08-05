class UserOptionsModel {
    private _zoomIn: string;
    private _zoomOut: string;
    private _resetZoom: string;
    private _fullZoom: string;
    private _disableMouse: string;
    private _enableMouse: string;
    private _timeElapsed: boolean;
    private _toggleStatistics: string;

    private constructor(zoomIn: string, zoomOut: string, resetZoom: string, fullZoom: string, disableMouse: string, enableMouse: string, timeElapsed: boolean, toggleStatistics: string) {
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

    public static get defaultKeys(): UserOptionsModel {
        return new UserOptionsModel("+", "-", ",", ".", "d", "e", true, "q");
    }
}

export default UserOptionsModel;
