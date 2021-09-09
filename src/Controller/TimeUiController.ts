import TimeModel from "../Model/TimeModel";
import { options } from "../Constants/Options";

class TimeUiController {
  private readonly _timeModel: TimeModel;

  private _htmlTime: HTMLElement;
  private _video: HTMLVideoElement;

  constructor() {
    this._timeModel = new TimeModel();
  }
  public initTime(video: HTMLVideoElement): void {
    if (
      !options.timeElapsed ||
      document.querySelector("time.elapsedTime") ||
      !video
    )
      return;

    const parent = document.querySelector(
      ".ltr-19p9i5y > .ltr-1bt0omd > .ltr-1i33xgl"
    );

    if (parent) {
      this._video = video;
      this.initElapsedTime(parent);
    }
  }

  private initElapsedTime(parent: Element): void {
    this._htmlTime = document.createElement("time");
    this._htmlTime.classList.add("elapsedTime", "ltr-pw0kjc");
    this._htmlTime.textContent = "0:00";

    const timeParent: HTMLDivElement = document.createElement("div");
    timeParent.classList.add("ltr-6alejv");
    timeParent.style.textAlign = "left";
    timeParent.appendChild(this._htmlTime);

    parent.insertBefore(timeParent, parent.firstChild);

    const _this: TimeUiController = this;
    this._video.addEventListener(
      "timeupdate",
      () => {
        _this.updateTime();
      },
      false
    );
  }

  private updateTime(): void {
    if (this._video !== undefined) {
      this._timeModel.setCurrentTime(this._video.currentTime);
      this._htmlTime.textContent = this._timeModel.toString();
    }
  }
}

export default TimeUiController;
