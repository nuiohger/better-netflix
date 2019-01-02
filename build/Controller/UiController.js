import { ActionFactory } from "./ActionController";
import VideoBitrateController from "./VideoBitrateController";
import UserOptionsModel from "../Model/UserOptionsModel";
class UiController {
    constructor() {
        this._videoBitrateController = new VideoBitrateController();
    }
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
        if (videoBitrates)
            uiContainer.appendChild(videoBitrates);
        videoTitle.parentNode.insertBefore(uiContainer, videoTitle.nextSibling);
        if (videoBitrates)
            this.fixQualityMenuForOtherPlayers(videoBitrates, uiContainer);
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
        const bitrates = this._videoBitrateController.getVideoBitrates();
        if (bitrates.length === 0)
            return null;
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
        this.selectHighestBitrateIfOptionIsSet(tooltip);
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
        const _this = this;
        tooltip.childNodes.forEach(element => {
            const child = element;
            child.addEventListener("click", () => {
                const successful = _this._videoBitrateController.changeBitrate(child.getAttribute("bitrate")) !== undefined;
                if (!successful)
                    return;
                this.selectTooltipChild(tooltip, child);
                setTimeout(() => tooltip.classList.add("hidden"), 500);
            }, false);
        });
    }
    selectTooltipChild(tooltip, child) {
        tooltip.childNodes.forEach(element => element.classList.remove("tooltipChildSelected"));
        child.classList.add("tooltipChildSelected");
    }
    selectHighestBitrateIfOptionIsSet(tooltip) {
        const _this = this;
        UserOptionsModel.callWithOptions(optionKeys => {
            if (!optionKeys.selectHighestBitrate)
                return;
            const highestBitrate = _this._videoBitrateController.changeBitrate("", true);
            _this.selectTooltipChild(tooltip, tooltip.querySelector("[bitrate='" + highestBitrate + "']"));
        });
    }
    fixQualityMenuForOtherPlayers(videoBitrates, uiContainer) {
        setTimeout(() => {
            UserOptionsModel.callWithOptions(options => {
                if (!options.menuOnTop)
                    return;
                const tooltip = videoBitrates.childNodes[1];
                tooltip.classList.add("tooltipOnTop");
                videoBitrates.addEventListener("mouseover", () => {
                    document.querySelector("div.PlayerControls--progress-control-row").style.display = "none";
                });
                videoBitrates.addEventListener("mouseout", () => {
                    document.querySelector("div.PlayerControls--progress-control-row").style.display = "flex";
                });
                document.querySelector("time.elapsedTime").parentElement.classList.add("time-remaining--classic");
                for (const container of uiContainer.childNodes) {
                    container.childNodes[0].style.marginTop = "0";
                }
            });
        }, 1000);
    }
}
export default UiController;
