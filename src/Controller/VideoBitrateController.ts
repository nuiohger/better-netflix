import HtmlModel from "../Model/HtmlModel";

class VideoBitrateController {
    getVideoBitrates(): string[] {
        this.toggleBitrateSelectionWindow();

        let result: string[];
        const videoBitrates = HtmlModel.videoBitrates;
        for(let i: number = 0; i < videoBitrates.length; i++) {
            result[i] = videoBitrates.item(i).textContent;
        }

        return result;
    }

    private toggleBitrateSelectionWindow(): boolean {
        const event = new KeyboardEvent("keypress", {
            key: "s",
            ctrlKey: true,
            shiftKey: true,
            altKey: true
        });

        const successful = document.body.dispatchEvent(event);
        if(!successful) console.error("KeyboardEvent was not successful!");
        return successful;
    }
}

export default VideoBitrateController;
