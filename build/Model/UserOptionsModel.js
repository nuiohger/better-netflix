class UserOptionsModel {
    constructor(zoomIn, zoomOut, resetZoom, fullZoom, disableMouse, enableMouse, playPause, timeElapsed, toggleStatistics) {
        this._zoomIn = zoomIn;
        this._zoomOut = zoomOut;
        this._resetZoom = resetZoom;
        this._fullZoom = fullZoom;
        this._disableMouse = disableMouse;
        this._enableMouse = enableMouse;
        this._playPause = playPause;
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
    get playPause() {
        return this._playPause;
    }
    get timeElapsed() {
        return this._timeElapsed;
    }
    get toggleStatistics() {
        return this._toggleStatistics;
    }
    static get defaultKeys() {
        return new UserOptionsModel("+", "-", ",", ".", "d", "e", " ", true, "q");
    }
}
export default UserOptionsModel;
