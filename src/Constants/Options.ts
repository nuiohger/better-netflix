import UserOptionsModel from '../Model/UserOptionsModel'

const defaultKeys = {
  zoomIn: '+',
  zoomOut: '-',
  resetZoom: ',',
  fullZoom: '.',
  disableMouse: 'd',
  enableMouse: 'e',
  timeElapsed: true,
  toggleStatistics: 'q',
  volumeMouseWheel: true,
  hideZoomInButton: false,
  hideZoomOutButton: false,
  hideResetZoomButton: false,
  hideFullZoomButton: false
}

const options: UserOptionsModel = UserOptionsModel.optionKeys

export { defaultKeys, options }
