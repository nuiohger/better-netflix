'use strict'

import VideoController from './Controller/VideoController'
import { ActionFactory, IAction } from './Controller/ActionController'
import UiController from './Controller/UiController'
import TimeUiController from './Controller/TimeUiController'
import * as MyListController from './Controller/MyListController'
import { options } from './Constants/Options'
import ImdbController from './Controller/ImdbController'

function main (): void {
  const videoController = new VideoController()
  videoController.start()
  MyListController.randomVideo()

  observe(videoController)

  document.addEventListener(
    'keydown',
    (event) => {
      const actionName = ActionFactory.actionNames.filter(
        (actionName) => options[actionName] === event.key
      )[0]

      try {
        const action: IAction = ActionFactory.getAction(actionName)
        action.execute(videoController)
      } catch (e) {}
    },
    false
  )

  ImdbController.addImdbButton()
}

function observe (videoController: VideoController): void {
  const uiController = new UiController()
  const timeUiController = new TimeUiController()
  const imdbController = new ImdbController()

  let oldHref = location.href

  const observer = new MutationObserver(() => {
    uiController.createUi(videoController)

    timeUiController.initTime(videoController.getHtmlVideo)

    if (oldHref !== location.href) {
      oldHref = location.href

      videoController.start()
      MyListController.randomVideo()

      imdbController.init()
    }
  })

  observer.observe(document.body, { childList: true, subtree: true })
}

main()
