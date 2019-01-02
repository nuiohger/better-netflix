import VideoController from "./VideoController";

class StatisticController {
    private static _statisticParent: HTMLDivElement;
    private static _video: HTMLVideoElement;
    private static _interval: number;
    private static _checkDomInterval: number;

    private static _fps: HTMLDivElement;
    private static _resolution: HTMLDivElement;

    private static initialize(): void {
        if(this._statisticParent !== undefined) return;

        this._fps = document.createElement("div");
        this._resolution = document.createElement("div");

        this._statisticParent = document.createElement("div");
        this._statisticParent.classList.add("statistics", "hidden");
        this._statisticParent.appendChild(this._fps);
        this._statisticParent.appendChild(this._resolution);

        this._video.parentElement.appendChild(this._statisticParent);
    }

    public static toggle(videoController: VideoController): void {
        if(videoController !== undefined && videoController !== null) {
            if(videoController.getHtmlVideo !== undefined && videoController.getHtmlVideo !== null)
                this._video = videoController.getHtmlVideo;
        }

        this.toggleUi();

        if(this._statisticParent.classList.contains("hidden"))
            this.disable();
        else
            this.enable();
    }

    private static toggleUi(): void {
        this.initialize();

        this._statisticParent.classList.toggle("hidden");
    }

    private static enable(): void {
        const updateVideoStats = (function(_this) {
            let currentFrames: number;
            let prevFrames: number = _this._video.getVideoPlaybackQuality().totalVideoFrames;

            return function() {
                const props = _this._video.getVideoPlaybackQuality();

                currentFrames = props.totalVideoFrames;

                _this._fps.textContent = "FPS: " + (currentFrames - prevFrames) + " (Dropped: " + props.droppedVideoFrames + ")";
                prevFrames = currentFrames;

                _this._resolution.textContent = "Resolution: " + _this._video.videoWidth + "x" + _this._video.videoHeight;
            };
        })(this);

        this._interval = setInterval(function() {
            updateVideoStats();
        }, 1000);

        const _this = this;
        this._checkDomInterval = setInterval(function() {
            _this.stopIfElementIsNotInDom();
        }, 5000);
    }

    private static stopIfElementIsNotInDom(): void {
        if(!document.querySelector(".statistics")) {
            this.disable();
            this._statisticParent = undefined;
        }
    }

    private static disable(): void {
        clearInterval(this._interval);
        clearInterval(this._checkDomInterval);
    }
}

export default StatisticController;
