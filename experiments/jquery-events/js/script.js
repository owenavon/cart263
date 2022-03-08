
$(`.header`).on(`click`, function(event) { // Select the header class and calls event listener with on.
  $(this).css(`color`, `red`); // Changes header class content to red in colour.
  $(`.header`).off(`click`); // Off tells the program to stop listening for clicks on the header.
});

// Uses jquery specific special event listener
// $(`#main-heading`).click(function(event) { // Select the main-heading ID and calls jquery special event listener, click (Condensed way).
//   $(this).remove(); // Removes main-heading upon click.
// });

// Calls section tag on every click and or first click.
// $(`section`).on(`click`, function(event) { // Selects section tag and calls event listener with on.
//   $(this).append(`<p>This will be added on EVERY click.</p>`); // Appends this paragraph everytime user clicks within the section.
// });
//
// $(`section`).one(`click`, function(event) { // Selects section tag and calls event listener with one. "click", standard DOM events.
//   $(this).append(`<p>This will be added on the FIRST click.</p>`); // Appends this paragraph once, when the user clicks within the section.
// });

// Removes class by using $(this)
// $(`.header`).on(`click`, function(event) { // Select the header class and calls event listener with on.
//   $(this). remove(); // Removes header upon mouse click on main-heading. this refers to the element that was effected by the event. (event.target).
// });
