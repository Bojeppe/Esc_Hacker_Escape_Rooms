//Namn och variabler kommer ändras när jag fått tillgång till rumskorten och filterrutan  


//TAGS-KNAPPARNA OCH CHECKBOX
const tagsToggle = document.querySelectorAll('.tags'); //
const onlineCheckbox = document.getElementById('onlineCheckbox');
const offlineCheckbox = document.getElementById('offlineCheckbox');
const onlineLabel = document.querySelector('.online');
const offlineLabel = document.querySelector('.offline');

//Skapar en array med innehållet från alla knappar som är aktiva.
function challengeFilters() { 
  const activeTags = [...document.querySelectorAll('.tags.active')] 
    .map((tags) => tags.textContent.trim().toLowerCase()); //Gör om all text till små bokstäver, tar bort mellanslag.  

    const showOnline = onlineCheckbox.checked;
    const showOffline = offlineCheckbox.checked;

    //Går igenom challenges och skapar en ny lista med de som är isChecked eller isTagged som visas i det slutliga resultatet.
    const result = challenges.filter((challenge) => {
    const type = challenge.type.toLowerCase();

    //Kontroll av checkboxarna
    const isChecked =
      (!showOnline && !showOffline) || //Sant om ingen av checkboxarna är ikryssad.
      (showOnline && type.includes('online')) || //Sant om online-checkboxen är ikryssad och typen är online.
      (showOffline && type.includes('onsite'));//Sant om offline-checkboxen är ikryssad och typen är offline.

    //Kontroll av taggarna
    const isTagged =
      activeTags.length === 0 || //Om ingen tagg är aktiva, visa alla utmaningar.
      challenge.labels.some((label) =>
        activeTags.some((search) => label.toLowerCase().includes(search))//Sant om en eller flera av taggarna är aktiva. 
      );
  
    return isChecked && isTagged;
  });

  show(result);
}

//Togglar status på taggarna till "active" när man klickar på dem.
tagsToggle.forEach((tag) => {
  tag.addEventListener('click', () => {
    tag.classList.toggle('active');
    challengeFilters();
  });
});

//Togglar status på checklist rutan hos online-challenges till "active" när man klickar på den.
onlineCheckbox.addEventListener('click', () => {
  onlineLabel.classList.toggle('active', onlineCheckbox.checked);
  challengeFilters();
});

//Togglar status på checklist rutan hos offline-challenges till "active" när man klickar på den.
offlineCheckbox.addEventListener('click', () => {
  offlineLabel.classList.toggle('active', offlineCheckbox.checked);
  challengeFilters();
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