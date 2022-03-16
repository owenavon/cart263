// Code Taker
// Owen Avon

// jQuery: https://jquery.com
// jQuery UI: https://jqueryui.com

// Hover the mouse over letters until they turn red. Then, drag said letters down to the answer box to reveal the secret word.

"use strict";

const HALF_SECOND = 500; // Assigns 500 milliseconds to HALF_SECOND constant.
const THEREMIN = `Theremin`; // Assigns Theremin to THEREMIN constant.


$(`#solved-dialog`).dialog({ // Method that creates a dialog box.
  autoOpen: false, // Prevents the dialog box from opening upon initialization.
  buttons: { // Button option that allows the user to click an option.
    "I know.": function() { // Displayed text in modal.
      $(this).dialog(`close`); // Closes the dialog box upon the user clicking the "I know." button.
    }
  }
});

$(`.secret`).one(`mouseover`, function(event) { // Selects secrets class by mouseover which is listened via one.
  $(this).addClass(`found`, HALF_SECOND); // Highlihts specfifc letter that was mouseover and adds to found class over 0.5 second.
  cloneDrag(); // Defines the cloneDrag function.
});

$(`#answer`).droppable({
  drop: function(event, ui) { // drop event handler, that calls function with event and ui
    let letter = ui.draggable.text(); // Assigns text of dragged text to letter variable.
    $(this).append(letter); // Adds the draged letter into the answer id.
    ui.draggable.draggable(`disable`); // Prevents the original letter from being draggable once droped in answer id.
    ui.draggable.removeClass(`found`); // Letter returns to black as found class is removed once letter has been dragged and dropped.

    if ($(this).text() === THEREMIN) { // If the text within #answer is equal to the answer of "Theremin", then...
      $(`#solved-dialog`).dialog(`open`); // Opens the dialog box upon droping the last letter.
    }
  }
});


function cloneDrag() {
  $(`.secret`).draggable({ // Allows element to be draggable only when once found.
    helper: `clone` // Clones the dragged letters.
  });
}
