class StatisticController {
    private static _statisticParent: HTMLDivElement;
    private static _fps: HTMLDivElement;
    private static _resolution: HTMLDivElement;
    private static _video: HTMLVideoElement;

    private static initialize(): void {
        if(this._statisticParent !== undefined) return;

        this._fps = document.createElement("div");
        this._resolution = document.createElement("div");

        this._statisticParent = document.createElement("div");
        this._statisticParent.classList.add("statistics");console.log("class added");
        this._statisticParent.appendChild(this._fps);
        this._statisticParent.appendChild(this._resolution);

        this._video.parentElement.appendChild(this._statisticParent);
    }

    public static toggle(video: HTMLVideoElement): void {
        if(video !== undefined && video !== null)
            this._video = video;

        this.toggleUi();

        if(this._statisticParent.classList.contains("hidden"))
            this.enable();
        else
            this.disable();
    }

    private static toggleUi(): void {
        this.initialize();

        this._statisticParent.classList.toggle("hidden");
    }

    private static enable(): void {
        const _this = this;
        this._video.addEventListener("timeupdate", function() {_this.updateVideoStats();}, false);
    }

    private static disable(): void {
        const _this = this;
        this._video.removeEventListener("timeupdate", function() {_this.updateVideoStats();});
    }

    private static updateVideoStats(): void {
        const playbackQuality: VideoPlaybackQuality = this._video.getVideoPlaybackQuality();
        
        this._fps.textContent = "FPS: " + (playbackQuality.totalVideoFrames - playbackQuality.droppedVideoFrames) / this._video.currentTime + " (Dropped: " + playbackQuality.droppedVideoFrames + ")";
        this._resolution.textContent = "Resolution: " + this._video.videoWidth + "x" + this._video.videoHeight;
    }
}

export default StatisticController;
