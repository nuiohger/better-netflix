class VideoController {
    constructor(uiController, timeUiController) {
        this._updatingVideo = false;
        this._paused = false;
        this._uiController = uiController;
        this._timeUiController = timeUiController;
    }
    start() {
        if (!this._updatingVideo && (this._htmlVideo === undefined || this._htmlVideo.src === "") && location.href !== "https://www.netflix.com/browse") {
            this._updatingVideo = true;
            const _this = this;
            this._updateVideoInterval = setInterval(() => {
                _this.updateVideo();
            }, 500);
        }
    }
    updateVideo() {
        if (this.findVideo()) {
            clearInterval(this._updateVideoInterval);
            this._updatingVideo = false;
            this._timeUiController.setTimeInterval(this._htmlVideo);
            this._uiController.createUi(this);
        }
    }
    findVideo() {
        this._htmlVideo = document.getElementsByClassName("VideoContainer")[0];
        if (this._htmlVideo !== undefined) {
            this._htmlVideo = this._htmlVideo.getElementsByTagName("video")[0];
            if (this._htmlVideo !== undefined) {
                this.initVideo();
                return true;
            }
        }
        return false;
    }
    initVideo() {
        this._htmlVideo.style.position = "relative";
        this._htmlVideo.style.left = "50%";
        this._htmlVideo.style.top = "50%";
        this._htmlVideo.style.transform = "translate(-50%, -50%)";
        this._paused = false;
    }
    addZoom(percentage) {
        let height = parseInt(this._htmlVideo.style.height);
        if (isNaN(height)) {
            height = 100;
        }
        this.setZoom(percentage + height);
    }
    setZoom(percentage) {
        if (percentage < 100) {
            percentage = 100;
        }
        this._htmlVideo.style.height = this._htmlVideo.style.width = percentage + "%";
    }
    togglePlay() {
        if (this._paused) {
            this._htmlVideo.play();
        }
        else {
            this._htmlVideo.pause();
        }
        this._paused = !this._paused;
    }
    get getHtmlVideo() {
        return this._htmlVideo;
    }
}
export default VideoController;
