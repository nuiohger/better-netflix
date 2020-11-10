module MyListController {
    const btnClass = "bn_btn";

    export function randomVideo(): void {
        if (location.href !== "https://www.netflix.com/browse/my-list" || document.querySelector(`.${btnClass}`)) return;

        const button = document.createElement("button");
        button.textContent = "Pick random video";
        button.classList.add(btnClass);
        button.addEventListener("click", () => {
            const allVideos: NodeListOf<HTMLElement> = document.querySelectorAll(".rowContainer .slider-item");
            if (allVideos.length <= 0) return;

            const randomContainer: HTMLElement = allVideos[Math.floor(Math.random() * allVideos.length + 1) - 1];
            const randomVideo: HTMLElement = randomContainer.querySelector("a");
            randomVideo.scrollIntoView({ behavior: "smooth", block: "center" });
            randomContainer.classList.add("bn_border");
        });

        const container = document.createElement("div");
        container.appendChild(button);

        document.querySelector(".sub-header-wrapper").appendChild(container);
    }
}

export default MyListController;
