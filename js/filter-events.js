import { getChallenges } from "./api.js";
import { showRooms } from "./rumskort.js";
import { filterChallenges, getActiveTags } from "./filter-logic.js";

let minRating = 1;
let maxRating = 5;
let searchQuery = "";

//Ritar upp Abdels RUMSKORT
const challenges = await getChallenges();
const container = document.querySelector("#all-rooms");
showRooms(challenges, container);

//Togglar status på TAGGARNA till "active" när man klickar på dem.
const tagsToggle = document.querySelectorAll(".tags"); 

tagsToggle.forEach((tag) => { 
  tag.addEventListener("click", () => {
    tag.classList.toggle("active");
    challengeFilters();
  });
}); 

//Togglar status på CHECKLIST rutan hos online/offline-challenges till "active" när man klickar på den.
const onlineCheckbox = document.getElementById("onlineCheckbox");
const offlineCheckbox = document.getElementById("offlineCheckbox");
const onlineLabel = document.querySelector(".online");
const offlineLabel = document.querySelector(".offline");

onlineCheckbox.addEventListener("click", () => {
  onlineLabel.classList.toggle("active", onlineCheckbox.checked);
  challengeFilters();
});

offlineCheckbox.addEventListener("click", () => {
  offlineLabel.classList.toggle("active", offlineCheckbox.checked);
  challengeFilters();
});

//Klickar för att ändra antalet stjärnor i STAR-RATING filtreringen. 
function fillStars(group, value) {
  group.querySelectorAll(".star-rating").forEach((pic, index) => {
    const img = pic.querySelector("img");
    const isFull = index < value;
    img.src = isFull ? "images/full-star.svg" : "images/empty-star.svg";
    img.classList.toggle("full-star", isFull);
    img.classList.toggle("empty-star", !isFull);
  });
}

const ratingFrom = document.querySelector(".min-rating");
const ratingTo = document.querySelector(".max-rating");

//Kör de två olika STAR-RATING grupperna i varsin array.
[ratingFrom, ratingTo].forEach((group) => {  
  const rating = group === ratingFrom; //Gruppen jämförs med "from" ratingen.

//Stjärnorna markeras fram till det index man klickat på. 
  group.querySelectorAll(".star-rating").forEach((star, index) => { 
    star.addEventListener("click", () => {
      const value = index + 1;

//Värdet av antal stjärnor jämförs mellan de två grupperna "from" och "to". 
      if (rating) {
        minRating = value;
        if (maxRating < value) maxRating = value; //Om max är mindre än min, ändras min-värdet till samma som max.
      } else {
        maxRating = value;
        if (minRating > value) minRating = value; //Om min är större än max, ändras max-värdet till samma som min.
      }

//STAR-RATING fylls i efter antal markerade stjärnor i förhållande till max och min.
      fillStars(ratingFrom, minRating);
      fillStars(ratingTo, maxRating);
      challengeFilters();
    });
  });
});

//Lyssnare som uppdaterar SÖKRUTAN medan användaren skriver input.
const search = document.querySelector(".textInput");

//Debouce ger användaren 500ms att skriva innan sidan uppdateras.
let debounceTimer;
const debounce = (callback, time) => {
  window.clearTimeout(debounceTimer); 
  debounceTimer = window.setTimeout(callback, time); 
};
search.addEventListener(
  "input",
  (event) => {
    const query = event.target.value;
    debounce(() => handleSearchPosts(query), 500); 
  },
  false
);

//Gör om all text användaren skriver i SÖKRUTAN till små bokstäver, tar bort bindesstreck, mellanslag och kollar att längden är minst 1 bokstav. 
const handleSearchPosts = (query) => {
  searchQuery = query.trim().toLowerCase().replace("-", "").replace("on site", "onsite");
  challengeFilters();
};


//Kallar på funktionerna i filen "filter-logic"
function challengeFilters() {
  const result = filterChallenges(challenges, {
  activeTags: getActiveTags(document),
  showOnline: onlineCheckbox.checked,
  showOffline: offlineCheckbox.checked,
  minRating,
  maxRating,
  searchQuery,
  });

  //Om det inte finns något resultat, skapas ett felmeddelande.
  if (result.length === 0) {
    const message = document.createElement("p");
    message.className = "no-match";
    message.textContent = "No matching challenges";
    message.style.fontSize = "30px";
    message.style.textAlign ="center";
    message.style.margin ="40px auto";
    message.style.color ="#302f2f";
    message.style.marginTop ="90px";

    container.replaceChildren(message);
  } else {
    showRooms(result, container);
  }
}

//Lägger till filter om användaren trycker på "online/offline challenges" på hemsidan. 
applyCheckboxFormat();

//MARWAS öppna & stäng funktion för filter rutan
console.log("filter-logic.js is running");
const filterToggle = document.querySelector('#filter-toggle');  // hittar kanpparna i html //
const filterPanel = document.querySelector('#filter-panel');   // hittar filter section i html //
console.log("button:", filterToggle);
console.log("panel:", filterPanel);
console.log("button:", filterToggle);  // detta är för att kolla om knappen hittas i console //
console.log("panel:", filterPanel); // detta är för att kolla om filter section hittas i console //

filterToggle.addEventListener('click', function() {  // när man klickar på knappen //
    filterPanel.hidden = !filterPanel.hidden;  // ändrar statusen på filter panelen //
    filterToggle.setAttribute('aria-expanded', String(!filterPanel.hidden));  // ändrar statusen på knappen //
    console.log("Panel hidden:", filterPanel.hidden);
});

