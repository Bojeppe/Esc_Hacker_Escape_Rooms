import { getChallenges } from "./api.js";

// gör stjärnorna, fulla först och sedan tomma
export function createStars(rating) {
  const stars = document.createElement("span");
  stars.classList.add("stars");
  stars.setAttribute("aria-label", "Rating: " + rating + " out of 5");

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("img");
    star.alt = "";
    if (i <= Math.round(rating)) {
      star.src = "images/full-star.svg";
    } else {
      star.src = "images/empty-star.svg";
    }
    stars.appendChild(star);
  }
  return stars;
}

// bygger ett kort med samma struktur som i index.html
export function createRoomCard(room) {
  const card = document.createElement("article");
  card.classList.add("room-card");

  const image = document.createElement("img");
  image.classList.add("room-image");
  image.src = room.image;
  image.alt = room.title;

  const info = document.createElement("div");
  info.classList.add("room-info");

  const type = room.type === "onsite" ? "on-site" : room.type;

  const title = document.createElement("h3");
  title.classList.add("room-title");
  title.textContent = room.title + " (" + type + ")";

  const meta = document.createElement("div");
  meta.classList.add("room-meta");

  const participants = document.createElement("span");
  participants.textContent =
    room.minParticipants + "-" + room.maxParticipants + " participants";

  meta.append(createStars(room.rating), participants);

  const text = document.createElement("p");
  text.classList.add("room-text");
  text.textContent = room.description;

  const button = document.createElement("a");
  button.href = "#";
  button.classList.add("btn", "btn-primary", "btn-small");
  button.dataset.challengeId = room.id;
  button.dataset.challengeTitle = room.title;
  button.textContent = "Book this room";

  info.append(title, meta, text, button);
  card.append(image, info);
  return card;
}

// visar alla rum i listan i en container
export function showRooms(list, container) {
  container.innerHTML = "";
  list.forEach(function (room) {
    container.appendChild(createRoomCard(room));
  });
}

// visar de tre med högst rating
export function showTop3(list, container) {
  const sorted = [...list].sort((a, b) => b.rating - a.rating);
  showRooms(sorted.slice(0, 3), container);
}

// hämtar datan och visar topp 3 om sidan har #top-rooms
async function loadTop3() {
  const container = document.querySelector("#top-rooms");
  if (!container) {
    return;
  }
  try {
    const rooms = await getChallenges();
    showTop3(rooms, container);
  } catch (error) {
    container.textContent = error.message;
  }
}

// hämtar datan och visar alla rum om sidan har #all-rooms
async function loadAllRooms() {
  const container = document.querySelector("#all-rooms");
  if (!container) {
    return;
  }
  try {
    const rooms = await getChallenges();
    showRooms(rooms, container);
  } catch (error) {
    container.textContent = error.message;
  }
}

loadTop3();
loadAllRooms();
