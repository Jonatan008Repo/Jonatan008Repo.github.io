/** Gestión del banner de cookies */
const cookieContainer = document.querySelector(".cookie-container");
const cookieButton = document.querySelector(".buttons .item");

window.addEventListener("DOMContentLoaded", () => {
	if (!localStorage.getItem("cookieBannerDisplayed")) {
		cookieContainer.classList.add("active");
	}
});

cookieButton.addEventListener("click", () => {
	localStorage.setItem("cookieBannerDisplayed", "true");
	cookieContainer.classList.remove("active");
});
