import VideoController from "./VideoController";
import ContainerElement from "../Ui/ContainerElement";
import UiButtonController from "./UiButtonController";

class UiController {
  public createUi(videoController: VideoController): void {
    const netflixButtons = this.getNetflixButtonParent();
    if (!netflixButtons || document.querySelector(".uiContainer")) return;

    const uiContainer: ContainerElement = new UiButtonController().initButtons(
      videoController
    );

    netflixButtons.insertBefore(
      uiContainer.element,
      netflixButtons.children[0]
    );
  }

  private getNetflixButtonParent(): HTMLDivElement {
    const element = <NodeListOf<HTMLDivElement>>(
      document.querySelectorAll(
        ".ltr-1bt0omd > .ltr-1bt0omd > .ltr-1i33xgl > .ltr-hpbgml"
      )
    );
    return element.length > 1 ? element[1] : undefined;
  }
}

export default UiController;
