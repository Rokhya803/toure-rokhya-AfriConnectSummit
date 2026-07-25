const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".linknav");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});