"use strict";

import VideoController from "./Controller/VideoController";
import {ActionFactory, IAction} from "./Controller/ActionController";
import UiController from "./Controller/UiController";
import TimeUiController from "./Controller/TimeUiController";
import MyListController from "./Controller/MyListController";
import {options} from "./Constants/Options";

class Main {
    private readonly _videoController: VideoController;

    constructor() {
        const uiController: UiController = new UiController();
        const timeUiController: TimeUiController = new TimeUiController();

        this._videoController = new VideoController(uiController, timeUiController);

        this.initialize();
    }

    private initialize(): void {
        this._videoController.start();
        MyListController.randomVideo();

        this.observe();

        document.addEventListener("keydown", event => {
            const actionName = ActionFactory.actionNames.filter(actionName => options[actionName] === event.key)[0];

            try {
                const action: IAction = ActionFactory.getAction(actionName);
                action.execute(this._videoController);
            } catch(e) {}
        }, false);
    }

    private observe(): any {
        let oldHref = location.href;

        const observer = new MutationObserver(() => {
            if(oldHref !== location.href) {
                oldHref = location.href;

                this._videoController.start();
                MyListController.randomVideo();
            }
        });

        observer.observe(document.body, {childList: true, subtree: true});
    }
}

new Main();
// addEventListener("DOMContentLoaded", () => new Main(), false);
