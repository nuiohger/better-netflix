import { ActionFactory } from "./ActionController";
class UiController {
    createUi(videoController) {
        const videoTitle = document.querySelector(".video-title");
        if (videoTitle === undefined || videoTitle === null)
            return;
        const zoomIn = this.createButton("+", "Zoom in (Key: +)");
        this.uiButtonClickListener(videoController, zoomIn, "zoomIn");
        const zoomOut = this.createButton("-", "Zoom out (Key: -)");
        this.uiButtonClickListener(videoController, zoomOut, "zoomOut");
        const resetZoom = this.createButton("16:9", "Reset zoom (Key: ,)", true);
        this.uiButtonClickListener(videoController, resetZoom, "resetZoom");
        const fullZoom = this.createButton("21:9", "Zoom to 21:9 (Key: .)", true);
        this.uiButtonClickListener(videoController, fullZoom, "fullZoom");
        const zoomContainer = document.createElement("div");
        zoomContainer.classList.add("uiContainer");
        zoomContainer.appendChild(zoomIn);
        zoomContainer.appendChild(zoomOut);
        zoomContainer.appendChild(resetZoom);
        zoomContainer.appendChild(fullZoom);
        videoTitle.parentNode.insertBefore(zoomContainer, videoTitle.nextSibling);
    }
    createButton(text, title, largeButton = false) {
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("uiContainer");
        const button = document.createElement("button");
        button.textContent = text;
        button.classList.add("uiButtons");
        if (largeButton)
            button.classList.add("largeUiButtons");
        button.title = title;
        buttonContainer.appendChild(button);
        return buttonContainer;
    }
    uiButtonClickListener(videoController, button, actionName) {
        button.addEventListener("click", event => {
            event.stopPropagation();
            const action = ActionFactory.getAction(actionName);
            action.execute(videoController);
        }, false);
    }
}
export default UiController;
