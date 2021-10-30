import { options } from "../../Constants/Options"
import VideoController from "../VideoController"
import IAction from "./IAction"

export default class ToggleSubtitleAction implements IAction {
    key: string = options.toggleSubtitles

    private readonly subtitleButtonSelector =
        "div.ltr-1bt0omd > div.ltr-1i33xgl > div:nth-child(3) > div:nth-child(7) > button"

    private readonly subtitlesSelector =
        "div.ltr-8c73co.show > div > div > div > div:nth-child(2) > ul > li"

    private readonly playButtonSelector =
        "div.ltr-1bt0omd > div > div:nth-child(1) > div:nth-child(1) > button"

    private readonly subtitleTextSelector = "div > div"

    private readonly textSubtitlesOff = ["off", "aus"]

    public execute(videoController: VideoController): void {
        const shouldVideoBePaused = videoController.getHtmlVideo.paused
        const restoreVideoState = (playButton: HTMLButtonElement) => {
            const isVideoCurrentlyPaused = videoController.getHtmlVideo.paused
            if (
                (shouldVideoBePaused && !isVideoCurrentlyPaused) ||
                (!shouldVideoBePaused && isVideoCurrentlyPaused)
            ) {
                playButton.click()
            }
        }

        videoController.getHtmlVideo.click()

        const interval = setInterval(() => {
            const playButton: HTMLButtonElement = document.querySelector(
                this.playButtonSelector
            )
            if (!playButton) {
                return
            }
            clearInterval(interval)

            const subtitleButton: HTMLDivElement = document.querySelector(
                this.subtitleButtonSelector
            )
            subtitleButton.click()

            const selectSubtitleInterval = setInterval(() => {
                const successfullySelectedSubtitle = this.selectSubtitle()
                if (!successfullySelectedSubtitle) {
                    return
                }
                clearInterval(selectSubtitleInterval)

                setTimeout(() => {
                    restoreVideoState(playButton)
                    videoController.getHtmlVideo.focus()
                }, 100)
            }, 100)
        }, 100)
    }

    private selectSubtitle() {
        const subtitles = document.querySelectorAll(this.subtitlesSelector)
        if (subtitles.length <= 1) {
            return false
        }

        const subtitleTexts: HTMLElement[] = Array.from(
            document.querySelectorAll(
                `${this.subtitlesSelector} > ${this.subtitleTextSelector}`
            )
        )

        if ((<HTMLDivElement>subtitles[0]).dataset.uia.includes("selected")) {
            let index = subtitleTexts.findIndex((element) =>
                element.textContent.toLowerCase().startsWith("englis")
            )
            if (index === 0) {
                index = subtitleTexts.findIndex((element) =>
                    this.textSubtitlesOff.includes(
                        element.textContent.toLowerCase()
                    )
                )
            }
            index = index < 1 ? 1 : index

            subtitleTexts[index].click()
        } else {
            subtitleTexts[0].click()
        }

        return true
    }
}
