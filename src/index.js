window.addEventListener("scroll", function () {
    const categoriesWrapper = document.querySelector(".categories-wrapper");
    const titleHeader = document.querySelector(".title-header");

    const offset = titleHeader.getBoundingClientRect().bottom;

    if (offset <= 160) {
        categoriesWrapper.classList.add("sticky");
    } else {
        categoriesWrapper.classList.remove("sticky");
    }
});