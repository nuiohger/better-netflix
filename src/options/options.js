"use strict";

const selectHighestBitrate = document.getElementById("bestQuality"),
    menuOnTop = document.getElementById("menuTop"),
    volumeMouseWheel = document.getElementById("volumeMouseWheel"),
    status = document.getElementById("status"),
    defaultKeys = {
        selectHighestBitrate: true,
        menuOnTop: true,
        volumeMouseWheel: true
    };

function init() {
    document.addEventListener("DOMContentLoaded", restoreSavedOptions, false);

    const input = document.querySelectorAll("form input[type='text']");
    for(let i = 0; i < input.length; i++) {
        input[i].addEventListener("keyup", checkInputLength, false);
    }

    document.querySelector("form").addEventListener("submit", saveOptions, false);
    document.getElementById("reset").addEventListener("click", resetOptions, false);
}

function checkInputLength() {
    if(this.value.length > 1) {
        this.value = this.value[0];
    }
}

function saveOptions(event, actionMessage = "saved") {
    chrome.storage.sync.set({
        selectHighestBitrate: selectHighestBitrate.checked,
        menuOnTop: menuOnTop.checked,
        volumeMouseWheel: volumeMouseWheel.checked
    }, () => {
        setStatus("Options " + actionMessage + ".");
    });

    if(event !== undefined) {
        event.preventDefault();
    }
}

function restoreSavedOptions() {
    chrome.storage.sync.get(defaultKeys, function(items) {
        selectHighestBitrate.checked = items.selectHighestBitrate;
        menuOnTop.checked = items.menuOnTop;
        volumeMouseWheel.checked = items.volumeMouseWheel;
    });
}

function resetOptions() {
    selectHighestBitrate.checked = defaultKeys.selectHighestBitrate;
    menuOnTop.checked = defaultKeys.menuOnTop;
    volumeMouseWheel.checked = defaultKeys.volumeMouseWheel;

    saveOptions(undefined, "reset");
}

function setStatus(message) {
    status.textContent = message;
    setTimeout(() => status.textContent = "", 2000);
}

init();
