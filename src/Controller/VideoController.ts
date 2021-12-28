import addVolumeScrollListener from "./ScrollController"

class VideoController {
    private _htmlVideo: HTMLVideoElement
    private _updatingVideo = false

    private _currentZoom = 100
    private _minHeight = 100
    private _width = 100

    public start(): void {
        if (!this._updatingVideo && this.findVideo()) {
            this._updatingVideo = true
            this.updateVideo()
        }
    }

    private findVideo(): boolean {
        if (location.toString().indexOf("/watch") > 0) {
            const currentVideo = document.querySelector("video")
            if (
                currentVideo !== null &&
                (!this._htmlVideo || this._htmlVideo.src !== currentVideo.src)
            ) {
                this._htmlVideo = currentVideo
                return true
            }
        }
        return false
    }

    private updateVideo(): void {
        this._updatingVideo = false

        addVolumeScrollListener(this._htmlVideo)

        // Set min-height percentage to height of video set by Netflix
        this._minHeight =
            (this._htmlVideo.offsetHeight /
                this._htmlVideo.parentElement.offsetHeight) *
            100
        if (this._minHeight > this._currentZoom) {
            this.setZoom(this._minHeight)
        } else {
            this.restoreZoomOfPreviousVideo()
        }
    }

    private restoreZoomOfPreviousVideo() {
        if (this._currentZoom !== 100) {
            this.setZoom(this._currentZoom, this._width)
        }
    }

    public addZoom(percentage: number): void {
        let height = parseInt(this._htmlVideo.style.minHeight)

        if (isNaN(height)) {
            height = this._minHeight
        }

        this._width += percentage
        if (this._width < 100) {
            this._width = 100
        }

        this.setZoom(percentage + height, this._width)
    }

    public setZoom(percentage: number, width = 100): void {
        if (percentage < this._minHeight) {
            percentage = this._minHeight
        }

        this._htmlVideo.style.minWidth = width + "%"
        this._htmlVideo.style.minHeight = percentage + "%"

        this._width = width
        this._currentZoom = percentage
    }

    public get getHtmlVideo(): HTMLVideoElement {
        return this._htmlVideo
    }

    public get currentZoom(): number {
        return this._currentZoom
    }
}

export default VideoController
