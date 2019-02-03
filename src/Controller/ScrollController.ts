function createScrollEvent(func: EventListener) {
    addEventListener("wheel", func, false);
}

function scrollUpDownEvent(upFunc: Function, downFunc: Function) {
    createScrollEvent((event: WheelEvent) => {
        if(event.deltaY > 0)
            downFunc();
        else
            upFunc();
    });
}

function addVolumeScrollListener() {
    function fireKeyboardEvent(keyCode: number) {
        const event = new KeyboardEvent("keydown", {bubbles: true, cancelable: true, keyCode: keyCode} as KeyboardEventInit);
        document.querySelector(".center-controls").dispatchEvent(event);
    }

    const upFunc = () => fireKeyboardEvent(38);
    const downFunc = () => fireKeyboardEvent(40);

    scrollUpDownEvent(upFunc, downFunc);
}

export default addVolumeScrollListener;