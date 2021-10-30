import { options } from "../Constants/Options"

function createScrollEvent(func: EventListener) {
    document
        .querySelector(
            "#appMountPoint > div > div > div.watch-video > div > div"
        )
        .addEventListener("wheel", func, false)
}

function scrollUpDownEvent(upFunc: () => void, downFunc: () => void) {
    createScrollEvent((event: WheelEvent) => {
        if (event.deltaY > 0) downFunc()
        else upFunc()
    })
}

function initListener(videoElement: HTMLVideoElement) {
    function fireKeyboardEvent(keyCode: number) {
        const event = new KeyboardEvent("keydown", {
            bubbles: true,
            cancelable: true,
            keyCode: keyCode,
        } as KeyboardEventInit)
        videoElement.dispatchEvent(event)
    }

    const upFunc = () => fireKeyboardEvent(38) // up arrow
    const downFunc = () => fireKeyboardEvent(40) // down arrow

    scrollUpDownEvent(upFunc, downFunc)
}

function addVolumeScrollListener(videoElement: HTMLVideoElement): void {
    if (!options.volumeMouseWheel) return
    initListener(videoElement)
}

export default addVolumeScrollListener
