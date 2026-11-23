import { getChallenges } from "./api.js";
import { createRoomCard, showRooms } from "./rumskort.js";

////Ritar upp Abdels RUMSKORT
const challenges = await getChallenges();
const container = document.querySelector("#all-rooms");

const tagsToggle = document.querySelectorAll('.tags'); 
const onlineCheckbox = document.getElementById('onlineCheckbox');
const offlineCheckbox = document.getElementById('offlineCheckbox');
const onlineLabel = document.querySelector('.online');
const offlineLabel = document.querySelector('.offline');

//Togglar status på TAGGARNA till "active" när man klickar på dem.
tagsToggle.forEach((tag) => {
  tag.addEventListener('click', () => {
    tag.classList.toggle('active');
    challengeFilters();
  });
}); 

//Togglar status på CHECKLIST rutan hos online/offline-challenges till "active" när man klickar på den.
onlineCheckbox.addEventListener('click', () => {
  onlineLabel.classList.toggle('active', onlineCheckbox.checked);
  challengeFilters();
});

offlineCheckbox.addEventListener('click', () => {
  offlineLabel.classList.toggle('active', offlineCheckbox.checked);
  challengeFilters();
});

//Klickar för att ändra antalet stjärnor i STAR-RATING filtreringen. 
function fillStars(group, value) {
  group.querySelectorAll('.star-rating').forEach((pic, index) => {
    const img = pic.querySelector('img');
    const isFull = index < value;
    img.src = isFull ? 'images/full-star.svg' : 'images/empty-star.svg';
    img.classList.toggle('full-star', isFull);
    img.classList.toggle('empty-star', !isFull);
  });
}

const ratingFrom = document.querySelector('.starRatingFrom');
const ratingTo = document.querySelector('.starRatingTo');

//Kör de två olika STAR-RATING grupperna i varsin array.
[ratingFrom, ratingTo].forEach((group) => {  
  const rating = group === ratingFrom; //Gruppen jämförs med "från" ratingen.

//Stjärnorna markeras fram till det index man klickat på. 
  group.querySelectorAll('.star-rating').forEach((star, index) => { 
    star.addEventListener('click', () => {
      const value = index + 1;

//Värdet av antal stjärnor jämförs mellan de två grupperna "från" och "till". 
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
  searchQuery = query.trim().toLowerCase().replace('-', '');
  challengeFilters();
};

//Samlar allt i FILTER FUNKTIONEN som kan KALLAS för varje moment. 
let minRating = 1;
let maxRating = 5;
let searchQuery = "";  

function challengeFilters() {

//Visar endast resultatet av det som filtrerats.
  const result = challenges.filter((challenge) => {

//Skapar en array med innehållet från alla knappar som är aktiva.
  const activeTags = [...document.querySelectorAll('.tags.active')]
    .map((tag) => tag.textContent.trim().toLowerCase()); //Gör om all text till små bokstäver, tar bort mellanslag.  

//Variabel när checkboxarna är ibockade.
  const showOnline = onlineCheckbox.checked;
  const showOffline = offlineCheckbox.checked;


  const typeFilter =
  (!showOnline && !showOffline) || //SANT om ingen av checkboxarna är ikryssad.
  (showOnline && challenge.type === 'online') || //SANT om endast online-checkboxen är ikryssad och typen är online.
  (showOffline && challenge.type === 'onsite'); //SANT om endast offline-checkboxen är ikryssad och typen är offline.

//Kontroll av TAGGARNA.
  const tagsFilter =
    activeTags.length === 0 ||
    challenge.labels.some((label) =>
      activeTags.some((search) => label.toLowerCase().includes(search))
    );

//Kontroll av STAR-RATING.
  const rating = Math.round(Number(challenge.rating) || 0); //Gör om till heltal. Saknas det betyg försvinner inte alla korten ur listan. 
  const ratingFilter = (minRating === 1 && maxRating === 5) || (rating >= minRating && rating <= maxRating); //Startvärdet är 1 och 5. Ratingen måste ligga inom intervallet.
    
//Kontroll av SÖKRUTAN, söker mot type, title, description och labels.
  const searchFilter =
    searchQuery.length <= 1 || //Längd måste vara minst 1 bokstav.
    challenge.type.toLowerCase().includes(searchQuery) || 
    challenge.title.toLowerCase().includes(searchQuery) || 
    challenge.description.toLowerCase().includes(searchQuery) ||
    challenge.labels.some((label) => label.toLowerCase().includes(searchQuery));

    return typeFilter && tagsFilter && ratingFilter && searchFilter;
  });

//Om det inte finns något resultat, skapas ett felmeddelande.
if (result.length === 0) {
  const message = document.createElement('p');
  message.className = 'no-match';
  message.textContent = 'No matching challenges';
  container.replaceChildren(message);
} else {
  showRooms(result, container);
}
}