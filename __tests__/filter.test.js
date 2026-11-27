import { getChallenges } from "../js/api.js";
import { filterChallenges } from "../js/filter-logic.js";

const filter = {
  activeTags: [],
  showOnline: false,
  showOffline: false,
  minRating: 1,
  maxRating: 5,
  searchQuery: "",
};

let challenges;
beforeAll(async () => {
  challenges = await getChallenges();
});

test("Visar alla när inga filter är aktiva", () => {
  const result = filterChallenges(challenges, filter);
  expect(result.length).toBe(challenges.length);
});

test("Online-filter visar bara online", () => {
  const result = filterChallenges(challenges, { ...filter, showOnline: true });
  const areOnline = result.every((challenge) => challenge.type === "online");
  expect(areOnline).toBe(true);
});

test("offline-filter visar bara onsite", () => {
  const result = filterChallenges(challenges, { ...filter, showOffline: true });
  const areOffline = result.every((challenge) => challenge.type === "onsite");
  expect(areOffline).toBe(true);
});

test("online + offline tillsammans visar båda typerna", () => {
  const result = filterChallenges(challenges, {
    ...filter,
    showOnline: true,
    showOffline: true,
  });
  expect(result.every((challenge) => challenge.type === "online" || challenge.type === "onsite")).toBe(true);
});

test("sökning utan träff ger tom lista", () => {
  const result = filterChallenges(challenges, { ...filter, searchQuery: "xxx" });
  expect(result).toHaveLength(0);
});


