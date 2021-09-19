import ChromeController from '../Controller/ChromeController'
import { defaultKeys } from '../Constants/Options'

class UserOptionsModel {
  // Keys:
  private _zoomIn: string
  private _zoomOut: string
  private _resetZoom: string
  private _fullZoom: string
  private _disableMouse: string
  private _enableMouse: string
  private _toggleStatistics: string
  private _customZoomKey: string

  // Enabled / disabled options:
  private _timeElapsed: boolean
  private _volumeMouseWheel: boolean
  private _hideZoomInButton: boolean
  private _hideZoomOutButton: boolean
  private _hideResetZoomButton: boolean
  private _hideFullZoomButton: boolean
  private _showCustomZoomButton: boolean
  private _customZoomAmount: number

  private _chromeController: ChromeController

  private constructor (
    zoomIn: string,
    zoomOut: string,
    resetZoom: string,
    fullZoom: string,
    disableMouse: string,
    enableMouse: string,
    timeElapsed: boolean,
    toggleStatistics: string,
    customZoomKey: string
  ) {
    if (!this._chromeController) this._chromeController = new ChromeController()

    this._chromeController.getSync(defaultKeys, (items) => {
      this._volumeMouseWheel = items.volumeMouseWheel

      this._hideZoomInButton = items.hideZoomInButton
      this._hideZoomOutButton = items.hideZoomOutButton
      this._hideResetZoomButton = items.hideResetZoomButton
      this._hideFullZoomButton = items.hideFullZoomButton

      this._showCustomZoomButton = items.showCustomZoomButton
      this._customZoomAmount = items.customZoomAmount || 0
    })

    this._zoomIn = zoomIn
    this._zoomOut = zoomOut
    this._resetZoom = resetZoom
    this._fullZoom = fullZoom
    this._disableMouse = disableMouse
    this._enableMouse = enableMouse
    this._timeElapsed = timeElapsed
    this._toggleStatistics = toggleStatistics
    this._customZoomKey = customZoomKey
  }

  public get zoomIn (): string {
    return this._zoomIn
  }

  public get zoomOut (): string {
    return this._zoomOut
  }

  public get resetZoom (): string {
    return this._resetZoom
  }

  public get fullZoom (): string {
    return this._fullZoom
  }

  public get disableMouse (): string {
    return this._disableMouse
  }

  public get enableMouse (): string {
    return this._enableMouse
  }

  public get timeElapsed (): boolean {
    return this._timeElapsed
  }

  public get toggleStatistics (): string {
    return this._toggleStatistics
  }

  public get customZoom (): string {
    return this._customZoomKey
  }

  public get volumeMouseWheel (): boolean {
    return this._volumeMouseWheel
  }

  public get hideZoomInButton (): boolean {
    return this._hideZoomInButton
  }

  public get hideZoomOutButton (): boolean {
    return this._hideZoomOutButton
  }

  public get hideResetZoomButton (): boolean {
    return this._hideResetZoomButton
  }

  public get hideFullZoomButton (): boolean {
    return this._hideFullZoomButton
  }

  public get showCustomZoomButton (): boolean {
    return this._showCustomZoomButton
  }

  public get customZoomAmount (): number {
    return this._customZoomAmount
  }

  public static get optionKeys (): UserOptionsModel {
    return new UserOptionsModel('+', '-', ',', '.', 'd', 'e', true, 'q', 'c')
  }
}

export default UserOptionsModel
