
//Separerar alla queryselectors för att koden ska kunna testas.  
export function filterChallenges(
  challenges,
  { activeTags, showOnline, showOffline, minRating, maxRating, searchQuery }
){
return challenges.filter((challenge) => {

  const typeFilter =
  (!showOnline && !showOffline) || //SANT om ingen av checkboxarna är ikryssad.
  (showOnline && challenge.type === "online") || //SANT om endast online-checkboxen är ikryssad och typen är online.
  (showOffline && challenge.type === "onsite"); //SANT om endast offline-checkboxen är ikryssad och typen är offline.

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
}

//Egen funktion som returnerar en lista med texten från alla aktiva taggknappar. 
export function getActiveTags() {
  return [...document.querySelectorAll(".tags.active")].map((tag) =>
    tag.textContent.trim().toLowerCase()
  );
}