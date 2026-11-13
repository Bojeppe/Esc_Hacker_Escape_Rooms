
// Den här filen ska prata med APin + Funktioner som alla andra kan importera

const BASE_URL = "https://lernia-sjj-assignments.vercel.app/api";                   // Själva APIn
let cachedChallenges =null;

async function fetchJson(path, options){                                          // path = väg och options = alternativ. Så T.ex /api/booking/available-times. Då blir path = booking och options = available-times

    let response;
    
    try{
        response = await fetch(BASE_URL + path, options);                           // här blir det att vi hämtar BASE APIn och kollar väg + alternativ. FUNKAR INTE DET = ERROR
    } catch (error){
        //fetch kastar ett fel när servern inte går att nå t.ex om du inte har nå internet, servern är nere.
        throw new Error("kunde inte nå servern. Ditt internet suger");              // ÄNDRA VAD SOM STÅR endast för testning
    }

    let data;
    try{
        data= await response.json();
    } catch (error){
        throw new Error("Servern skickade en response som vi inte kunde läsa");     //ÄNDRA TEXTEN ENDAST FÖR TEST
    }

    //APIn skickar ett objekt med felinfo. Är TRUE vid koder som 200. 2XX =  ALLT GICK BRA, FALSE vid fel som 400-500. 4XX = Klientfel(mitt fel), felaktig data/format i requesten, resursen finns inte, för många anrop osv. 5XX = Serverfel
    if(!response.ok){
        throw new Error(data.message || data.error || "Request Failed ("+ response.status +")");
    }

    return data;
}


// HÄMTAR alla Challenges. Sparas så att APIn inte anropas flera gånger. ANROPAS EN GÅNG PER SIDOLADNING
export async function getChallenges() {
    
}



// Ger en lista på lediga tider t.ex som ["11:00", "12:10", "14:30" ]
export async function getAvailableTimes(challengeId, date) {
    
}




// skickar in en bokning. TAR emot ett objekt: {challenge, name, email, date, time, participants}
export async function createReservation(){

}






