import UserOptionsModel from "../Model/UserOptionsModel";
import VideoController from "./VideoController";
import StatisticsController from "./StatisticController";

const defaultKeys: UserOptionsModel = UserOptionsModel.optionKeys;

interface IAction {
    key: string;

    execute(videoController: VideoController): void;
}

class ZoomInAction implements IAction {
    key: string = defaultKeys.zoomIn;

    public execute(videoController: VideoController): void {
        videoController.addZoom(5);
    }
}

class ZoomOutAction implements IAction {
    key: string = defaultKeys.zoomOut;

    public execute(videoController: VideoController): void {
        videoController.addZoom(-5);
    }
}

class ResetZoomAction implements IAction {
    key: string = defaultKeys.resetZoom;

    public execute(videoController: VideoController): void {
        videoController.setZoom(100);
    }
}

class FullZoomAction implements IAction {
    key: string = defaultKeys.fullZoom;

    public execute(videoController: VideoController): void {
        videoController.setZoom(135);
    }
}

class DisableMouseAction implements IAction {
    key: string = defaultKeys.disableMouse;

    public execute(videoController: VideoController): void {
        const video: any = videoController.getHtmlVideo;
        video.requestPointerLock();
    }
}

class EnableMouseAction implements IAction {
    key: string = defaultKeys.enableMouse;

    public execute(): void {
        const doc: any = document;
        doc.exitPointerLock();
    }
}

class ToggleStatisticsAction implements IAction {
    key: string = defaultKeys.toggleStatistics;

    public execute(videoController: VideoController): void {
        StatisticsController.toggle(videoController);
    }
}

class ActionFactory {
    private static _classDictionary = {
        zoomIn: ZoomInAction,
        zoomOut: ZoomOutAction,
        resetZoom: ResetZoomAction,
        fullZoom: FullZoomAction,
        disableMouse: DisableMouseAction,
        enableMouse: EnableMouseAction,
        toggleStatistics: ToggleStatisticsAction
    };

    public static getAction(actionName: string): IAction {
        const action = this._classDictionary[actionName];

        if(action === undefined) throw "Action " + actionName + " was not found.";

        return new action;
    }

    public static get actionNames() {
        return Object.keys(this._classDictionary);
    }
}

export {ActionFactory, IAction};
