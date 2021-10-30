import addVolumeScrollListener from './ScrollController'

class VideoController {
  private _htmlVideo: HTMLVideoElement;
  private _updatingVideo = false;

  private _currentZoom = 100;
  private _minZoom = 100;

  public start (): void {
    if (!this._updatingVideo && this.findVideo()) {
      this._updatingVideo = true
      this.updateVideo()
    }
  }

  private findVideo (): boolean {
    if (location.toString().indexOf('/watch') > 0) {
      const currentVideo = document.querySelector('video')
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

  private updateVideo (): void {
    this._updatingVideo = false

    addVolumeScrollListener(this._htmlVideo)

    this.restoreZoomOfPreviousVideo()

    // Set min-height percentage to height of video set by Netflix
    const percentage =
      (this._htmlVideo.offsetHeight /
        this._htmlVideo.parentElement.offsetHeight) *
      100
    if (percentage > this._currentZoom) {
      this._minZoom = percentage
      this.setZoom(percentage)
    }
  }

  private restoreZoomOfPreviousVideo () {
    if (this._currentZoom !== 100) {
      this.setZoom(this._currentZoom)
    }
  }

  public addZoom (percentage: number): void {
    let height = parseInt(this._htmlVideo.style.minHeight)

    if (isNaN(height)) {
      height = this._minZoom
    }

    this.setZoom(percentage + height)
  }

  public setZoom (percentage: number): void {
    if (percentage < this._minZoom) {
      percentage = this._minZoom
    }

    this._htmlVideo.style.minHeight = this._htmlVideo.style.minWidth =
      percentage + '%'

    this._currentZoom = percentage
  }

  public get getHtmlVideo (): HTMLVideoElement {
    return this._htmlVideo
  }

  public get currentZoom (): number {
    return this._currentZoom
  }
}

export default VideoController
