
// Check out jQuery Selectors for more advanced css selections.
// https://api.jquery.com/category/selectors/

// each which applies elemnt to current selected class.
$(`.header`).each(function() {
  let reverseText = $(this).text().split(``).reverse().join(``); // Assigns reverseText to the current selected header. this refers to the current element being matched.
  $(this).text(reverseText); // Sets the text of current header inside of each to display the reverseText.
});

// animate properties of header class.
// $(`#button`).on(`click`, function(event) { // Selects the button id, and click event.
//   $(`.header`).animate({ // Animate header class. Animate can only be applied to numerical properties (opacity, height, width, font-size, etc.).
//     "opacity": 0.1,
//     "height": `200px`
//   }, { // Second object with all of the settings.
//     duration: 2000, // Makes animation take 2 seconds.
//     complete: function() { // Calls this function once the duration has finished.
//       $(this).text("ANIMATED!!!"); // header class text will change to say animated once duration has finished.
//     },
//     easing: `linear`
//   });
// });

// // animate properties of header class.
// $(`#button`).on(`click`, function(event) { // Selects the button id, and click event.
//   $(`.header`).animate({ // Animate header class. Provide a list of numbered elements.
//     "opacity": 0.5, // Changes the opacity.
//     "font-size": "3rem" // Changes the font-size.
//   }, 2000, function() { // Callback once the animation has completed.
//     $(this).text("ANIMATED!!"); // .header class text will change to say animated after 2 seconds.
//   }); // Animates over a 2 second interval.
// });

// fadeToggle and slideToggle
// $(`#button`).on(`click`, function(event) { // Selects the button id, and click event.
//   $(`.header`).slideUp(2000, function() { // Method fadeToggle fades / slideToggle slides the header class in or out depending on thier last position.
//     $(this).slideDown(100); // header class slide down 0.1 second after slideUp is complete.
//   });
// });

// fadein and fadeOut
// $(`#button`).on(`click`, function(event) { // Selects the button id, and click event.
//   $(`.header`).fadeOut(2500, function() { // Method fadeOut fades the header class.
//     $(this).fadeIn(2500); // Method fadeIn fades the header class.
//   });
// });

// // toggle elements
// $(`#button`).on(`click`, function(event) { // Selects the button id, and click event.
//   $(`.header`).toggle(); // Method toggles the display property of header class.
// });

// // hide and show elements
// $(`#button`).on(`click`, function(event) { // Selects the button id, and click event.
//   $(`.header`).hide(); // Hide method allows an element to disapear.
//   setTimeout(function() { // Creates an interval.
//     $(`.header`).show(); // Makes the header class re-appear after X amount of time
//   }, 2000); // Header class re-appears after 2 seconds.
// });

// blink style
// setInterval(function() { // Creates an interval.
//   $(`.header`).toggleClass(`highlight`); // toggleClass turns the highlight on and off.
// }, 500); // Toggles every 500 milliseconds.

// addClass & remove class
// $(`.header`).addClass(`highlight`); // addClass adds a class to the first stated class. Don't include the . infront of highlight
//
// $(`.header`).on(`click`, function(event) { // Selects the header class, and click event.
//   $(this).removeClass(`highlight`); // Removes highlight class upon click.
// });
