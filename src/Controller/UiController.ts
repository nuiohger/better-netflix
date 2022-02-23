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
            "div.watch-video--bottom-controls-container.ltr-310mo1-layoutSlotCss > div > div > div.ltr-wge5p3-ControlsStandard > div > div:last-child"
        )
    }
}

export default UiController
