import HtmlModel from "../Model/HtmlModel";
class VideoBitrateController {
    getVideoBitrates() {
        this.toggleBitrateSelectionWindow();
        let result = this.readBitrates();
        this.toggleBitrateSelectionWindow();
        return result;
    }
    readBitrates() {
        let result = [];
        const videoBitrates = HtmlModel.videoBitrates;
        for (let i = 0; i < videoBitrates.length; i++) {
            result[i] = videoBitrates.item(i).textContent;
        }
        return result;
    }
    changeBitrate(bitrate) {
        this.toggleBitrateSelectionWindow();
        let successful = false;
        const videoBitrates = HtmlModel.videoBitrates;
        const bitrateStrings = this.readBitrates();
        const bitrateIndex = bitrateStrings.indexOf(bitrate);
        if (bitrateIndex >= 0) {
            const bitrateElement = videoBitrates.item(bitrateIndex);
            if (bitrateElement) {
                this.overrideBitrate(bitrateElement);
                successful = true;
            }
            else
                this.toggleBitrateSelectionWindow();
        }
        return successful;
    }
    overrideBitrate(bitrateElement) {
        bitrateElement.parentElement.value = bitrateElement.textContent;
        bitrateElement.parentElement.parentElement.parentElement.lastChild.firstChild.click();
    }
    toggleBitrateSelectionWindow() {
        const event = new KeyboardEvent("keydown", {
            key: "S",
            ctrlKey: true,
            shiftKey: true,
            altKey: true,
            bubbles: true,
            keyCode: 83,
            which: 83,
            charCode: 83
        });
        const successful = document.dispatchEvent(event);
        if (!successful)
            console.error("KeyboardEvent was not successful!");
        return successful;
    }
}
export default VideoBitrateController;
