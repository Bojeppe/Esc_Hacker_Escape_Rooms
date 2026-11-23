const filterToggle = document.querySelector('#filter-toggle');  // hittar kanpparna i html //
const filterPanel = document.querySelector('#filter-panel');   // hittar filter section i html //
console.log("button:", filterToggle);
console.log("panel:", filterPanel);

filterToggle.addEventListener('click', function() {  // när man klickar på knappen //
    filterPanel.hidden = !filterPanel.hidden;  // ändrar statusen på filter panelen //
    console.log("Panel hidden:", filterPanel.hidden);
});
