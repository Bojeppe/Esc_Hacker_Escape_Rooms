const nav = document.querySelector(".main-nav");
const openBtn = document.querySelector(".menu-toggle");
const closeBtn = document.querySelector(".menu-close");

function openMenu(){
    nav.classList.add("is-open");                   // ÖPPNAR MENYN
    openBtn.setAttribute("aria-expanded", "true");  //sätter aria-expanded TRUE om den är öppen
    document.body.classList.add("scroll-fix");       //  kan inte scrolla
}

function closeMenu(){
    nav.classList.remove("is-open");                // STÄNGER MENYN
    openBtn.setAttribute("aria-expanded", "false"); // Sätter den till false om den är STÄNGD
    document.body.classList.remove("scroll-fix");    // tar bort scroll så man kan scrolla när menyn är stängd
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