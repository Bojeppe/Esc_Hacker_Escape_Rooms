
// Den här filen ska prata med APin + Funktioner som alla andra kan importera + Så dom slipper FETCHA ALLT SJÄLV

const BASE_URL = "https://lernia-sjj-assignments.vercel.app/api";                   // Själva APIn
let cachedChallenges =null;

async function fetchJson(path, options){                                          // path = väg och options = alternativ. Så T.ex /api/booking/available-times. Då blir path = booking och options = available-times

    let response;
    
    try{
        response = await fetch(BASE_URL + path, options);                           // här blir det att vi hämtar BASE APIn och kollar väg + alternativ. FUNKAR INTE DET = ERROR
    } catch (error){
        //fetch kastar ett fel när servern inte går att nå t.ex om du inte har nå internet, servern är nere.
        throw new Error("Could not reach the Server. Check your internet connection.");             
    }

    let data;
    try{
        data= await response.json();
    } catch (error){
        throw new Error("The Server sent a response we could not read.");     
    }

    //APIn skickar ett objekt med felinfo. Är TRUE vid koder som 200. 2XX =  ALLT GICK BRA, FALSE vid fel som 400-500. 4XX = Klientfel(mitt fel), felaktig data/format i requesten, resursen finns inte, för många anrop osv. 5XX = Serverfel
    if(!response.ok){
        throw new Error(data.message || data.error || "Request Failed ("+ response.status +")");
    }

    return data;
}


// HÄMTAR alla Challenges. Sparas så att APIn inte anropas flera gånger. ANROPAS EN GÅNG PER SIDOLADNING
export async function getChallenges() {
    //Om datan redan finns i chachen/sparat = retunera på direkten, hoppar över anropet
    if(cachedChallenges){
        return cachedChallenges;
    }

    const data= await fetchJson("/challenges");             // Hämtar JSON ifrån APIn med endpointen /challenges 

    // kollar så svaret faktiskt innehåller en array, för gör den inte det! Så är det nå fel
    if(!Array.isArray(data.challenges)){
        throw new Error("Unexpected data from THE SERVER.");
    }

    cachedChallenges = data.challenges.map(function (challenge){
        return{
            ...challenge,                                                           // KOPIERAR ALLA FÄLT = tre punkterna = spread opereator
            labels:[...new Set (challenge.labels)]                                  // BEHÖVS EGENTLIGEN INTE - men den tar bort dups/dubbletter i etikerterna... tror det kan hjälpa? nån annan i gruppen ifall dom håller på
        };
    });

    return cachedChallenges;
}


// Hjälp funktion som ser till att DATUM är RÄTT och inte gör så att 9999-99-99 är ett accepterbart datum - Löser inget... bara jag som vill att det ska vara ordentligt och rätt...
function isValidDate(text){
    // är den rätt form YYYY-MM-DD ? - KOLLAR DET
    if(!/^\d{4}-\d{2}-\d{2}$/.test(text)){
        return false;
    }
    // delar upp "2026-12-11" i delar och gör om de till TAL
    const[year, month, day] = text.split("-").map(Number);

    // bygger ett RIKTIGT DATUM, står - 1 på månader för tydligen så räknas månader ifrån 0 i javascript.
    const date= new Date(Date.UTC(year, month - 1, day)); 

    // räknar om ogiltiga datum
    return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}


// Ger en lista på lediga tider t.ex som ["11:00", "12:10", "14:30" ]
export async function getAvailableTimes(challengeId, date) {
    
    if(!challengeId){
        throw new Error("a challenge must be selected. Please select a challenge.");
    }

    //datumet MÅSTE vara YYYY-MM-DD (<input type="date"> ger de) 
    if(!isValidDate(date)){                                           
        throw new Error("Date must be a real DATE written as YYYY-MM-DD.");
    }


    const query = new URLSearchParams({date: date, challenge: challengeId});                // Gör så vi får den där biten EFTER ? på URLn "date=2022-12-12&challenge=3"
    const data= await fetchJson("/booking/available-times?" + query);                       // kontaktar Json som fetchar ifrån /booking/available-times? + date + challengeID

    return [... new Set(data.slots)];                                                       // Returnar data.slot = listan med tider - har en [... new Set()] pågrund utav dubbleketter på tider = tar bort dubbla tider  
}


// skickar in en bokning. TAR emot ett objekt: {challenge, name, email, date, time, participants}
export async function createReservation(booking){

    // Enkel namn check ifall namn har något i sig annars error. BLANKT = ERROR
    if(!booking.name || !booking.name.trim()){
        throw new Error("Please enter your name.");
    }

    // Enkel kontrol så att email adressen ska ha formatet = nånting@nånting.nånting  simpel as that. a@b.c går igenom. Tror ingen mer in depth check behövs. 
    if(!/^\S+@\S+\.\S+$/.test(booking.email)){
        throw new Error("Please enter a valid email address.");
    }

    const data= await fetchJson("/booking/reservations",{

        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({
            challenge: Number(booking.challenge),
            name: booking.name,
            email: booking.email,
            date:  booking.date,
            time: booking.time,
            participants:  Number(booking.participants)
        })

    });

    if(data.status !== "ok"){
        throw new Error("The booking could not be completed.");
    }

    return data.booking;
}