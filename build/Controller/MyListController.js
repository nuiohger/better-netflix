var MyListController;
(function (MyListController) {
    function randomVideo() {
        if (location.href !== "https://www.netflix.com/browse/my-list")
            return;
        const button = document.createElement("button");
        button.textContent = "Pick random video";
        button.classList.add("bn_btn");
        button.addEventListener("click", () => {
            const allVideos = document.querySelectorAll(".rowContainer .slider-item");
            if (allVideos.length <= 0)
                return;
            const randomContainer = allVideos[Math.floor(Math.random() * allVideos.length + 1) - 1];
            const randomVideo = randomContainer.querySelector("a");
            randomVideo.scrollIntoView({ behavior: "smooth", block: "center" });
            randomContainer.classList.add("bn_border");
        });
        const container = document.createElement("div");
        container.appendChild(button);
        document.querySelector(".sub-header-wrapper").appendChild(container);
    }
    MyListController.randomVideo = randomVideo;
})(MyListController || (MyListController = {}));
export default MyListController;
