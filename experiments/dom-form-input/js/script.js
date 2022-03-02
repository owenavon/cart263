let picker = document.getElementById('color-picker');

picker.addEventListener(`input`, function(event) { // input events happen live
  let color = picker.value;
  // alert(color);
  document.body.style[`background-color`] = color;
});

// let slider = document.getElementById(`example-slider`);
//
// slider.addEventListener(`change`, function(event) {
//   alert(slider.value);
// });

// let slider = document.getElementById(`example-slider`);
// let button = document.getElementById(`check-button`);
//
// button.addEventListener(`click`, function(event) {
//   let value = slider.value; // Assigns value that is currently set on the slider to value
//   alert(value); // Prints value to user via alert window
// });

// let textInput = document.getElementById(`example-text-input`);
// let button = document.getElementById(`submit-button`);
//
// button.addEventListener(`click`, function(event) {
//   let input = textInput.value; // Assigns typed text to input
//   alert(input); // Displays entered text in alert box
// });
//
// textInput.addEventListener(`keydown`, function(event) {
//   if (event.keyCode === 13) { // Can press Enter as well as click on submit button
//     let input = textInput.value; // Assigns typed text to input
//     alert(input); // Displays entered text in alert box
//   }
// });

// let button = document.getElementById('example-button');
//
// button.addEventListener(`click`, function(event) {
//   // alert(`Nice clicking!`);
//   event.target.style[`display`] = `none`;
// });
