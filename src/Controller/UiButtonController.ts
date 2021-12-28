import VideoController from "./VideoController"
import ButtonElement from "../Ui/ButtonElement"
import ContainerElement from "../Ui/ContainerElement"
import { options } from "../Constants/Options"

enum ButtonType {
    ZoomIn = 1,
    ZoomOut = 2,
    ResetZoom = 3,
    FullZoom = 4,
    CustomZoom = 5,
    PictureInPicture = 6,
}

class Button {
    buttonType: ButtonType
    text: string
    title: string
    actionName: string
    isLargeButton: boolean
    hiddenByUser: boolean

    public constructor(
        buttonType: ButtonType,
        text: string,
        title: string,
        actionName = "",
        largeButton = false
    ) {
        this.buttonType = buttonType
        this.text = text
        this.title = title
        this.actionName = actionName
        this.isLargeButton = largeButton
        this.hiddenByUser = this.getOptionByButtonType()
    }

    private getOptionByButtonType(): boolean {
        switch (this.buttonType) {
            case ButtonType.ZoomIn:
                return options.hideZoomInButton
            case ButtonType.ZoomOut:
                return options.hideZoomOutButton
            case ButtonType.ResetZoom:
                return options.hideResetZoomButton
            case ButtonType.FullZoom:
                return options.hideFullZoomButton
            case ButtonType.CustomZoom:
                return !options.showCustomZoomButton
            case ButtonType.PictureInPicture:
                // Firefox does not support the picture in picture API
                return (
                    document.pictureInPictureEnabled === undefined ||
                    !document.pictureInPictureEnabled ||
                    options.hidePictureInPictureButton
                )
        }

        throw new Error("ButtonType '" + this.buttonType + "' out of range")
    }

    public createButtonElement(
        videoController: VideoController
    ): ButtonElement {
        if (this.hiddenByUser || this.actionName === "") return

        const button = new ButtonElement(
            this.text,
            this.title,
            this.isLargeButton
        )
        button.addButtonClickListener(videoController, this.actionName)
        return button
    }
}

class UiButtonController {
    public initButtons(videoController: VideoController): ContainerElement {
        const buttons: Array<ButtonElement> = []

        buttons.push(
            this.createButton(
                videoController,
                ButtonType.ZoomIn,
                "+",
                "Zoom in (Key: +)",
                "zoomIn"
            )
        )

        buttons.push(
            this.createButton(
                videoController,
                ButtonType.ZoomOut,
                "-",
                "Zoom out (Key: -)",
                "zoomOut"
            )
        )

        buttons.push(
            this.createButton(
                videoController,
                ButtonType.ResetZoom,
                "16:9",
                "Reset zoom (Key: ,)",
                "resetZoom",
                true
            )
        )

        buttons.push(
            this.createButton(
                videoController,
                ButtonType.FullZoom,
                "21:9",
                "Zoom to 21:9 (Key: .)",
                "fullZoom",
                true
            )
        )

        buttons.push(
            this.createButton(
                videoController,
                ButtonType.CustomZoom,
                "C",
                "Custom zoom (Key: c)",
                "customZoom"
            )
        )

        buttons.push(
            this.createButton(
                videoController,
                ButtonType.PictureInPicture,
                "◲",
                "Picture in Picture",
                "pictureInPicture"
            )
        )

        return new ContainerElement(
            ...buttons.filter((button) => button !== undefined)
        )
    }

    private createButton(
        videoController: VideoController,
        buttonType: ButtonType,
        text: string,
        title: string,
        actionName: string,
        largeButton = false
    ): ButtonElement {
        const button = new Button(
            buttonType,
            text,
            title,
            actionName,
            largeButton
        )
        return button.createButtonElement(videoController)
    }
}

export default UiButtonController
