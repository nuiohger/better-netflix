import VideoController from "./VideoController"
import ContainerElement from "../Ui/ContainerElement"
import UiButtonController from "./UiButtonController"

class UiController {
    public createUi(videoController: VideoController): void {
        const netflixButtons = this.getNetflixButtonParent()
        if (!netflixButtons || document.querySelector(".uiContainer")) return

        const uiContainer: ContainerElement =
            new UiButtonController().initButtons(videoController)

        netflixButtons.insertBefore(
            uiContainer.element,
            netflixButtons.children[0]
        )
    }

    private getNetflixButtonParent(): HTMLDivElement {
        return document.querySelector(
            "div.watch-video--bottom-controls-container > div > div > div > div > div:nth-child(3)"
        )
    }
}

export default UiController
