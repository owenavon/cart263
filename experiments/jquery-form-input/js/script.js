
$(`#range-slider`).on(`change`, function(event) { // Selects example-button id and listens via change.
  let input = $(this).val(); // Returns value of the slider, and assigns it to input. Val lets you acess the information of anything the user inputs.
  alert(input); // Displays the input variable on screen.
});

// Returns value
// $(`#example-button`).on(`click`, function(event) { // Selects example-button id and listens via on.
//   let input = $(`#example-text-input`).val(); // Returns value inside text field, and assigns it to input.
//   alert(input);
// });

// Removes button
// $(`#example-button`).on(`click`, function(event) { // Selects example-button id and listens via on.
//   $(this).remove(); // Removes example-button upon mouse click.
// });
