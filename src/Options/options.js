"use strict";

const //zoomIn = document.getElementById("zoomIn"),
    // zoomOut = document.getElementById("zoomOut"),
    // resetZoom = document.getElementById("resetZoom"),
    // fullZoom = document.getElementById("fullZoom"),
    // disableMouse = document.getElementById("disableMouse"),
    // enableMouse = document.getElementById("enableMouse"),
    // timeElapsed = document.getElementById("timeElapsed"),
    // statistics = document.getElementById("statistics"),
    selectHighestBitrate = document.getElementById("bestQuality"),
    status = document.getElementById("status"),
    defaultKeys = {
        // zoomIn: "+",
        // zoomOut: "-",
        // resetZoom: ",",
        // fullZoom: ".",
        // disableMouse: "d",
        // enableMouse: "e",
        // timeElapsed: true,
        // statistics: "q",
        selectHighestBitrate: true
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
        // zoomIn: zoomIn.value,
        // zoomOut: zoomOut.value,
        // resetZoom: resetZoom.value,
        // fullZoom: fullZoom.value,
        // disableMouse: disableMouse.value,
        // enableMouse: enableMouse.value,
        // timeElapsed: timeElapsed.checked,
        // statistics: statistics.value,
        selectHighestBitrate: selectHighestBitrate.checked
    }, () => {
        setStatus("Options " + actionMessage + ".");
    });

    if(event !== undefined) {
        event.preventDefault();
    }
}

function restoreSavedOptions() {
    chrome.storage.sync.get(defaultKeys, function(items) {
        // zoomIn.value = items.zoomIn;
        // zoomOut.value = items.zoomOut;
        // resetZoom.vlaue = items.resetZoom;
        // fullZoom.value = items.fullZoom;
        // disableMouse.value = items.disableMouse;
        // enableMouse.value = items.enableMouse;
        // timeElapsed.checked = items.timeElapsed;
        // statistics.value = items.statistics;
        selectHighestBitrate.checked = items.selectHighestBitrate;
    });
}

function resetOptions() {
    if(!confirm("Are you sure you want to reset the settings? This can not be undone.")) return;

    // zoomIn.value = defaultKeys.zoomIn;
    // zoomOut.value = defaultKeys.zoomOut;
    // resetZoom.vlaue = defaultKeys.resetZoom;
    // fullZoom.value = defaultKeys.fullZoom;
    // disableMouse.value = defaultKeys.disableMouse;
    // enableMouse.value = defaultKeys.enableMouse;
    // timeElapsed.checked = defaultKeys.timeElapsed;
    // statistics.value = defaultKeys.statistics;
    selectHighestBitrate.checked = defaultKeys.selectHighestBitrate;

    saveOptions(undefined, "reset");
}

function setStatus(message) {
    status.textContent = message;
    setTimeout(() => status.textContent = "", 2000);
}

init();
