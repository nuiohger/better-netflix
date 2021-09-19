import VideoController from './VideoController'
import StatisticsController from './StatisticController'
import { options } from '../Constants/Options'

interface IAction {
  key: string

  execute(videoController: VideoController): void
}

class ZoomInAction implements IAction {
  key: string = options.zoomIn

  public execute (videoController: VideoController): void {
    videoController.addZoom(5)
  }
}

class ZoomOutAction implements IAction {
  key: string = options.zoomOut

  public execute (videoController: VideoController): void {
    videoController.addZoom(-5)
  }
}

class ResetZoomAction implements IAction {
  key: string = options.resetZoom

  public execute (videoController: VideoController): void {
    videoController.setZoom(100)
  }
}

class FullZoomAction implements IAction {
  key: string = options.fullZoom

  public execute (videoController: VideoController): void {
    videoController.setZoom(135)
  }
}

class DisableMouseAction implements IAction {
  key: string = options.disableMouse

  public execute (videoController: VideoController): void {
    const video = videoController.getHtmlVideo
    video.requestPointerLock()
  }
}

class EnableMouseAction implements IAction {
  key: string = options.enableMouse

  public execute (): void {
    document.exitPointerLock()
  }
}

class ToggleStatisticsAction implements IAction {
  key: string = options.toggleStatistics

  public execute (videoController: VideoController): void {
    StatisticsController.toggle(videoController)
  }
}

class CustomZoomAction implements IAction {
  key: string = options.customZoom

  public execute (videoController: VideoController): void {
    videoController.setZoom(100 + options.customZoomAmount * 5)
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
    toggleStatistics: ToggleStatisticsAction,
    customZoom: CustomZoomAction
  }

  public static getAction (actionName: string): IAction {
    const Action = this._classDictionary[actionName]

    if (Action === undefined) {
      throw new Error('Action ' + actionName + ' was not found.')
    }

    return new Action()
  }

  public static get actionNames (): string[] {
    return Object.keys(this._classDictionary)
  }
}

export { ActionFactory, IAction }
