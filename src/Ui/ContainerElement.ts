import UiElement from "./UiElement"

class ContainerElement extends UiElement {
    protected _element: HTMLDivElement

    constructor(...children: UiElement[]) {
        super()
        this._element = document.createElement("div")
        this.addClasses("uiContainer")
        this.addChildren(...children)
    }
}

export default ContainerElement
