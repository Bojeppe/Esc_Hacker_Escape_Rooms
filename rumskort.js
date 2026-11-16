// testdata tills API:t är klart
const testRum = [
  {
    title: "Test room 1",
    description: "Beskrivning av rum 1",
    type: "online",
    minParticipants: 2,
    maxParticipants: 6,
    rating: 4.5,
    image: "https://picsum.photos/300/200",
    labels: ["tech", "beginner"]
  },
  {
    title: "Test room 2",
    description: "Beskrivning av rum 2",
    type: "on-site",
    minParticipants: 3,
    maxParticipants: 8,
    rating: 3.8,
    image: "https://picsum.photos/300/201",
    labels: ["web", "hard"]
  },
  {
    title: "Test room 3",
    description: "Beskrivning av rum 3",
    type: "online",
    minParticipants: 1,
    maxParticipants: 4,
    rating: 4.9,
    image: "https://picsum.photos/300/202",
    labels: ["tech", "hard"]
  },
  {
    title: "Test room 4",
    description: "Beskrivning av rum 4",
    type: "on-site",
    minParticipants: 2,
    maxParticipants: 5,
    rating: 2.5,
    image: "https://picsum.photos/300/203",
    labels: ["web"]
  }
];

function skapaRumskort(rum) {
  const kort = document.createElement("article");
  kort.classList.add("room-card");

  const bild = document.createElement("img");
  bild.src = rum.image;
  bild.alt = rum.title;

  const titel = document.createElement("h3");
  titel.textContent = rum.title;

  const beskrivning = document.createElement("p");
  beskrivning.textContent = rum.description;

  const info = document.createElement("p");
  info.textContent = rum.type + ", " + rum.minParticipants + " till " + rum.maxParticipants + " deltagare, rating " + rum.rating;

  const knapp = document.createElement("button");
  knapp.classList.add("book-button");
  knapp.textContent = "Book room";

  kort.append(bild, titel, beskrivning, info, knapp);
  return kort;
}

function visaRum(lista, container) {
  container.innerHTML = "";
  lista.forEach(function (rum) {
    container.appendChild(skapaRumskort(rum));
  });
}

function visaTopp3(lista, container) {
  const sorterad = [...lista].sort((a, b) => b.rating - a.rating);
  visaRum(sorterad.slice(0, 3), container);
}