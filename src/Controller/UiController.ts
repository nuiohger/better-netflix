import { ActionFactory, IAction } from "./ActionController";
import VideoController from "./VideoController";
import VideoBitrateController from "./VideoBitrateController";
import UserOptionsModel from "../Model/UserOptionsModel";

class UiController {
    private _videoBitrateController: VideoBitrateController;

    public constructor() {
        this._videoBitrateController = new VideoBitrateController();
    }

    public createUi(videoController: VideoController): void {
        const videoTitle: HTMLDivElement = <HTMLDivElement> document.querySelector(".video-title");
        if(videoTitle === undefined || videoTitle === null) return;

        const zoomIn: HTMLDivElement = this.createButton("+", "Zoom in (Key: +)");
        this.addButtonClickListener(videoController, zoomIn, "zoomIn");

        const zoomOut: HTMLDivElement = this.createButton("-", "Zoom out (Key: -)");
        this.addButtonClickListener(videoController, zoomOut, "zoomOut");

        const resetZoom: HTMLDivElement = this.createButton("16:9", "Reset zoom (Key: ,)", true);
        this.addButtonClickListener(videoController, resetZoom, "resetZoom");

        const fullZoom: HTMLDivElement = this.createButton("21:9", "Zoom to 21:9 (Key: .)", true);
        this.addButtonClickListener(videoController, fullZoom, "fullZoom");

        const videoBitrates: HTMLDivElement = this.createAndGetVideoBitrates();

        const uiContainer: HTMLDivElement = document.createElement("div");
        uiContainer.classList.add("uiContainer");
        uiContainer.appendChild(zoomIn);
        uiContainer.appendChild(zoomOut);
        uiContainer.appendChild(resetZoom);
        uiContainer.appendChild(fullZoom);
        uiContainer.appendChild(videoBitrates);

        videoTitle.parentNode.insertBefore(uiContainer, videoTitle.nextSibling);

        this.fixQualityMenuForOtherPlayers(videoBitrates);
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

    private addButtonClickListener(videoController: VideoController, button: HTMLDivElement, actionName: string): void {
        button.addEventListener("click", event => {
            event.stopPropagation();

            const action: IAction = ActionFactory.getAction(actionName);
            action.execute(videoController);
        }, false);
    }


    private createAndGetVideoBitrates(): HTMLDivElement {
        const tooltip: HTMLDivElement = document.createElement("div");
        tooltip.classList.add("tooltip", "hidden");

        const bitrates: string[] = this._videoBitrateController.getVideoBitrates();
        bitrates.forEach(bitrate => {
            const bitrateElement: HTMLDivElement = document.createElement("div");
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

    private initTooltip(button: HTMLDivElement, tooltip: HTMLDivElement): void {
        button.addEventListener("mouseenter", () => {
            tooltip.classList.remove("hidden");
        }, false);

        button.addEventListener("mouseleave", () => {
            setTimeout(() => {
                if(!tooltip.classList.contains("hidden") && button.parentElement.querySelector(":hover") !== button)
                    tooltip.classList.add("hidden");
            }, 1000);
        }, false);
    }

    private initTooltipChildren(tooltip: HTMLDivElement): void {
        const _this = this;

        tooltip.childNodes.forEach(element => {
            const child: HTMLElement = <HTMLElement>element;

            child.addEventListener("click", () => {
                const successful: boolean = _this._videoBitrateController.changeBitrate(child.getAttribute("bitrate")) !== undefined;
                if(!successful) return;

                this.selectTooltipChild(tooltip, child);

                setTimeout(() => tooltip.classList.add("hidden"), 500);
            }, false);
        });
    }

    private selectTooltipChild(tooltip: HTMLDivElement, child: HTMLElement) {
        tooltip.childNodes.forEach(element => (element as HTMLElement).classList.remove("tooltipChildSelected"));
        child.classList.add("tooltipChildSelected");
    }

    private selectHighestBitrateIfOptionIsSet(tooltip: HTMLDivElement): void {
        const _this = this;
        UserOptionsModel.callWithOptions(optionKeys => {
            if(!optionKeys.selectHighestBitrate) return;

            const highestBitrate: string = _this._videoBitrateController.changeBitrate("", true);

            _this.selectTooltipChild(tooltip, tooltip.querySelector("[bitrate='" + highestBitrate + "']"));
        });
    }

    private fixQualityMenuForOtherPlayers(videoBitrates: HTMLDivElement) {
        UserOptionsModel.callWithOptions(options => {
            if(!options.menuOnTop) return;

            const tooltip: HTMLDivElement = <HTMLDivElement>videoBitrates.childNodes[1];
            tooltip.classList.add("tooltipOnTop");
        });
    }
}

export default UiController;
