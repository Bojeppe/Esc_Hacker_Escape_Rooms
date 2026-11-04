const nav = document.querySelector(".main-nav");
const openBtn = document.querySelector(".menu-toggle");
const closeBtn = document.querySelector(".menu-close");

function openMenu(){
    nav.classList.add("is-open");                   // ÖPPNAR MENYN
    openBtn.setAttribute("aria-expanded", "true");  //sätter aria-expanded TRUE om den är öppen
}

function closeMenu(){
    nav.classList.remove("is-open");                // STÄNGER MENYN
    openBtn.setAttribute("aria-expanded", "false"); // Sätter den till false om den är STÄNGD
}

//Klickar du på hamburge menyn så öppnas MENYN
openBtn.addEventListener(
    "click",
    openMenu
);
// Klickar du på X så stängs den
closeBtn.addEventListener(
    "click",
    closeMenu
);