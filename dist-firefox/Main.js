/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Controller_VideoController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _Controller_ActionController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _Model_UserOptionsModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _Controller_UiController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _Controller_TimeUiController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(12);
/* harmony import */ var _Controller_MyListController__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(14);







class Main {
    constructor() {
        this._defaultKeys = _Model_UserOptionsModel__WEBPACK_IMPORTED_MODULE_2__["default"].optionKeys;
        const uiController = new _Controller_UiController__WEBPACK_IMPORTED_MODULE_3__["default"]();
        const timeUiController = new _Controller_TimeUiController__WEBPACK_IMPORTED_MODULE_4__["default"]();
        this._videoController = new _Controller_VideoController__WEBPACK_IMPORTED_MODULE_0__["default"](uiController, timeUiController);
        this.initialize();
    }
    initialize() {
        this._videoController.start();
        _Controller_MyListController__WEBPACK_IMPORTED_MODULE_5__["default"].randomVideo();
        this.observe();
        document.addEventListener("keydown", event => {
            const actionName = _Controller_ActionController__WEBPACK_IMPORTED_MODULE_1__["ActionFactory"].actionNames.filter(actionName => this._defaultKeys[actionName] === event.key)[0];
            try {
                const action = _Controller_ActionController__WEBPACK_IMPORTED_MODULE_1__["ActionFactory"].getAction(actionName);
                action.execute(this._videoController);
            }
            catch (e) { }
        }, false);
    }
    observe() {
        let oldHref = location.href;
        const body = document.querySelector("body");
        const observer = new MutationObserver(() => {
            if (oldHref !== location.href) {
                oldHref = location.href;
                this._videoController.start();
                _Controller_MyListController__WEBPACK_IMPORTED_MODULE_5__["default"].randomVideo();
            }
        });
        observer.observe(body, { childList: true, subtree: true });
    }
}
new Main();


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ScrollController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

