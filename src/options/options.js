// eslint-disable-next-line @typescript-eslint/no-extra-semi
;(function () {
    "use strict"

    const volumeMouseWheel = document.getElementById("volumeMouseWheel")
    const hideButtons = {
        zoomIn: document.querySelector("#hide-zoom-in"),
        zoomOut: document.querySelector("#hide-zoom-out"),
        resetZoom: document.querySelector("#hide-reset-zoom"),
        fullZoom: document.querySelector("#hide-full-zoom"),
        pictureInPicture: document.querySelector("#hide-picture-in-picture"),
    }
    const customZoom = {
        checkbox: document.getElementById("customZoom"),
        amountInput: document.getElementById("customZoomAmount"),
    }
    const autoSkip = document.getElementById("autoSkip")

    const defaults = {
        volumeMouseWheel: true,
        hideZoomInButton: false,
        hideZoomOutButton: false,
        hideResetZoomButton: false,
        hideFullZoomButton: false,
        showCustomZoomButton: false,
        customZoomAmount: 0,
        hidePictureInPictureButton: false,
        autoSkip: false
    }

    function restoreSavedOptions() {
        chrome.storage.sync.get(defaults, setValuesOfAllPreferences)
    }

    function setValuesOfAllPreferences(items) {
        volumeMouseWheel.checked = items.volumeMouseWheel

        hideButtons.zoomIn.checked = items.hideZoomInButton
        hideButtons.zoomOut.checked = items.hideZoomOutButton
        hideButtons.resetZoom.checked = items.hideResetZoomButton
        hideButtons.fullZoom.checked = items.hideFullZoomButton
        hideButtons.pictureInPicture.checked = items.hidePictureInPictureButton

        customZoom.checkbox.checked = items.showCustomZoomButton
        customZoom.amountInput.value = items.customZoomAmount || 0

        autoSkip.checked = items.autoSkip
    }

    function init() {
        initAutoSave()

        document
            .getElementById("reset")
            .addEventListener("click", resetOptions, false)
    }

    function initAutoSave() {
        volumeMouseWheel.addEventListener(
            "change",
            (event) => save({ volumeMouseWheel: event.target.checked }),
            false
        )

        hideButtons.zoomIn.addEventListener(
            "change",
            (event) => save({ hideZoomInButton: event.target.checked }),
            false
        )
        hideButtons.zoomOut.addEventListener(
            "change",
            (event) => save({ hideZoomOutButton: event.target.checked }),
            false
        )
        hideButtons.resetZoom.addEventListener(
            "change",
            (event) => save({ hideResetZoomButton: event.target.checked }),
            false
        )
        hideButtons.fullZoom.addEventListener(
            "change",
            (event) => save({ hideFullZoomButton: event.target.checked }),
            false
        )
        hideButtons.pictureInPicture.addEventListener(
            "change",
            (event) =>
                save({ hidePictureInPictureButton: event.target.checked }),
            false
        )

        customZoom.checkbox.addEventListener(
            "change",
            (event) => save({ showCustomZoomButton: event.target.checked }),
            false
        )
        customZoom.amountInput.addEventListener(
            "change",
            (event) => {
                const value = parseInt(event.target.value)
                if (value && value > -1) {
                    save({ customZoomAmount: value })
                }
            },
            false
        )

        autoSkip.addEventListener(
            "change",
            (event) => save({ autoSkip: event.target.checked }),
            false
        )
    }

    function resetOptions() {
        setValuesOfAllPreferences(defaults)
        save(defaults)
    }

    function save(obj) {
        chrome.storage.sync.set(obj)
    }

    window.addEventListener(
        "DOMContentLoaded",
        () => {
            restoreSavedOptions()
            init()
        },
        false
    )
})()
