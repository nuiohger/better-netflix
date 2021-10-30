import UiElement from "./UiElement"

class TooltipElement extends UiElement {
    protected _element: HTMLDivElement

    constructor(parent: UiElement, ...children: HTMLDivElement[]) {
        super()
        this._element = document.createElement("div")
        this.addClasses("tooltip")
        this.hide()
        this.addHtmlChildren(...children)
        parent.addChildren(this)
        this.initTooltip(parent)
    }

    private initTooltip(parent: UiElement): void {
        parent.addEventListener("mouseenter", () => {
            this.show()
        })

        parent.addEventListener("mouseleave", () => {
            setTimeout(() => {
                if (parent.parent.querySelector(":hover") !== parent.element) {
                    this.hide()
                }
            }, 1000)
        })
    }

    public addChildEventListener(event: string, listener: EventListener): void {
        this._element.childNodes.forEach((child) =>
            child.addEventListener(event, listener, false)
        )
    }

    public selectTooltipChild(child: HTMLElement): void {
        this._element.childNodes.forEach((element) =>
            (element as HTMLElement).classList.remove("tooltipChildSelected")
        )
        child.classList.add("tooltipChildSelected")
    }
}

export default TooltipElement
