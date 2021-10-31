import UserOptionsModel from "../Model/UserOptionsModel"

const defaultKeys = {
    zoomIn: "+",
    zoomOut: "-",
    resetZoom: ",",
    fullZoom: ".",
    disableMouse: "d",
    enableMouse: "e",
    timeElapsed: true,
    toggleStatistics: "q",
    customZoom: "c",
    toggleSubtitles: "v",
    volumeMouseWheel: true,
    hideZoomInButton: false,
    hideZoomOutButton: false,
    hideResetZoomButton: false,
    hideFullZoomButton: false,
    showCustomZoomButton: false,
    customZoomAmount: 0,
}

const options: UserOptionsModel = UserOptionsModel.optionKeys

export { defaultKeys, options }
