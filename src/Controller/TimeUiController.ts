import TimeModel from "../Model/TimeModel"
import { options } from "../Constants/Options"

class TimeUiController {
    private readonly _timeModel: TimeModel

    private _htmlTime: HTMLElement
    private _video: HTMLVideoElement

    constructor() {
        this._timeModel = new TimeModel()
    }

    public initTime(video: HTMLVideoElement): void {
        if (
            !options.timeElapsed ||
            document.querySelector("time.elapsedTime") ||
            !video
        ) {
            return
        }

        const parent = document.querySelector(
            "div.watch-video--bottom-controls-container > div > div > div:nth-child(2)"
        )

        if (parent) {
            this._video = video
            this.initElapsedTime(parent)
        }
    }

    private initElapsedTime(parent: Element): void {
        this._htmlTime = document.createElement("time")
        this._htmlTime.classList.add("elapsedTime")
        this.updateTime()

        parent.appendChild(this._htmlTime)

        this._video.addEventListener(
            "timeupdate",
            () => {
                this.updateTime()
            },
            false
        )
    }

    private updateTime(): void {
        if (this._video !== undefined) {
            this._timeModel.setCurrentTime(this._video.currentTime)
            this._htmlTime.textContent = this._timeModel.toString()
        }
    }
}

export default TimeUiController
