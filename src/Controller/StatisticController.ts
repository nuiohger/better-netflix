import VideoController from "./VideoController";

class StatisticController {
    private static _statisticParent: HTMLDivElement;
    private static _video: HTMLVideoElement;
    private static _interval: number;

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
        this._resolution.textContent = "Resolution: " + this._video.videoWidth + "x" + this._video.videoHeight;

        const updateVideoStats = (function(_this) {
            let currentFrames: number;
    
            //FPS
            let prevFrames: number = _this._video.getVideoPlaybackQuality().totalVideoFrames;
    
            return function() {
                const props = _this._video.getVideoPlaybackQuality();
    
                currentFrames = props.totalVideoFrames;
    
                //FPS
                _this._fps.textContent = "FPS: " + (currentFrames - prevFrames) + " (Dropped: " + props.droppedVideoFrames + ")";
                prevFrames = currentFrames;
            };
        })(this);

        this._interval = setInterval(function() {
            updateVideoStats();
        }, 1000);
    }

    private static disable(): void {
        clearInterval(this._interval);
    }
}

export default StatisticController;
