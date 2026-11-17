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

//Togglar status på checklist rutan för online-challenges till "active" när man klickar på den.
onlineCheckbox.addEventListener('click', () => { 
  onlineLabel.classList.toggle('active', onlineCheckbox.checked);
});

//Togglar status på checklist rutan för offline-challenges till "active" när man klickar på den.
offlineCheckbox.addEventListener('click', () => { 
  offlineLabel.classList.toggle('active', offlineCheckbox.checked);
});
