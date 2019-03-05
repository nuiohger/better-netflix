"use strict";

import VideoController from "./Controller/VideoController";
import {ActionFactory, IAction} from "./Controller/ActionController";
import UserOptionsModel from "./Model/UserOptionsModel";
import UiController from "./Controller/UiController";
import TimeUiController from "./Controller/TimeUiController";

class Main {
    private readonly _videoController: VideoController;
    private readonly _defaultKeys: UserOptionsModel;

    constructor() {
        this._defaultKeys = UserOptionsModel.optionKeys;

        const uiController: UiController = new UiController();
        const timeUiController: TimeUiController = new TimeUiController();

        this._videoController = new VideoController(uiController, timeUiController);

        this.initialize();
    }

    private initialize(): void {
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
                const action: IAction = ActionFactory.getAction(actionName);
                action.execute(this._videoController);
            } catch(e) {}
        }, false);
    }
}

new Main();
