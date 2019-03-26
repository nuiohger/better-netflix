import TimeModel from "../Model/TimeModel";
import UserOptionsModel from "../Model/UserOptionsModel";

class TimeUiController {
    private readonly _timeModel: TimeModel;
    private readonly _optionKeys: UserOptionsModel;

    private _htmlTime: HTMLElement;
    private _timeInterval: number;
    private _video: HTMLVideoElement;

    constructor() {
        this._timeModel = new TimeModel();
        this._optionKeys = UserOptionsModel.optionKeys;
    }

    public setTimeInterval(video: HTMLVideoElement): void {
        this._video = video;

        if(this._optionKeys.timeElapsed) {
            if(this._timeInterval !== undefined) {
                clearInterval(this._timeInterval);
            }

            const _this = this;
            this._timeInterval = setInterval(function() {
                _this.initTime();
            }, 500);
        }
    }

    private initTime(): void {
        if(this._video.src !== "") {
            this.removeTimeFromPreviousVideo();
            this.initElapsedTime();
            clearInterval(this._timeInterval);
            this._timeInterval = undefined;
        }
    }

    private initElapsedTime(): void {
        this._htmlTime = document.createElement("time");
        this._htmlTime.classList.add("elapsedTime", "time-remaining__time");
        this._htmlTime.textContent = "0:00";
        const timeParent: HTMLDivElement = document.createElement("div");
        timeParent.classList.add("PlayerControls--control-element", "text-control");
        timeParent.style.textAlign = "left";
        timeParent.appendChild(this._htmlTime);

        const parent: Node = document.getElementsByClassName("PlayerControls--control-element progress-control")[0];
        parent.insertBefore(timeParent, parent.firstChild);

        const _this: TimeUiController = this;
        this._video.addEventListener("timeupdate", function() {
            _this.updateTime();
        }, false);
    }

    private updateTime(): void {
        if(this._video !== undefined) {
            this._timeModel.setCurrentTime(this._video.currentTime);
            this._htmlTime.textContent = this._timeModel.toString();
        }
    }

    private removeTimeFromPreviousVideo(): void {
        const time = document.querySelector("time.elapsedTime");
        if(time) {
            time.parentElement.removeChild(time);
        }
    }
}

export default TimeUiController;
