import VideoController from "./VideoController";
import ContainerElement from "../Ui/ContainerElement";
import UiButtonController from "./UiButtonController";

class UiController {
    public createUi(videoController: VideoController): void {
        const videoTitle: HTMLDivElement = <HTMLDivElement>document.querySelector(".video-title");
        if(videoTitle === undefined || videoTitle === null) return;

        this.removeUiOfPreviousVideo();

        const uiContainer: ContainerElement = new UiButtonController().initButtons(videoController);

        videoTitle.parentNode.insertBefore(uiContainer.element, videoTitle.nextSibling);
    }

    private removeUiOfPreviousVideo(): void {
        const uiContainer = document.querySelector(".uiContainer");
        if(uiContainer) {
            uiContainer.parentElement.removeChild(uiContainer);
        }
    }
}

export default UiController;