class VideoController {
    constructor(uiController, timeUiController) {
        this._updatingVideo = false;
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
            Object(_ScrollController__WEBPACK_IMPORTED_MODULE_0__["default"])();
        }
    }
    findVideo() {
        this._htmlVideo = document.getElementsByClassName("VideoContainer")[0];
        if (this._htmlVideo !== undefined && location.toString().indexOf("/watch") > 0) {
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
    get getHtmlVideo() {
        return this._htmlVideo;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (VideoController);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Model_UserOptionsModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);

function createScrollEvent(func) {
    document.querySelector(".center-controls").addEventListener("wheel", func, false);
}
function scrollUpDownEvent(upFunc, downFunc) {
    createScrollEvent((event) => {
        if (event.deltaY > 0)
            downFunc();
        else
            upFunc();
    });
}
function initListener() {
    function fireKeyboardEvent(keyCode) {
        const event = new KeyboardEvent("keydown", { bubbles: true, cancelable: true, keyCode: keyCode });
        document.querySelector(".center-controls").dispatchEvent(event);
    }
    const upFunc = () => fireKeyboardEvent(38);
    const downFunc = () => fireKeyboardEvent(40);
    scrollUpDownEvent(upFunc, downFunc);
}
function addVolumeScrollListener() {
    _Model_UserOptionsModel__WEBPACK_IMPORTED_MODULE_0__["default"].callWithOptions(options => {
        if (!options.volumeMouseWheel)
            return;
        initListener();
    });
}
/* harmony default export */ __webpack_exports__["default"] = (addVolumeScrollListener);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Controller_ChromeController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _Constants_Options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);


class UserOptionsModel {
    constructor(zoomIn = "", zoomOut = "", resetZoom = "", fullZoom = "", disableMouse = "", enableMouse = "", timeElapsed = true, toggleStatistics = "") {
        if (!this._chromeController)
            this._chromeController = new _Controller_ChromeController__WEBPACK_IMPORTED_MODULE_0__["default"]();
        const _this = this;
        this._chromeController.getSync(_Constants_Options__WEBPACK_IMPORTED_MODULE_1__["default"], items => {
            _this._selectHighestBitrate = items.selectHighestBitrate;
            _this._menuOnTop = items.menuOnTop;
            _this._volumeMouseWheel = items.volumeMouseWheel;
        });
        this._zoomIn = zoomIn;
        this._zoomOut = zoomOut;
        this._resetZoom = resetZoom;
        this._fullZoom = fullZoom;
        this._disableMouse = disableMouse;
        this._enableMouse = enableMouse;
        this._timeElapsed = timeElapsed;
        this._toggleStatistics = toggleStatistics;
    }
    get zoomIn() {
        return this._zoomIn;
    }
    get zoomOut() {
        return this._zoomOut;
    }
    get resetZoom() {
        return this._resetZoom;
    }
    get fullZoom() {
        return this._fullZoom;
    }
    get disableMouse() {
        return this._disableMouse;
    }
    get enableMouse() {
        return this._enableMouse;
    }
    get timeElapsed() {
        return this._timeElapsed;
    }
    get toggleStatistics() {
        return this._toggleStatistics;
    }
    get selectHighestBitrate() {
        return this._selectHighestBitrate;
    }
    get menuOnTop() {
        return this._menuOnTop;
    }
    get volumeMouseWheel() {
        return this._volumeMouseWheel;
    }
    static get optionKeys() {
        return new UserOptionsModel("+", "-", ",", ".", "d", "e", true, "q");
    }
    static getPromise() {
        return new _Controller_ChromeController__WEBPACK_IMPORTED_MODULE_0__["default"]().getSyncPromise(_Constants_Options__WEBPACK_IMPORTED_MODULE_1__["default"]);
    }
    static callWithOptions(func) {
        return this.getPromise().then(func);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (UserOptionsModel);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class ChromeController {
    getSync(obj, func) {
        chrome.storage.sync.get(obj, func);
    }
    getSyncPromise(obj) {
        return new Promise(resolve => chrome.storage.sync.get(obj, resolve));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (ChromeController);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const defaultKeys = {
    zoomIn: "+",
    zoomOut: "-",
    resetZoom: ",",
    fullZoom: ".",
    disableMouse: "d",
    enableMouse: "e",
    timeElapsed: true,
    toggleStatistics: "q",
    selectHighestBitrate: true,
    menuOnTop: true,
    volumeMouseWheel: true
};
/* harmony default export */ __webpack_exports__["default"] = (defaultKeys);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionFactory", function() { return ActionFactory; });
/* harmony import */ var _Model_UserOptionsModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _StatisticController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);


const defaultKeys = _Model_UserOptionsModel__WEBPACK_IMPORTED_MODULE_0__["default"].optionKeys;
class ZoomInAction {
    constructor() {
        this.key = defaultKeys.zoomIn;
    }
    execute(videoController) {
        videoController.addZoom(5);
    }
}
class ZoomOutAction {
    constructor() {
        this.key = defaultKeys.zoomOut;
    }
    execute(videoController) {
        videoController.addZoom(-5);
    }
}
class ResetZoomAction {
    constructor() {
        this.key = defaultKeys.resetZoom;
    }
    execute(videoController) {
        videoController.setZoom(100);
    }
}
class FullZoomAction {
    constructor() {
        this.key = defaultKeys.fullZoom;
    }
    execute(videoController) {
        videoController.setZoom(135);
    }
}
class DisableMouseAction {
    constructor() {
        this.key = defaultKeys.disableMouse;
    }
    execute(videoController) {
        const video = videoController.getHtmlVideo;
        video.requestPointerLock();
    }
}
class EnableMouseAction {
    constructor() {
        this.key = defaultKeys.enableMouse;
    }
    execute() {
        const doc = document;
        doc.exitPointerLock();
    }
}
class ToggleStatisticsAction {
    constructor() {
        this.key = defaultKeys.toggleStatistics;
    }
    execute(videoController) {
        _StatisticController__WEBPACK_IMPORTED_MODULE_1__["default"].toggle(videoController);
    }
}
class ActionFactory {
    static getAction(actionName) {
        const action = this._classDictionary[actionName];
        if (action === undefined)
            throw "Action " + actionName + " was not found.";
        return new action;
    }
    static get actionNames() {
        return Object.keys(this._classDictionary);
    }
}
ActionFactory._classDictionary = {
    zoomIn: ZoomInAction,
    zoomOut: ZoomOutAction,
    resetZoom: ResetZoomAction,
    fullZoom: FullZoomAction,
    disableMouse: DisableMouseAction,
    enableMouse: EnableMouseAction,
    toggleStatistics: ToggleStatisticsAction
};



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class StatisticController {
    static initialize() {
        if (this._statisticParent !== undefined)
            return;
        this._fps = document.createElement("div");
        this._resolution = document.createElement("div");
        this._statisticParent = document.createElement("div");
        this._statisticParent.classList.add("statistics", "hidden");
        this._statisticParent.appendChild(this._fps);
        this._statisticParent.appendChild(this._resolution);
        this._video.parentElement.appendChild(this._statisticParent);
    }
    static toggle(videoController) {
        if (videoController !== undefined && videoController !== null) {
            if (videoController.getHtmlVideo !== undefined && videoController.getHtmlVideo !== null)
                this._video = videoController.getHtmlVideo;
        }
        this.toggleUi();
        if (this._statisticParent.classList.contains("hidden"))
            this.disable();
        else
            this.enable();
    }
    static toggleUi() {
        this.initialize();
        this._statisticParent.classList.toggle("hidden");
    }
    static enable() {
        const updateVideoStats = (function (_this) {
            let currentFrames;
            let prevFrames = _this._video.getVideoPlaybackQuality().totalVideoFrames;
            return function () {
                const props = _this._video.getVideoPlaybackQuality();
                currentFrames = props.totalVideoFrames;
                _this._fps.textContent = "FPS: " + (currentFrames - prevFrames) + " (Dropped: " + props.droppedVideoFrames + ")";
                prevFrames = currentFrames;
                _this._resolution.textContent = "Resolution: " + _this._video.videoWidth + "x" + _this._video.videoHeight;
            };
        })(this);
        this._interval = setInterval(function () {
            updateVideoStats();
        }, 1000);
        const _this = this;
        this._checkDomInterval = setInterval(function () {
            _this.stopIfElementIsNotInDom();
        }, 5000);
    }
    static stopIfElementIsNotInDom() {
        if (!document.querySelector(".statistics")) {
            this.disable();
            this._statisticParent = undefined;
        }
    }
    static disable() {
        clearInterval(this._interval);
        clearInterval(this._checkDomInterval);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (StatisticController);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ActionController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _VideoBitrateController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _Model_UserOptionsModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);



class UiController {
    constructor() {
        this._videoBitrateController = new _VideoBitrateController__WEBPACK_IMPORTED_MODULE_1__["default"]();
    }
    createUi(videoController) {
        const videoTitle = document.querySelector(".video-title");
        if (videoTitle === undefined || videoTitle === null)
            return;
        this.removeUiOfPreviousVideo();
        const zoomIn = this.createButton("+", "Zoom in (Key: +)");
        this.addButtonClickListener(videoController, zoomIn, "zoomIn");
        const zoomOut = this.createButton("-", "Zoom out (Key: -)");
        this.addButtonClickListener(videoController, zoomOut, "zoomOut");
        const resetZoom = this.createButton("16:9", "Reset zoom (Key: ,)", true);
        this.addButtonClickListener(videoController, resetZoom, "resetZoom");
        const fullZoom = this.createButton("21:9", "Zoom to 21:9 (Key: .)", true);
        this.addButtonClickListener(videoController, fullZoom, "fullZoom");
        const videoBitrates = this.createAndGetVideoBitrates();
        const uiContainer = document.createElement("div");
        uiContainer.classList.add("uiContainer");
        uiContainer.appendChild(zoomIn);
        uiContainer.appendChild(zoomOut);
        uiContainer.appendChild(resetZoom);
        uiContainer.appendChild(fullZoom);
        if (videoBitrates)
            uiContainer.appendChild(videoBitrates);
        videoTitle.parentNode.insertBefore(uiContainer, videoTitle.nextSibling);
        if (videoBitrates)
            this.fixQualityMenuForOtherPlayers(videoBitrates, uiContainer);
    }
    createButton(text, title, largeButton = false) {
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("uiContainer");
        const button = document.createElement("button");
        button.textContent = text;
        button.classList.add("uiButtons");
        if (largeButton)
            button.classList.add("largeUiButtons");
        button.title = title;
        buttonContainer.appendChild(button);
        return buttonContainer;
    }
    addButtonClickListener(videoController, button, actionName) {
        button.addEventListener("click", event => {
            event.stopPropagation();
            const action = _ActionController__WEBPACK_IMPORTED_MODULE_0__["ActionFactory"].getAction(actionName);
            action.execute(videoController);
        }, false);
    }
    removeUiOfPreviousVideo() {
        const uiContainer = document.querySelector(".uiContainer");
        if (uiContainer) {
            uiContainer.parentElement.removeChild(uiContainer);
        }
    }
    createAndGetVideoBitrates() {
        const tooltip = document.createElement("div");
        tooltip.classList.add("tooltip", "hidden");
        const bitrates = this._videoBitrateController.getVideoBitrates();
        if (bitrates.length === 0)
            return null;
        bitrates.forEach(bitrate => {
            const bitrateElement = document.createElement("div");
            bitrateElement.classList.add("tooltipChild");
            bitrateElement.textContent = bitrate;
            bitrateElement.setAttribute("bitrate", bitrate);
            tooltip.appendChild(bitrateElement);
        });
        const videoBitrates = this.createButton("⚙", "Video quality (Highest number = best quality)");
        videoBitrates.appendChild(tooltip);
        this.initTooltip(videoBitrates, tooltip);
        this.initTooltipChildren(tooltip);
        this.selectHighestBitrateIfOptionIsSet(tooltip);
        return videoBitrates;
    }
    initTooltip(button, tooltip) {
        button.addEventListener("mouseenter", () => {
            tooltip.classList.remove("hidden");
        }, false);
        button.addEventListener("mouseleave", () => {
            setTimeout(() => {
                if (!tooltip.classList.contains("hidden") && button.parentElement.querySelector(":hover") !== button)
                    tooltip.classList.add("hidden");
            }, 1000);
        }, false);
    }
    initTooltipChildren(tooltip) {
        const _this = this;
        tooltip.childNodes.forEach(element => {
            const child = element;
            child.addEventListener("click", () => {
                const successful = _this._videoBitrateController.changeBitrate(child.getAttribute("bitrate")) !== undefined;
                if (!successful)
                    return;
                this.selectTooltipChild(tooltip, child);
                setTimeout(() => tooltip.classList.add("hidden"), 500);
            }, false);
        });
    }
    selectTooltipChild(tooltip, child) {
        tooltip.childNodes.forEach(element => element.classList.remove("tooltipChildSelected"));
        child.classList.add("tooltipChildSelected");
    }
    selectHighestBitrateIfOptionIsSet(tooltip) {
        const _this = this;
        _Model_UserOptionsModel__WEBPACK_IMPORTED_MODULE_2__["default"].callWithOptions(optionKeys => {
            if (!optionKeys.selectHighestBitrate)
                return;
            const highestBitrate = _this._videoBitrateController.changeBitrate("", true);
            _this.selectTooltipChild(tooltip, tooltip.querySelector("[bitrate='" + highestBitrate + "']"));
        });
    }
    fixQualityMenuForOtherPlayers(videoBitrates, uiContainer) {
        setTimeout(() => {
            _Model_UserOptionsModel__WEBPACK_IMPORTED_MODULE_2__["default"].callWithOptions(options => {
                if (!options.menuOnTop)
                    return;
                const tooltip = videoBitrates.childNodes[1];
                tooltip.classList.add("tooltipOnTop");
                videoBitrates.addEventListener("mouseover", () => {
                    document.querySelector("div.PlayerControlsNeo__progress-container").style.display = "none";
                });
                videoBitrates.addEventListener("mouseout", () => {
                    document.querySelector("div.PlayerControlsNeo__progress-container").style.display = "flex";
                });
                document.querySelector("time.elapsedTime").parentElement.classList.add("time-remaining--classic");
                for (const container of uiContainer.childNodes) {
                    container.childNodes[0].style.marginTop = "0";
                }
            });
        }, 1000);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (UiController);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Model_HtmlModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);

class VideoBitrateController {
    getVideoBitrates() {
        this.toggleBitrateSelectionWindow();
        let result = this.readBitrates();
        this.toggleBitrateSelectionWindow();
        return result;
    }
    readBitrates() {
        let result = [];
        const videoBitrates = _Model_HtmlModel__WEBPACK_IMPORTED_MODULE_0__["default"].videoBitrates;
        for (let i = 0; i < videoBitrates.length; i++) {
            result[i] = videoBitrates.item(i).textContent;
        }
        return result;
    }
    changeBitrate(bitrate, selectHighestBitrate = false) {
        this.toggleBitrateSelectionWindow();
        const videoBitrates = _Model_HtmlModel__WEBPACK_IMPORTED_MODULE_0__["default"].videoBitrates;
        const bitrateStrings = this.readBitrates();
        const bitrateIndex = selectHighestBitrate ? bitrateStrings.length - 1 : bitrateStrings.indexOf(bitrate);
        if (bitrateIndex >= 0) {
            const bitrateElement = videoBitrates.item(bitrateIndex);
            if (bitrateElement) {
                this.overrideBitrate(bitrateElement);
                return bitrateElement.textContent;
            }
            else
                this.toggleBitrateSelectionWindow();
        }
    }
    overrideBitrate(bitrateElement) {
        bitrateElement.parentElement.value = bitrateElement.textContent;
        bitrateElement.parentElement.parentElement.parentElement.lastChild.firstChild.click();
    }
    toggleBitrateSelectionWindow() {
        const event = new KeyboardEvent("keydown", {
            key: "S",
            ctrlKey: true,
            shiftKey: true,
            altKey: true,
            bubbles: true,
            keyCode: 83,
            which: 83,
            charCode: 83
        });
        const successful = document.dispatchEvent(event);
        if (!successful)
            console.error("KeyboardEvent was not successful!");
        return successful;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (VideoBitrateController);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Constants_NetflixSelectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);

class HtmlModel {
    static getResult(value, defaultValue) {
        return value === undefined || value === null ? defaultValue : value;
    }
    static get videoBitrates() {
        let temp = document.querySelector("." + _Constants_NetflixSelectors__WEBPACK_IMPORTED_MODULE_0__["default"].videoBitrateClass);
        if (temp) {
            temp = temp.children;
            if (temp) {
                temp = temp[0].children;
                if (temp) {
                    temp = temp[1].getElementsByTagName("option");
                    if (temp.length > 0)
                        this._videoBitrates = temp;
                }
            }
        }
        return this.getResult(this._videoBitrates, []);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (HtmlModel);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class NetflixSelectors {
    static get videoBitrateClass() {
        return "player-streams";
    }
}
/* harmony default export */ __webpack_exports__["default"] = (NetflixSelectors);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Model_TimeModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _Model_UserOptionsModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);


class TimeUiController {
    constructor() {
        this._timeModel = new _Model_TimeModel__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this._optionKeys = _Model_UserOptionsModel__WEBPACK_IMPORTED_MODULE_1__["default"].optionKeys;
    }
    setTimeInterval(video) {
        this._video = video;
        if (this._optionKeys.timeElapsed) {
            if (this._timeInterval !== undefined) {
                clearInterval(this._timeInterval);
            }
            const _this = this;
            this._timeInterval = setInterval(function () {
                _this.initTime();
            }, 500);
        }
    }
    initTime() {
        if (this._video.src !== "") {
            this.removeTimeFromPreviousVideo();
            this.initElapsedTime();
            clearInterval(this._timeInterval);
            this._timeInterval = undefined;
        }
    }
    initElapsedTime() {
        this._htmlTime = document.createElement("time");
        this._htmlTime.classList.add("elapsedTime", "time-remaining__time");
        this._htmlTime.textContent = "0:00";
        const timeParent = document.createElement("div");
        timeParent.classList.add("PlayerControls--control-element", "text-control");
        timeParent.style.textAlign = "left";
        timeParent.appendChild(this._htmlTime);
        const parent = document.getElementsByClassName("PlayerControls--control-element progress-control")[0];
        parent.insertBefore(timeParent, parent.firstChild);
        const _this = this;
        this._video.addEventListener("timeupdate", function () {
            _this.updateTime();
        }, false);
    }
    updateTime() {
        if (this._video !== undefined) {
            this._timeModel.setCurrentTime(this._video.currentTime);
            this._htmlTime.textContent = this._timeModel.toString();
        }
    }
    removeTimeFromPreviousVideo() {
        const time = document.querySelector("time.elapsedTime");
        if (time) {
            time.parentElement.removeChild(time);
        }
    }
}
/* harmony default export */ __webpack_exports__["default"] = (TimeUiController);


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class TimeModel {
    get hours() {
        return this._hours;
    }
    get minutes() {
        return this._minutes;
    }
    get seconds() {
        return this._seconds;
    }
    setCurrentTime(currentSeconds) {
        this._hours = Math.floor(currentSeconds / 60 / 60);
        this._minutes = Math.floor(currentSeconds / 60);
        this._seconds = Math.floor(currentSeconds - this._minutes * 60);
        this._minutes -= this._hours * 60;
    }
    toString() {
        return (this._hours > 0 ? this._hours + ":" + this.addLeadingZero(this._minutes) : this._minutes) + ":" + this.addLeadingZero(this._seconds);
    }
    addLeadingZero(number) {
        return ((number + "").length < 2 ? "0" : "") + number;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (TimeModel);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var MyListController;
(function (MyListController) {
    function randomVideo() {
        if (location.href !== "https://www.netflix.com/browse/my-list")
            return;
        const button = document.createElement("button");
        button.textContent = "Pick random video";
        button.classList.add("bn_btn");
        button.addEventListener("click", () => {
            const allVideos = document.querySelectorAll(".rowContainer .slider-item");
            if (allVideos.length <= 0)
                return;
            const randomContainer = allVideos[Math.floor(Math.random() * allVideos.length + 1) - 1];
            const randomVideo = randomContainer.querySelector("a");
            randomVideo.scrollIntoView({ behavior: "smooth", block: "center" });
            randomContainer.classList.add("bn_border");
        });
        const container = document.createElement("div");
        container.appendChild(button);
        document.querySelector(".sub-header-wrapper").appendChild(container);
    }
    MyListController.randomVideo = randomVideo;
})(MyListController || (MyListController = {}));
/* harmony default export */ __webpack_exports__["default"] = (MyListController);


/***/ })
/******/ ]);