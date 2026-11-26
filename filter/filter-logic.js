console.log("filter-logic.js is running");
const filterToggle = document.querySelector('#filter-toggle');  // hittar kanpparna i html //
const filterPanel = document.querySelector('#filter-panel');   // hittar filter section i html //
console.log("button:", filterToggle);
console.log("panel:", filterPanel);
console.log("button:", filterToggle);  // detta är för att kolla om knappen hittas i console //
console.log("panel:", filterPanel); // detta är för att kolla om filter section hittas i console //

filterToggle.addEventListener('click', function() {  // när man klickar på knappen //
    filterPanel.hidden = !filterPanel.hidden;  // ändrar statusen på filter panelen //
    filterToggle.setAttribute('aria-expanded', String(!filterPanel.hidden));  // ändrar statusen på knappen //
    console.log("Panel hidden:", filterPanel.hidden);
});




