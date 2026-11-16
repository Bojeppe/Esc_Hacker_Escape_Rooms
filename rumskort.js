// testdata tills API är klar
const testRum = [
  {
    title: "Test room 1",
    description: "Beskrivning av rum 1",
    type: "online",
    minParticipants: 2,
    maxParticipants: 6,
    rating: 4,
    image: "images/hackerman-mobil.png",
    labels: ["tech", "beginner"]
  },
  {
    title: "Test room 2",
    description: "Beskrivning av rum 2",
    type: "on-site",
    minParticipants: 3,
    maxParticipants: 8,
    rating: 3,
    image: "images/hackerman-mobil.png",
    labels: ["web", "hard"]
  },
  {
    title: "Test room 3",
    description: "Beskrivning av rum 3",
    type: "online",
    minParticipants: 1,
    maxParticipants: 4,
    rating: 5,
    image: "images/hackerman-mobil.png",
    labels: ["tech", "hard"]
  },
  {
    title: "Test room 4",
    description: "Beskrivning av rum 4",
    type: "on-site",
    minParticipants: 2,
    maxParticipants: 5,
    rating: 2,
    image: "images/hackerman-mobil.png",
    labels: ["web"]
  }
];

// bygger stjärnorna, fulla först och sedan tomma
function skapaStjarnor(rating) {
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
function skapaRumskort(rum) {
  const kort = document.createElement("article");
  kort.classList.add("room-card");

  const bild = document.createElement("img");
  bild.classList.add("room-image");
  bild.src = rum.image;
  bild.alt = rum.title;

  const info = document.createElement("div");
  info.classList.add("room-info");

  const titel = document.createElement("h3");
  titel.classList.add("room-title");
  titel.textContent = rum.title + " (" + rum.type + ")";

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
  knapp.textContent = "Book this room";

  info.append(titel, meta, text, knapp);
  kort.append(bild, info);
  return kort;
}

// visar alla rum i listan i en container
function visaRum(lista, container) {
  container.innerHTML = "";
  lista.forEach(function (rum) {
    container.appendChild(skapaRumskort(rum));
  });
}

// visar de tre med högst rating
function visaTopp3(lista, container) {
  const sorterad = [...lista].sort((a, b) => b.rating - a.rating);
  visaRum(sorterad.slice(0, 3), container);
}