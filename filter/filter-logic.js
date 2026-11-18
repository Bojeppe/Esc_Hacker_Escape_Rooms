//Namn och variabler kommer ändras när jag fått tillgång till rumskorten och filterrutan  


//TAGS-KNAPPARNA OCH CHECKBOX
const tagsToggle = document.querySelectorAll('.tags'); 

//Togglar status på taggarna till "active" när man klickar på dem.
tagsToggle.forEach(tagsToggle => {  
  tagsToggle.addEventListener('click', () => {
    tagsToggle.classList.toggle('active');
    });
});

const onlineCheckbox = document.getElementById('onlineCheckbox');
const offlineCheckbox = document.getElementById('offlineCheckbox');
const onlineLabel = document.querySelector('.online');
const offlineLabel = document.querySelector('.offline');

//Togglar status på checklist rutan hos online-challenges till "active" när man klickar på den.
onlineCheckbox.addEventListener('click', () => { 
  onlineLabel.classList.toggle('active', onlineCheckbox.checked);
});

//Togglar status på checklist rutan hos offline-challenges till "active" när man klickar på den.
offlineCheckbox.addEventListener('click', () => { 
  offlineLabel.classList.toggle('active', offlineCheckbox.checked);
});

//STAR-RATING
//Klickar för att ändra antalet stjärnor i rating-filtreringen. 
document.querySelectorAll('.starRatingFrom, .starRatingTo').forEach(group => {
const starRating = group.querySelectorAll('.star-rating');

  starRating.forEach((star, index) => {
    star.addEventListener('click', () => {
      starRating.forEach((pic, starIndex) => {
        const img = pic.querySelector('img');
        const isFull = starIndex <= index; // Fyll alla till och med den klickade

        img.src = isFull ? 'full-star.svg' : 'empty-star.svg';
        img.classList.toggle('full-star', isFull);
        img.classList.toggle('empty-star', !isFull);
      });
    });
  });
});


//SÖKRUTAN
//Lyssnare som uppdaterar sökningen medan användaren skriver
const search = document.querySelector(".textInput");

let debounceTimer;
const debounce = (callback, time) => {
  window.clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(callback, time); 
};
search.addEventListener(
  "input",
  (event) => {
    const query = event.target.value;
    debounce(() => handleSearchPosts(query), 500); //Debouce ger användaren 500ms att skriva innan sidan uppdateras
  },
  false
);

//Gör om all text till små bokstäver, tar bort bindesstreck, mellanslag och kollar att längden är minst 1 bokstav. 
const handleSearchPosts = (query) => {
  const searchQuery = query.trim().toLowerCase().replace('-', '');

// Tom sökning eller för kort sökning = visa alla kort igen
  if (searchQuery.length <= 1) {
    show(challenges);
    return;
  }

//Hämtar data från type, title, description och labels
  const searchResults = challenges.filter(
    (challenge) =>
      challenge.type.toLowerCase().includes(searchQuery) ||
      challenge.title.toLowerCase().includes(searchQuery) ||
      challenge.description.toLowerCase().includes(searchQuery) ||
      challenge.labels.some((label) => label.toLowerCase().includes(searchQuery))
  );

  show(searchResults);
};