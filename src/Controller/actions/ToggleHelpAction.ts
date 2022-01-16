import { options } from "../../Constants/Options"
import VideoController from "../VideoController"
import IAction from "./IAction"

export default class ToggleHelpAction implements IAction {
    key: string = options.toggleHelp

    private isOpen = false

    private readonly shortcuts = {
        h: "Show or hide this help message",
        "+": "Zoom in",
        "-": "Zoom out",
        ",": "16:9 (reset to default Netflix zoom)",
        ".": "21:9",
        c: "Custom zoom (zoom amount can be set in extension options)",
        d: "Disable mouse (prevent mouse movements from showing Netflix player controls)",
        e: "Enable mouse (also works with escape key)",
        q: "Toggle video statistics: FPS (frames per second) and resolution",
        v: "Toggle english subtitles (only Netflix in english or german is supported)",
    }

    execute(videoController: VideoController): void {
        if (!videoController.getHtmlVideo) {
            this.isOpen = false
            return
        }

        if (this.isOpen) {
            this.isOpen = false
            const helpElement = document.querySelector(".bn_help_container")

            if (helpElement) {
                videoController.getHtmlVideo.parentElement.removeChild(
                    helpElement
                )
                return
            }
        }

        const container = document.createElement("div")
        container.classList.add("bn_help_container")

        for (const [shortcut, description] of Object.entries(this.shortcuts)) {
            container.appendChild(
                this.createShortcutElement(shortcut, description)
            )
        }

        videoController.getHtmlVideo.parentElement.appendChild(container)

        this.isOpen = true
    }

    private createShortcutElement(
        shortcut: string,
        description: string
    ): HTMLDivElement {
        const shortcutContainer = document.createElement("div")
        shortcutContainer.classList.add("bn_shortcut_container")

        const shortcutElement = document.createElement("span")
        shortcutElement.classList.add("bn_shortcut")
        shortcutElement.textContent = shortcut

        const descriptionElement = document.createElement("span")
        descriptionElement.textContent = description

        shortcutContainer.appendChild(shortcutElement)
        shortcutContainer.appendChild(descriptionElement)
        return shortcutContainer
    }
}
