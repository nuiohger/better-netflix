"use strict";
import VideoController from "./Controller/VideoController";
import { ActionFactory } from "./Controller/ActionController";
import UserOptionsModel from "./Model/UserOptionsModel";
import UiController from "./Controller/UiController";
import TimeUiController from "./Controller/TimeUiController";
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
        document.addEventListener("click", () => {
            setTimeout(() => {
                this._videoController.start();
            }, 2000);
        }, false);
        document.addEventListener("keydown", event => {
            this._videoController.start();
            const actionName = ActionFactory.actionNames.filter(actionName => this._defaultKeys[actionName] === event.key)[0];
            try {
                const action = ActionFactory.getAction(actionName);
                action.execute(this._videoController);
            }
            catch (e) { }
        }, false);
    }
}
new Main();
