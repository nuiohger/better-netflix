import { ActionFactory, IAction } from "./ActionController";
import VideoController from "./VideoController";

class UiController {
    public createUi(videoController: VideoController): void {
        const videoTitle: HTMLDivElement = <HTMLDivElement> document.querySelector(".video-title");
        if(videoTitle === undefined || videoTitle === null) return;

        const zoomIn: HTMLDivElement = this.createButton("+", "Zoom in (Key: +)");
        this.uiButtonClickListener(videoController, zoomIn, "zoomIn");

        const zoomOut: HTMLDivElement = this.createButton("-", "Zoom out (Key: -)");
        this.uiButtonClickListener(videoController, zoomOut, "zoomOut");

        const resetZoom: HTMLDivElement = this.createButton("16:9", "Reset zoom (Key: ,)", true);
        this.uiButtonClickListener(videoController, resetZoom, "resetZoom");

        const fullZoom: HTMLDivElement = this.createButton("21:9", "Zoom to 21:9 (Key: .)", true);
        this.uiButtonClickListener(videoController, fullZoom, "fullZoom");

        const zoomContainer: HTMLDivElement = document.createElement("div");
        zoomContainer.classList.add("uiContainer");
        zoomContainer.appendChild(zoomIn);
        zoomContainer.appendChild(zoomOut);
        zoomContainer.appendChild(resetZoom);
        zoomContainer.appendChild(fullZoom);

        videoTitle.parentNode.insertBefore(zoomContainer, videoTitle.nextSibling);
    }

    private createButton(text: string, title: string, largeButton: boolean = false): HTMLDivElement {
        const buttonContainer: HTMLDivElement = document.createElement("div");
        buttonContainer.classList.add("uiContainer");

        const button: HTMLButtonElement = document.createElement("button");
        button.textContent = text;
        button.classList.add("uiButtons");
        if(largeButton)
            button.classList.add("largeUiButtons");

        button.title = title;
        
        buttonContainer.appendChild(button);
        return buttonContainer;
    }

    private uiButtonClickListener(videoController: VideoController, button: HTMLDivElement, actionName: string): void {
        button.addEventListener("click", event => {
            event.stopPropagation();

            const action: IAction = ActionFactory.getAction(actionName);
            action.execute(videoController);
        }, false);
    }
}

export default UiController;
