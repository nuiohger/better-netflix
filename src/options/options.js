(function() {
    "use strict";

    const selectHighestBitrate = document.getElementById("bestQuality"),
        menuOnTop = document.getElementById("menuTop"),
        volumeMouseWheel = document.getElementById("volumeMouseWheel"),
        hideButtons = {
            zoomIn: document.querySelector("#hide-zoom-in"),
            zoomOut: document.querySelector("#hide-zoom-out"),
            resetZoom: document.querySelector("#hide-reset-zoom"),
            fullZoom: document.querySelector("#hide-full-zoom"),
            videoBitrates: document.querySelector("#hide-video-bitrates")
        },
        defaults = {
            selectHighestBitrate: true,
            menuOnTop: true,
            volumeMouseWheel: true,
            hideZoomInButton: false,
            hideZoomOutButton: false,
            hideResetZoomButton: false,
            hideFullZoomButton: false,
            hideVideoBitratesButton: false
        };

    function restoreSavedOptions() {
        chrome.storage.sync.get(defaults, setValuesOfAllPreferences);
    }

    function setValuesOfAllPreferences(items) {
        selectHighestBitrate.checked = items.selectHighestBitrate;
        menuOnTop.checked = items.menuOnTop;
        volumeMouseWheel.checked = items.volumeMouseWheel;

        hideButtons.zoomIn.checked = items.hideZoomInButton;
        hideButtons.zoomOut.checked = items.hideZoomOutButton;
        hideButtons.resetZoom.checked = items.hideResetZoomButton;
        hideButtons.fullZoom.checked = items.hideFullZoomButton;
        hideButtons.videoBitrates.checked = items.hideVideoBitratesButton;
    }

    function init() {
        initAutoSave();

        document.getElementById("reset").addEventListener("click", resetOptions, false);
        document.getElementById("modify-ui").addEventListener("click", showUiModificationPopup, false);
    }

    function initAutoSave() {
        selectHighestBitrate.addEventListener("change", event => save({selectHighestBitrate: event.target.checked}), false);
        menuOnTop.addEventListener("change", event => save({menuOnTop: event.target.checked}), false);
        volumeMouseWheel.addEventListener("change", event => save({volumeMouseWheel: event.target.checked}), false);

        hideButtons.zoomIn.addEventListener("change", event => save({hideZoomInButton: event.target.checked}), false);
        hideButtons.zoomOut.addEventListener("change", event => save({hideZoomOutButton: event.target.checked}), false);
        hideButtons.resetZoom.addEventListener("change", event => save({hideResetZoomButton: event.target.checked}), false);
        hideButtons.fullZoom.addEventListener("change", event => save({hideFullZoomButton: event.target.checked}), false);
        hideButtons.videoBitrates.addEventListener("change", event => save({hideVideoBitratesButton: event.target.checked}), false);
    }

    function resetOptions() {
        setValuesOfAllPreferences(defaults);
        save(defaults);
    }

    function save(obj) {
        chrome.storage.sync.set(obj);
    }

    let uiModificationPopupAdded = false;
    function showUiModificationPopup() {
        const popup = document.querySelector("#ui-modification");
        showPopup(popup, uiModificationPopupAdded);
        uiModificationPopupAdded = true;
    }

    function showPopup(popup, eventListenerAdded = false) {
        document.querySelector("#options").classList.add("blurred");
        popup.parentElement.classList.remove("hidden");

        if(!eventListenerAdded) {
            popup.querySelector(".close").addEventListener("click", () => {
                closePopup(popup.parentElement);
            }, false);

            addEventListener("click", event => {
                if(event.target.classList.contains("popup-container")) {
                    closePopup(event.target);
                }
            }, false);
        }
    }

    function closePopup(popup) {
        document.querySelector("#options").classList.remove("blurred");
        popup.classList.add("hidden");
    }

    window.addEventListener("DOMContentLoaded", () => {
        restoreSavedOptions();
        init();
    }, false);
})();
