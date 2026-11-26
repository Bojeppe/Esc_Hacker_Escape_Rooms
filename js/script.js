import { getAvailableTimes } from "./api.js";

const nav = document.querySelector(".main-nav");
const openBtn = document.querySelector(".menu-toggle");
const closeBtn = document.querySelector(".menu-close");

function openMenu() {
    nav.classList.add("is-open");                   // ÖPPNAR MENYN
    openBtn.setAttribute("aria-expanded", "true");  //sätter aria-expanded TRUE om den är öppen
    document.body.classList.add("scroll-fix");       //  kan inte scrolla
}

function closeMenu() {
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

//Modal JS
const inputDate = document.querySelector("#booking-date");
const searchButton = document.querySelector("#search-times");

let selectedDate = "";
let availableTimes = [];
let challengeId = "";

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-small")) {
        challengeId = event.target.dataset.challengeId;
        document.querySelector("#check-availability-modal").style.display = "block";
        document.querySelector("#modal-background").style.display = "block";

        const roomTitle = event.target.dataset.challengeTitle;
        document.querySelector("#book-room-header").textContent = `Book room "${roomTitle}" (step 1)`;
        console.log(document.querySelector("#book-room-header").textContent);
    }
});


searchButton.addEventListener("click", async () => {
    selectedDate = inputDate.value;

    if (!selectedDate) {
        alert("Please select a date");
        return;
    }
    try {
        availableTimes = await getAvailableTimes(
            challengeId,
            selectedDate
        );
        document.querySelector("#check-availability-modal").style.display = "none";
        document.querySelector(".booking-step-2").style.display = "block";
    } catch (error) {
        alert(error.message);
    }
});

document.querySelector("#modal-background").addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
        document.querySelector("#modal-background").style.display = "none"
        document.querySelector("#check-availability-modal").style.display = "none";
    }
});

// Josefs JS
const bookingForm = document.querySelector(".booking-form");

bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    document.querySelector(".booking-step-2").style.display = "none";
    document.querySelector(".booking-step-3").style.display = "block";
});
