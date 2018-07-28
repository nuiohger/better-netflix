class StatisticController {
    static initialize() {
        if (this._statisticParent !== undefined)
            return;
        this._fps = document.createElement("div");
        this._resolution = document.createElement("div");
        this._statisticParent = document.createElement("div");
        this._statisticParent.classList.add("statistics");
        console.log("class added");
        this._statisticParent.appendChild(this._fps);
        this._statisticParent.appendChild(this._resolution);
        this._video.parentElement.appendChild(this._statisticParent);
    }
    static toggle(video) {
        if (video !== undefined && video !== null)
            this._video = video;
        this.toggleUi();
        if (this._statisticParent.classList.contains("hidden"))
            this.enable();
        else
            this.disable();
    }
    static toggleUi() {
        this.initialize();
        this._statisticParent.classList.toggle("hidden");
    }
    static enable() {
        const _this = this;
        this._video.addEventListener("timeupdate", function () { _this.updateVideoStats(); }, false);
    }
    static disable() {
        const _this = this;
        this._video.removeEventListener("timeupdate", function () { _this.updateVideoStats(); });
    }
    static updateVideoStats() {
        const playbackQuality = this._video.getVideoPlaybackQuality();
        this._fps.textContent = "FPS: " + (playbackQuality.totalVideoFrames - playbackQuality.droppedVideoFrames) / this._video.currentTime + " (Dropped: " + playbackQuality.droppedVideoFrames + ")";
        this._resolution.textContent = "Resolution: " + this._video.videoWidth + "x" + this._video.videoHeight;
    }
}
export default StatisticController;
