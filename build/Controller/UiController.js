import { ActionFactory } from "./ActionController";
import VideoBitrateController from "./VideoBitrateController";
class UiController {
    createUi(videoController) {
        const videoTitle = document.querySelector(".video-title");
        if (videoTitle === undefined || videoTitle === null)
            return;
        const zoomIn = this.createButton("+", "Zoom in (Key: +)");
        this.addButtonClickListener(videoController, zoomIn, "zoomIn");
        const zoomOut = this.createButton("-", "Zoom out (Key: -)");
        this.addButtonClickListener(videoController, zoomOut, "zoomOut");
        const resetZoom = this.createButton("16:9", "Reset zoom (Key: ,)", true);
        this.addButtonClickListener(videoController, resetZoom, "resetZoom");
        const fullZoom = this.createButton("21:9", "Zoom to 21:9 (Key: .)", true);
        this.addButtonClickListener(videoController, fullZoom, "fullZoom");
        const videoBitrates = this.createAndGetVideoBitrates();
        const uiContainer = document.createElement("div");
        uiContainer.classList.add("uiContainer");
        uiContainer.appendChild(zoomIn);
        uiContainer.appendChild(zoomOut);
        uiContainer.appendChild(resetZoom);
        uiContainer.appendChild(fullZoom);
        uiContainer.appendChild(videoBitrates);
        videoTitle.parentNode.insertBefore(uiContainer, videoTitle.nextSibling);
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
    addButtonClickListener(videoController, button, actionName) {
        button.addEventListener("click", event => {
            event.stopPropagation();
            const action = ActionFactory.getAction(actionName);
            action.execute(videoController);
        }, false);
    }
    createAndGetVideoBitrates() {
        const tooltip = document.createElement("div");
        tooltip.classList.add("tooltip", "hidden");
        const bitrates = new VideoBitrateController().getVideoBitrates();
        bitrates.forEach(bitrate => {
            const bitrateElement = document.createElement("div");
            bitrateElement.classList.add("tooltipChild");
            bitrateElement.textContent = bitrate;
            bitrateElement.setAttribute("bitrate", bitrate);
            tooltip.appendChild(bitrateElement);
        });
        const videoBitrates = this.createButton("⚙", "Video quality (Highest number = best quality)");
        videoBitrates.appendChild(tooltip);
        this.initTooltip(videoBitrates, tooltip);
        this.initTooltipChildren(tooltip);
        return videoBitrates;
    }
    initTooltip(button, tooltip) {
        button.addEventListener("mouseenter", () => {
            tooltip.classList.remove("hidden");
        }, false);
        button.addEventListener("mouseleave", () => {
            setTimeout(() => {
                if (!tooltip.classList.contains("hidden") && button.parentElement.querySelector(":hover") !== button)
                    tooltip.classList.add("hidden");
            }, 1000);
        }, false);
    }
    initTooltipChildren(tooltip) {
        tooltip.childNodes.forEach(element => {
            const child = element;
            child.addEventListener("click", () => {
                const successful = new VideoBitrateController().changeBitrate(child.getAttribute("bitrate"));
                if (!successful)
                    return;
                tooltip.childNodes.forEach(element => element.classList.remove("tooltipChildSelected"));
                child.classList.add("tooltipChildSelected");
                setTimeout(() => tooltip.classList.add("hidden"), 500);
            }, false);
        });
    }
}
export default UiController;
