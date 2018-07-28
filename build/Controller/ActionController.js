import UserOptionsModel from "../Model/UserOptionsModel";
const defaultKeys = UserOptionsModel.defaultKeys;
class ZoomInAction {
    constructor() {
        this.key = defaultKeys.zoomIn;
    }
    execute(videoController) {
        videoController.addZoom(5);
    }
}
class ZoomOutAction {
    constructor() {
        this.key = defaultKeys.zoomOut;
    }
    execute(videoController) {
        videoController.addZoom(-5);
    }
}
class ResetZoomAction {
    constructor() {
        this.key = defaultKeys.resetZoom;
    }
    execute(videoController) {
        videoController.setZoom(100);
    }
}
class FullZoomAction {
    constructor() {
        this.key = defaultKeys.fullZoom;
    }
    execute(videoController) {
        videoController.setZoom(135);
    }
}
class DisableMouseAction {
    constructor() {
        this.key = defaultKeys.disableMouse;
    }
    execute(videoController) {
        videoController.getHtmlVideo.requestPointerLock();
    }
}
class EnableMouseAction {
    constructor() {
        this.key = defaultKeys.enableMouse;
    }
    execute() {
        document.exitPointerLock();
    }
}
class PlayPauseAction {
    constructor() {
        this.key = defaultKeys.playPause;
    }
    execute(videoController) {
        videoController.togglePlay();
    }
}
class ActionFactory {
    static getAction(actionName) {
        const action = this._classDictionary[actionName];
        if (action === undefined)
            throw "Action " + actionName + " was not found.";
        return new action;
    }
    static get actionNames() {
        return Object.keys(this._classDictionary);
    }
}
ActionFactory._classDictionary = {
    zoomIn: ZoomInAction,
    zoomOut: ZoomOutAction,
    resetZoom: ResetZoomAction,
    fullZoom: FullZoomAction,
    disableMouse: DisableMouseAction,
    enableMouse: EnableMouseAction,
    playPause: PlayPauseAction
};
export { ActionFactory };
