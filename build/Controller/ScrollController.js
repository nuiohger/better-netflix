function createScrollEvent(func) {
    addEventListener("wheel", func, false);
}
function scrollUpDownEvent(upFunc, downFunc) {
    createScrollEvent((event) => {
        if (event.deltaY > 0)
            downFunc();
        else
            upFunc();
    });
}
function addVolumeScrollListener() {
    function fireKeyboardEvent(keyCode) {
        const event = new KeyboardEvent("keydown", { bubbles: true, cancelable: true, keyCode: keyCode });
        document.querySelector(".center-controls").dispatchEvent(event);
    }
    const upFunc = () => fireKeyboardEvent(38);
    const downFunc = () => fireKeyboardEvent(40);
    scrollUpDownEvent(upFunc, downFunc);
}
export default addVolumeScrollListener;
