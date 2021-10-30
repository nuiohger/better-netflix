abstract class UiElement {
    protected abstract _element: HTMLElement

    public get element(): HTMLElement {
        return this._element
    }

    public get parent(): HTMLElement {
        return this._element.parentElement
    }

    public addClasses(...classes: string[]): void {
        this._element.classList.add(...classes)
    }

    public removeClasses(...classes: string[]): void {
        this._element.classList.remove(...classes)
    }

    public containsAnyClass(...classes: string[]): boolean {
        return classes.some((c) => this._element.classList.contains(c))
    }

    public hide(): void {
        if (!this.containsAnyClass("hidden")) this.addClasses("hidden")
    }

    public show(): void {
        if (this.containsAnyClass("hidden")) this.removeClasses("hidden")
    }

    public addChildren(...children: UiElement[]): void {
        children.forEach((child) => this._element.appendChild(child.element))
    }

    public addHtmlChildren(...children: HTMLElement[]): void {
        children.forEach((child) => this._element.appendChild(child))
    }

    public addEventListener(event: string, listener: EventListener): void {
        this._element.addEventListener(event, listener, false)
    }
}

export default UiElement
