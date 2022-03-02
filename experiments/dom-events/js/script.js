let mainHeading = document.getElementById('main-heading');

window.addEventListener(`offline`, function(event) { // Listens to browser via winndow
  mainHeading.innerText = `:(`;
});

// let paragraph = document.getElementById('paragraph');
//
// document.addEventListener(`keydown`, function(event) {
//   if (event.key === `r`) {
//     paragraph.style[`color`] = `#ff0000`;
//   }
// });
//
// document.addEventListener(`keyup`, function(event) {
//   if (event.key === `r`) {
//     paragraph.style[`color`] = `#000000`;
//   }
// });

// document.addEventListener(`keydown`, function(event) {
//   paragraph.innerText = paragraph.innerText + event.key; // Change inner text to allow keypress to be added to webpage
// });

// document.addEventListener(`keydown`, function(event) {
//   if (event.key === `r`) {
//     paragraph.style[`color`] = `#ff0000`;
//   }
// });

// let paragraph = document.getElementById('paragraph');
// let orginalText = paragraph.innerText;
//
// paragraph.addEventListener(`mouseenter`, function(event) { // Can use contextmenu for right click
//   event.target.innerText = `SECRET MESSAGE!!! TOAST IS GREAT!!!`;
// });
//
// paragraph.addEventListener(`mouseleave`, function(event) {
//   event.target.innerText = orginalText;
// });

// let mainHeading = document.getElementById('main-heading');
// let subHeading = document.getElementById('sub-heading');
// let paragraph = document.getElementById('paragraph');
//
// mainHeading.addEventListener(`click`, setRedTextColor)
// subHeading.addEventListener(`click`, setRedTextColor)
// paragraph.addEventListener(`click`, setRedTextColor)
//
// function setRedTextColor(event) {
//   event.target.style[`color`] = `#ff0000`; // event.target allows elements to be specifically targeted
// }

// let paragraph = document.getElementById('paragraph');
//
// paragraph.addEventListener(`click`, function(event) { // Event handler / call back function
//   event.target.innerText = `${event.clientX}, ${event.clientY}`;
// });

// TIME BASE EVENTS

// let paragraph = document.getElementById(`paragraph`); // Assigns variable to paragraph id.
// let opacity = 1;
//
// fadeOut();
//
// function fadeOut() {
//   opacity -= 0.01;
//   paragraph.style[`opacity`] = opacity;
//   if (opacity > 0) {
//     requestAnimationFrame(fadeOut);
//   }
// }

// let paragraph = document.getElementById(`paragraph`); // Assigns variable to paragraph id.
//
// setInterval(blink, 500); // Allows function to be called over and over again
//
// function blink() {
//   let opacity = paragraph.style[`opacity`];
//   if (opacity === `1`) {
//     paragraph.style[`opacity`] = `0`;
//   }
//   else {
//     paragraph.style[`opacity`] = `1`;
//   }
// }

// let paragraph = document.getElementById(`paragraph`); // Assigns variable to paragraph id.
//
// setTimeout(function() { // Function to wait untill called
//   paragraph.style[`color`] = `#ff0000`; // Sets paragraph text colour to red
// }, 3000); // After 3 seconds
