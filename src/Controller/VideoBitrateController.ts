import HtmlModel from "../Model/HtmlModel";

class VideoBitrateController {
    public getVideoBitrates(): string[] {
        this.toggleBitrateSelectionWindow();

        let result: string[] = this.readBitrates();

        this.toggleBitrateSelectionWindow();

        return result;
    }

    private readBitrates(): string[] {
        let result: string[] = [];

        const videoBitrates = HtmlModel.videoBitrates;
        for (let i: number = 0; i < videoBitrates.length; i++) {
            result[i] = videoBitrates.item(i).textContent;
        }

        return result;
    }

    public changeBitrate(bitrate: string, selectHighestBitrate: boolean = false): string {
        this.toggleBitrateSelectionWindow();

        const videoBitrates: HTMLCollection = HtmlModel.videoBitrates;
        const bitrateStrings: string[] = this.readBitrates();
        const bitrateIndex: number = selectHighestBitrate ? bitrateStrings.length - 1 : bitrateStrings.indexOf(bitrate);
        if(bitrateIndex >= 0) {
            const bitrateElement: HTMLElement = videoBitrates.item(bitrateIndex) as HTMLElement;

            if(bitrateElement) {
                this.overrideBitrate(bitrateElement);

                return bitrateElement.textContent;
            } else
                this.toggleBitrateSelectionWindow();
        }
    }

    private overrideBitrate(bitrateElement: HTMLElement): void {
        (bitrateElement.parentElement as HTMLSelectElement).value = bitrateElement.textContent;
        (bitrateElement.parentElement.parentElement.parentElement.lastChild.firstChild as HTMLElement).click();
    }

    private toggleBitrateSelectionWindow(): boolean {
        const event = new KeyboardEvent("keydown", {
            key: "S",
            ctrlKey: true,
            shiftKey: true,
            altKey: true,
            bubbles: true,
            keyCode: 83,
            which: 83,
            charCode: 83
        } as any); //To ignore error: keyCode does not exist in type KeyboardEventInit. It is needed to trigger the event though.

        const successful: boolean = document.dispatchEvent(event);
        if(!successful) console.error("KeyboardEvent was not successful!");
        return successful;
    }
}

export default VideoBitrateController;
