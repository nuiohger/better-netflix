import VideoController from "./VideoController";
import VideoBitrateController from "./VideoBitrateController";
import ButtonElement from "../Ui/ButtonElement";
import ContainerElement from "../Ui/ContainerElement";
import TooltipElement from "../Ui/TooltipElement";
import UiButtonController from "./UiButtonController";
import {options} from "../Constants/Options";

class UiController {
    private _videoBitrateController: VideoBitrateController;

    public constructor() {
        this._videoBitrateController = new VideoBitrateController();
    }

    public createUi(videoController: VideoController): void {
        const videoTitle: HTMLDivElement = <HTMLDivElement>document.querySelector(".video-title");
        if(videoTitle === undefined || videoTitle === null) return;

        this.removeUiOfPreviousVideo();

        const uiContainer: ContainerElement = new UiButtonController().initButtons(videoController);

        const videoBitrates: ButtonElement = this.createAndGetVideoBitrates();
        if(videoBitrates)
            uiContainer.addChildren(videoBitrates);

        videoTitle.parentNode.insertBefore(uiContainer.element, videoTitle.nextSibling);

        if(videoBitrates)
            this.fixQualityMenuForOtherPlayers(videoBitrates.element as HTMLDivElement, uiContainer.element as HTMLDivElement);
    }

    private removeUiOfPreviousVideo(): void {
        const uiContainer = document.querySelector(".uiContainer");
        if(uiContainer) {
            uiContainer.parentElement.removeChild(uiContainer);
        }
    }


    private createAndGetVideoBitrates(): ButtonElement {
        const bitrates: string[] = this._videoBitrateController.getVideoBitrates();
        if(bitrates.length === 0 || options.hideVideoBitratesButton) return null;

        const tooltipChildren: HTMLDivElement[] = bitrates.map(bitrate => {
            const bitrateElement: HTMLDivElement = document.createElement("div");
            bitrateElement.classList.add("tooltipChild");
            bitrateElement.textContent = bitrate;
            bitrateElement.setAttribute("bitrate", bitrate);
            return bitrateElement;
        });

        const videoBitrates: ButtonElement = new ButtonElement("⚙", "Video quality (Highest number = best quality)");
        const tooltip: TooltipElement = new TooltipElement(videoBitrates, ...tooltipChildren);

        tooltip.addChildEventListener("click", event => {
            const child = (event.target as HTMLElement);
            const bitrate = child.getAttribute("bitrate");
            const successful: boolean = this._videoBitrateController.changeBitrate(bitrate) !== undefined;
            if(!successful) return;

            tooltip.selectTooltipChild(child);

            setTimeout(tooltip.hide, 500);
        });

        this.selectHighestBitrateIfOptionIsSet(tooltip);

        return videoBitrates;
    }

    private selectHighestBitrateIfOptionIsSet(tooltip: TooltipElement): void {
        if(!options.selectHighestBitrate) return;

        const highestBitrate: string = this._videoBitrateController.changeBitrate("", true);

        tooltip.selectTooltipChild(tooltip.element.querySelector("[bitrate='" + highestBitrate + "']"));
    }

    private fixQualityMenuForOtherPlayers(videoBitrates: HTMLDivElement, uiContainer: HTMLDivElement) {
        setTimeout(() => {
            if(!options.menuOnTop) return;

            const tooltip: HTMLDivElement = <HTMLDivElement>videoBitrates.childNodes[1];
            tooltip.classList.add("tooltipOnTop");

            videoBitrates.addEventListener("mouseover", () => {
                (<HTMLDivElement>document.querySelector("div.PlayerControlsNeo__progress-container")).style.display = "none";
            });
            videoBitrates.addEventListener("mouseout", () => {
                (<HTMLDivElement>document.querySelector("div.PlayerControlsNeo__progress-container")).style.display = "flex";
            });

            document.querySelector("time.elapsedTime").parentElement.classList.add("time-remaining--classic");

            for(const container of uiContainer.childNodes) {
                (<HTMLDivElement>container.childNodes[0]).style.marginTop = "0";
            }
        }, 1000);
    }
}

export default UiController;
