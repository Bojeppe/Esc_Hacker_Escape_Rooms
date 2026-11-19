import { getChallenges } from "./api.js";

// gör stjärnorna, fulla först och sedan tomma
export function skapaStjarnor(rating) {
  const stjarnor = document.createElement("span");
  stjarnor.classList.add("stars");
  stjarnor.setAttribute("aria-label", "Rating: " + rating + " out of 5");

  for (let i = 1; i <= 5; i++) {
    const stjarna = document.createElement("img");
    stjarna.alt = "";
    if (i <= Math.round(rating)) {
      stjarna.src = "images/full-star.svg";
    } else {
      stjarna.src = "images/empty-star.svg";
    }
    stjarnor.appendChild(stjarna);
  }
  return stjarnor;
}

// bygger ett kort med samma struktur som i index.html
export function skapaRumskort(rum) {
  const kort = document.createElement("article");
  kort.classList.add("room-card");

  const bild = document.createElement("img");
  bild.classList.add("room-image");
  bild.src = rum.image;
  bild.alt = rum.title;

  const info = document.createElement("div");
  info.classList.add("room-info");

  const typ = rum.type === "onsite" ? "on-site" : rum.type;

  const titel = document.createElement("h3");
  titel.classList.add("room-title");
  titel.textContent = rum.title + " (" + typ + ")";

  const meta = document.createElement("div");
  meta.classList.add("room-meta");

  const deltagare = document.createElement("span");
  deltagare.textContent = rum.minParticipants + "-" + rum.maxParticipants + " participants";

  meta.append(skapaStjarnor(rum.rating), deltagare);

  const text = document.createElement("p");
  text.classList.add("room-text");
  text.textContent = rum.description;

  const knapp = document.createElement("a");
  knapp.href = "#";
  knapp.classList.add("btn", "btn-primary", "btn-small");
  knapp.dataset.challengeId = rum.id;
  knapp.textContent = "Book this room";

  info.append(titel, meta, text, knapp);
  kort.append(bild, info);
  return kort;
}

// visar alla rum i listan i en container
export function visaRum(lista, container) {
  container.innerHTML = "";
  lista.forEach(function (rum) {
    container.appendChild(skapaRumskort(rum));
  });
}

// visar de tre med högst rating
export function visaTopp3(lista, container) {
  const sorterad = [...lista].sort((a, b) => b.rating - a.rating);
  visaRum(sorterad.slice(0, 3), container);
}

// hämtar datan och visar topp 3 om sidan har #top-rooms
async function laddaTopp3() {
  const container = document.querySelector("#top-rooms");
  if (!container) {
    return;
  }
  try {
    const rum = await getChallenges();
    visaTopp3(rum, container);
  } catch (error) {
    container.textContent = error.message;
  }
}

laddaTopp3();
// ritar alla rum på challenge-sidan
async function laddaAllaRum() {
    const container = document.querySelector("#all-rooms");
    if (!container) return;

    try {
        const rum = await getChallenges();
        visaRum(rum, container);
    } catch (error) {
        container.textContent = error.message;
    }
}

laddaAllaRum();