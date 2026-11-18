//Namn och variabler kan ändras när jag fått tillgång till HTML sidan. 

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