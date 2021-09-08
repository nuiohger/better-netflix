import { ActionFactory, IAction } from "../Controller/ActionController";
import VideoController from "../Controller/VideoController";
import UiElement from "./UiElement";

class ButtonElement extends UiElement {
  protected _element: HTMLDivElement;

  constructor(text: string, title: string, largeButton: boolean = false) {
    super();
    this._element = document.createElement("div");
    this.addClasses("uiContainer");
    this.addButton(text, title, largeButton);
  }

  private addButton(text: string, title: string, largeButton: boolean): void {
    const button: HTMLButtonElement = document.createElement("button");
    button.textContent = text;
    button.classList.add("uiButtons");
    button.title = title;
    if (largeButton) button.classList.add("largeUiButtons");

    this._element.appendChild(button);
  }

  public addButtonClickListener(
    videoController: VideoController,
    actionName: string
  ): void {
    this._element.addEventListener(
      "click",
      (event) => {
        event.stopPropagation();
        const action: IAction = ActionFactory.getAction(actionName);
        action.execute(videoController);
      },
      false
    );
  }
}

export default ButtonElement;
