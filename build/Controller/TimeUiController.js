import TimeModel from "../Model/TimeModel";
import UserOptionsModel from "../Model/UserOptionsModel";
class TimeUiController {
    constructor(chromeController) {
        this._timeModel = new TimeModel();
        this._defaultKeys = UserOptionsModel.defaultKeys;
        this._chromeController = chromeController;
    }
    setTimeInterval(video) {
        this._video = video;
        const _this = this;
        this._chromeController.getSync(this._defaultKeys, function (items) {
            if (items.timeElapsed) {
                if (_this._timeInterval !== undefined) {
                    clearInterval(_this._timeInterval);
                }
                _this._timeInterval = setInterval(function () {
                    _this.initTime();
                }, 500);
            }
        });
    }
    initTime() {
        if (this._video.src !== "") {
            this.initElapsedTime();
            clearInterval(this._timeInterval);
            this._timeInterval = undefined;
        }
    }
    initElapsedTime() {
        this._htmlTime = document.createElement("time");
        this._htmlTime.classList.add("elapsedTime", "time-remaining__time");
        this._htmlTime.textContent = "0:00";
        const timeParent = document.createElement("div");
        timeParent.classList.add("PlayerControls--control-element", "text-control");
        timeParent.style.textAlign = "left";
        timeParent.appendChild(this._htmlTime);
        const parent = document.getElementsByClassName("PlayerControls--control-element progress-control")[0];
        parent.insertBefore(timeParent, parent.firstChild);
        const _this = this;
        this._video.addEventListener("timeupdate", function () {
            _this.updateTime();
        }, false);
    }
    updateTime() {
        if (this._video !== undefined) {
            this._timeModel.setCurrentTime(this._video.currentTime);
            this._htmlTime.textContent = this._timeModel.toString();
        }
    }
}
export default TimeUiController;
