import UiController from "./UiController";
import TimeUiController from "./TimeUiController";
import addVolumeScrollListener from "./ScrollController";

class VideoController {
    private readonly _uiController: UiController;
    private readonly _timeUiController: TimeUiController;

    private _htmlVideo: HTMLVideoElement;
    private _updatingVideo: boolean = false;
    private _updateVideoInterval: number;

    constructor(uiController: UiController, timeUiController: TimeUiController) {
        this._uiController = uiController;
        this._timeUiController = timeUiController;
    }

    public start(): void {
        if(!this._updatingVideo && (this._htmlVideo === undefined || this._htmlVideo.src === "") && location.href !== "https://www.netflix.com/browse") {
            this._updatingVideo = true;

            const _this: VideoController = this;
            this._updateVideoInterval = setInterval(() => {
                _this.updateVideo();
            }, 500);
        }
    }

    private updateVideo(): void {
        if(this.findVideo()) {
            clearInterval(this._updateVideoInterval);
            this._updatingVideo = false;

            this._timeUiController.setTimeInterval(this._htmlVideo);

            this._uiController.createUi(this);

            addVolumeScrollListener();
        }
    }

    private findVideo(): boolean {
        this._htmlVideo = <HTMLVideoElement>document.getElementsByClassName("VideoContainer")[0];
        if(this._htmlVideo !== undefined && location.toString().indexOf("/watch") > 0) {
            this._htmlVideo = this._htmlVideo.getElementsByTagName("video")[0];
            if(this._htmlVideo !== undefined) {
                this.initVideo();
                return true;
            }
        }
        return false;
    }

    private initVideo(): void {
        this._htmlVideo.style.position = "relative";
        this._htmlVideo.style.left = "50%";
        this._htmlVideo.style.top = "50%";
        this._htmlVideo.style.transform = "translate(-50%, -50%)";
    }


    public addZoom(percentage): void {
        let height = parseInt(this._htmlVideo.style.height);

        if(isNaN(height)) {
            height = 100;
        }

        this.setZoom(percentage + height);
    }

    public setZoom(percentage): void {
        if(percentage < 100) {
            percentage = 100;
        }

        this._htmlVideo.style.height = this._htmlVideo.style.width = percentage + "%";
    }

    public get getHtmlVideo(): HTMLVideoElement {
        return this._htmlVideo;
    }
}

export default VideoController;
