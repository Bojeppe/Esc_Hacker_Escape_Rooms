// JEST TEST FÖR APIn tänkt ungefär ETT test per funktion mer eller mindre
import {expect, jest} from "@jest/globals";
import {getChallenges, getAvailableTimes, createReservation} from "../js/api.js"


// 15 sekunder 
jest.setTimeout(15000);

function futureDate(days){
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);  // "YYYY-MM-DD" basically
}
// KOLLAR SÅ getChallenge Funktionen ger ett läsbart fel när servern inte går att nå
test("getChallenges hämtar challenges och labels har INGA dubbletter", async () =>{
    const challenges= await getChallenges();
    
    expect(Array.isArray(challenges)).toBe(true);
    expect(challenges.length).toBeGreaterThan(0);

    challenges.forEach(challenge => {
         expect(typeof challenge.id).toBe("number");
        expect(typeof challenge.title).toBe("string");
        // ett SET tar bort dubbletter = längden ska vara lika om det inte finns några
        expect(new Set(challenge.labels).size).toBe(challenge.labels.length);
    });
});

// KOLLAR SÅ att getAvailableTimes funktionen nekar ogiltiga tider
test("getAvailableTimes nekar ogiltigt datum", async () =>{
    //test kast basically
    await expect(getAvailableTimes(3, "9999-99-99")).rejects.toThrow(/real date/i);
});

// INGA DUBBLETTER
test("getAvailableTimes ger lediga tider på formatet HH:MM UTAN DUBBLETTER", async() =>{
    const times = await getAvailableTimes(3, futureDate(30));

    expect(times.length).toBeGreaterThan(0);

    times.forEach((time) =>{
        expect(time).toMatch(/^\d{2}:\d{2}$/);          //formatet HH:MM fast det blir bara att den kollar att den har XX:XX
    });
    expect(new Set(times).size).toBe(times.length);
});


// createReservation Funktionen lär ju kolla så den nekar ogiltiga emails och sen en till check om den skickar en POST med rätt DATA
test("createReservation nekar ogiltig email", async() => {
    // skickar en ogiltig email, då tjenare = fel, egen kontroll ska neka det här, utan någon form utav kontakt med APIn
    await expect(createReservation({
        challenge:"3",
        name:"Jest Test",
        email:"tjenare",
        date: futureDate(30),
        time: "11:00",
        participants: "2"
    })).rejects.toThrow(/email/i);
});

// skickar en bokning i apin varje gång den görs
test("createReservation skickar en bokning och får tillbaka rätt data", async () =>{

    const date= futureDate(30);
    const times= await getAvailableTimes(3, date);

    const booking= await createReservation({
        challenge:"3",
        name:"Jest Test",
        email:"jest@testEmail.com",
        date: date,
        time: times[0],
        participants: "2"
    });

    // kollar så att svaret matchar!
    expect(booking).toMatchObject({
        challenge:3,
        name:"Jest Test",
        email:"jest@testEmail.com",
        date: date,
        time: times[0],
        participants: 2
    });
});