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

//Modal JS
const inputDate = document.querySelector("#booking-date");
const searchButton = document.querySelector("#search-times");

let selectedDate = "";
let availableTimes = [];
let challengeId = 3; // temporärt
searchButton.addEventListener("click", async () => {
    selectedDate = inputDate.value;

    if (!selectedDate) {
        alert("Please select a date");
        return;
    }
    availableTimes = await getAvailableTimes(
        selectedDate,
        challengeId
    );
    console.log(availableTimes);
    document.querySelector("#check-availability-modal").style.opacity = 0;
});

async function getAvailableTimes(date, challengeId) {
    const response = await fetch(
        `https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=${date}&challenge=${challengeId}`
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error);
    }
    return data.slots;
}