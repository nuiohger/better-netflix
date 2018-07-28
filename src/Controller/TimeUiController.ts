import TimeModel from "../Model/TimeModel";
import UserOptionsModel from "../Model/UserOptionsModel";
import ChromeController from "./ChromeController";

class TimeUiController {
    private readonly _timeModel: TimeModel;
    private readonly _defaultKeys: UserOptionsModel;
    private readonly _chromeController: ChromeController;

    private _htmlTime: HTMLElement;
    private _timeInterval: number;
    private _video: HTMLVideoElement;

    constructor(chromeController: ChromeController) {
        this._timeModel = new TimeModel();
        this._defaultKeys = UserOptionsModel.defaultKeys;
        this._chromeController = chromeController;
    }

    public setTimeInterval(video: HTMLVideoElement): void {
        this._video = video;

        const _this: TimeUiController = this;
        this._chromeController.getSync(this._defaultKeys, function(items) {
            if(items.timeElapsed) {
                if(_this._timeInterval !== undefined) {
                    clearInterval(_this._timeInterval);
                }

                _this._timeInterval = setInterval(function() {
                    _this.initTime();
                }, 500);
            }
        });
    }

    private initTime(): void {
        if(this._video.src !== "") {
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
}

export default TimeUiController;
