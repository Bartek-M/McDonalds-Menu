const categoriesWrapper = document.querySelector(".categories-wrapper");
const titleHeader = document.querySelector(".title-header");
const navBack = document.querySelector(".nav-back")

const titles = document.querySelectorAll(".items-wrapper");
const buttons = document.querySelectorAll(".categories button");

function scrollToActiveButton(activeButton) {
    let wrapperRect = categoriesWrapper.getBoundingClientRect();
    let buttonRect = activeButton.getBoundingClientRect();

    if (buttonRect.left < wrapperRect.left || buttonRect.right > wrapperRect.right) {
        categoriesWrapper.scrollBy({
            left: buttonRect.left - wrapperRect.left - (wrapperRect.width / 2) + (buttonRect.width / 2),
            behavior: "smooth"
        });
    }
}

window.addEventListener("scroll", () => {
    let offset = titleHeader.getBoundingClientRect().bottom;

    if (offset <= 160) {
        categoriesWrapper.classList.add("sticky");
        navBack.classList.add("sticky")
    } else {
        categoriesWrapper.classList.remove("sticky");
        navBack.classList.remove("sticky")
    }

    let observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            let title = entry.target;
            let button = document.querySelector(`.categories button[id="for-${title.id}"]`);

            let titleRect = title.getBoundingClientRect();
            let middleOfViewport = window.innerHeight / 2;

            if (titleRect.top < middleOfViewport + 50 && titleRect.bottom > middleOfViewport - 50) {
                buttons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
                scrollToActiveButton(button);
            }
        });
    }, {
        threshold: 0.5
    });

    titles.forEach(title => observer.observe(title));
})

const margin = 300;

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const targetId = btn.id.slice(4);
        const targetCategory = document.getElementById(targetId);

        if (targetCategory) {
            window.scrollTo({
                top: targetCategory.offsetTop - margin,
                behavior: "smooth",
            });
        }
    });
});