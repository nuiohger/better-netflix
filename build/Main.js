"use strict";
import VideoController from "./Controller/VideoController";
import { ActionFactory } from "./Controller/ActionController";
import UserOptionsModel from "./Model/UserOptionsModel";
import UiController from "./Controller/UiController";
import TimeUiController from "./Controller/TimeUiController";
import MyListController from "./Controller/MyListController";
class Main {
    constructor() {
        this._defaultKeys = UserOptionsModel.optionKeys;
        const uiController = new UiController();
        const timeUiController = new TimeUiController();
        this._videoController = new VideoController(uiController, timeUiController);
        this.initialize();
    }
    initialize() {
        this._videoController.start();
        MyListController.randomVideo();
        this.observe();
        document.addEventListener("keydown", event => {
            const actionName = ActionFactory.actionNames.filter(actionName => this._defaultKeys[actionName] === event.key)[0];
            try {
                const action = ActionFactory.getAction(actionName);
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
                MyListController.randomVideo();
            }
        });
        observer.observe(body, { childList: true, subtree: true });
    }
}
new Main();
