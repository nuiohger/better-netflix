import { options } from "../Constants/Options";

function createScrollEvent(func: EventListener) {
  document.body.addEventListener("wheel", func, false);
}

function scrollUpDownEvent(upFunc: Function, downFunc: Function) {
  createScrollEvent((event: WheelEvent) => {
    if (event.deltaY > 0) downFunc();
    else upFunc();
  });
}

function initListener() {
  function fireKeyboardEvent(keyCode: number) {
    const event = new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: true,
      keyCode: keyCode,
    } as KeyboardEventInit);
    document.querySelector("video").dispatchEvent(event);
  }

  const upFunc = () => fireKeyboardEvent(38); // up arrow
  const downFunc = () => fireKeyboardEvent(40); // down arrow

  scrollUpDownEvent(upFunc, downFunc);
}

function addVolumeScrollListener() {
  if (!options.volumeMouseWheel) return;
  initListener();
}

export default addVolumeScrollListener;
