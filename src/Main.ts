"use strict"

import VideoController from "./Controller/VideoController"
import { ActionFactory } from "./Controller/ActionController"
import UiController from "./Controller/UiController"
import TimeUiController from "./Controller/TimeUiController"
import * as MyListController from "./Controller/MyListController"
import { options } from "./Constants/Options"
import ImdbController from "./Controller/ImdbController"

const skipButtonClass = "[data-uia=player-skip-intro]"
const continueWatchingButtonClass = "[data-uia=interrupt-autoplay-continue]"

function main(): void {
    const videoController = new VideoController()
    videoController.start()
    MyListController.randomVideo()

    observe(videoController)

    document.addEventListener(
        "keydown",
        (event) => {
            const actionNames = ActionFactory.actionNames.filter(
                (actionName) => options[actionName] === event.key
            )
            if (actionNames.length === 0) {
                return
            }

            const action = ActionFactory.getAction(actionNames[0])
            if (action) {
                action.execute(videoController)
            }
        },
        false
    )

    ImdbController.addImdbButton()
}

function observe(videoController: VideoController): void {
    const uiController = new UiController()
    const timeUiController = new TimeUiController()
    const imdbController = new ImdbController()

    let oldHref = location.href

    const observer = new MutationObserver(() => {
        uiController.createUi(videoController)

        setTimeout(() => {
            timeUiController.initTime(videoController.getHtmlVideo)
        }, 1000)

        videoController.start()

        if (oldHref !== location.href) {
            oldHref = location.href

            MyListController.randomVideo()

            imdbController.init()
        }

        if (options.autoSkip) {
            const skipButton: HTMLElement =
                document.querySelector(skipButtonClass)
            if (skipButton) {
                skipButton.click()
            }
        }

        if(options.continueWatching) {
            const continueWatchingButton: HTMLElement =
                document.querySelector(continueWatchingButtonClass)
            if (continueWatchingButton) {
                continueWatchingButton.click()
            }
        }
    })

    observer.observe(document.body, { childList: true, subtree: true })
}

main()
