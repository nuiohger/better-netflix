import UserOptionsModel from "../Model/UserOptionsModel";
function createScrollEvent(func) {
    document.querySelector(".center-controls").addEventListener("wheel", func, false);
}
function scrollUpDownEvent(upFunc, downFunc) {
    createScrollEvent((event) => {
        if (event.deltaY > 0)
            downFunc();
        else
            upFunc();
    });
}
function initListener() {
    function fireKeyboardEvent(keyCode) {
        const event = new KeyboardEvent("keydown", { bubbles: true, cancelable: true, keyCode: keyCode });
        document.querySelector(".center-controls").dispatchEvent(event);
    }
    const upFunc = () => fireKeyboardEvent(38);
    const downFunc = () => fireKeyboardEvent(40);
    scrollUpDownEvent(upFunc, downFunc);
}
function addVolumeScrollListener() {
    UserOptionsModel.callWithOptions(options => {
        if (!options.volumeMouseWheel)
            return;
        initListener();
    });
}
export default addVolumeScrollListener;
