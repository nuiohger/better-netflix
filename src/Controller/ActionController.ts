import VideoController from "./VideoController"
import StatisticsController from "./StatisticController"
import { options } from "../Constants/Options"
import ToggleSubtitleAction from "./actions/ToggleSubtitleAction"
import IAction from "./actions/IAction"
import ToggleHelpAction from "./actions/ToggleHelpAction"

class ZoomInAction implements IAction {
    key: string = options.zoomIn

    public execute(videoController: VideoController): void {
        videoController.addZoom(5)
    }
}

class ZoomOutAction implements IAction {
    key: string = options.zoomOut

    public execute(videoController: VideoController): void {
        videoController.addZoom(-5)
    }
}

class ResetZoomAction implements IAction {
    key: string = options.resetZoom

    public execute(videoController: VideoController): void {
        videoController.setZoom(100)
    }
}

class FullZoomAction implements IAction {
    key: string = options.fullZoom

    public execute(videoController: VideoController): void {
        videoController.setZoom(135, 135)
    }
}

class DisableMouseAction implements IAction {
    key: string = options.disableMouse

    public execute(videoController: VideoController): void {
        const video = videoController.getHtmlVideo
        video.requestPointerLock()
    }
}

class EnableMouseAction implements IAction {
    key: string = options.enableMouse

    public execute(): void {
        document.exitPointerLock()
    }
}

class ToggleStatisticsAction implements IAction {
    key: string = options.toggleStatistics

    public execute(videoController: VideoController): void {
        StatisticsController.toggle(videoController)
    }
}

class CustomZoomAction implements IAction {
    key: string = options.customZoom

    public execute(videoController: VideoController): void {
        const zoom = 100 + options.customZoomAmount * 5
        videoController.setZoom(zoom, zoom)
    }
}

class PictureInPictureAction implements IAction {
    key: string

    execute(videoController: VideoController): void {
        if (document.pictureInPictureElement) {
            document.exitPictureInPicture()
        } else if (document.pictureInPictureEnabled) {
            videoController.getHtmlVideo.requestPictureInPicture()
        }
    }
}

class ActionFactory {
    private static _classDictionary = {
        zoomIn: new ZoomInAction(),
        zoomOut: new ZoomOutAction(),
        resetZoom: new ResetZoomAction(),
        fullZoom: new FullZoomAction(),
        disableMouse: new DisableMouseAction(),
        enableMouse: new EnableMouseAction(),
        toggleStatistics: new ToggleStatisticsAction(),
        customZoom: new CustomZoomAction(),
        toggleSubtitles: new ToggleSubtitleAction(),
        pictureInPicture: new PictureInPictureAction(),
        toggleHelp: new ToggleHelpAction(),
    }

    public static getAction(actionName: string): IAction | undefined {
        return this._classDictionary[actionName]
    }

    public static get actionNames(): string[] {
        return Object.keys(this._classDictionary)
    }
}

export { ActionFactory, IAction }
