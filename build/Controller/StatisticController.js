class StatisticController {
    static initialize() {
        if (this._statisticParent !== undefined)
            return;
        this._fps = document.createElement("div");
        this._resolution = document.createElement("div");
        this._statisticParent = document.createElement("div");
        this._statisticParent.classList.add("statistics", "hidden");
        this._statisticParent.appendChild(this._fps);
        this._statisticParent.appendChild(this._resolution);
        this._video.parentElement.appendChild(this._statisticParent);
    }
    static toggle(videoController) {
        if (videoController !== undefined && videoController !== null) {
            if (videoController.getHtmlVideo !== undefined && videoController.getHtmlVideo !== null)
                this._video = videoController.getHtmlVideo;
        }
        this.toggleUi();
        if (this._statisticParent.classList.contains("hidden"))
            this.disable();
        else
            this.enable();
    }
    static toggleUi() {
        this.initialize();
        this._statisticParent.classList.toggle("hidden");
    }
    static enable() {
        const updateVideoStats = (function (_this) {
            let currentFrames;
            let prevFrames = _this._video.getVideoPlaybackQuality().totalVideoFrames;
            return function () {
                const props = _this._video.getVideoPlaybackQuality();
                currentFrames = props.totalVideoFrames;
                _this._fps.textContent = "FPS: " + (currentFrames - prevFrames) + " (Dropped: " + props.droppedVideoFrames + ")";
                prevFrames = currentFrames;
                _this._resolution.textContent = "Resolution: " + _this._video.videoWidth + "x" + _this._video.videoHeight;
            };
        })(this);
        this._interval = setInterval(function () {
            updateVideoStats();
        }, 1000);
    }
    static disable() {
        clearInterval(this._interval);
    }
}
export default StatisticController;
