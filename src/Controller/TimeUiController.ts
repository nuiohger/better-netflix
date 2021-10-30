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
            "div > div.watch-video--bottom-controls-container.ltr-hpbgml > div > div > div:nth-child(1)"
        )

        if (parent) {
            this._video = video
            this.initElapsedTime(parent)
        }
    }

    private initElapsedTime(parent: Element): void {
        this._htmlTime = document.createElement("time")
        this._htmlTime.classList.add("elapsedTime", "ltr-pw0kjc")
        this.updateTime()

        const timeParent: HTMLDivElement = document.createElement("div")
        timeParent.classList.add("ltr-6alejv")
        timeParent.style.textAlign = "left"
        timeParent.appendChild(this._htmlTime)

        parent.insertBefore(timeParent, parent.firstChild)

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
