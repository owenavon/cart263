$(`#escape-tunnel`).hide();

$(`#introduction-dialog`).dialog({
  modal: true, // Provides modal properties to the dialog box.
  resizable: false, // Prevents the user from resizing the modal box.
  buttons: { // Provides buttons within jquery.
    "Imagination": function() {
      $(`#prisoner`).draggable(`option`, `containment`, `none`); // Removes the prisoners containment option.
      $(this).dialog(`close`);
    },
    "Escape tunnel": function() {
      $(`#escape-tunnel`).show({ // Shows the escape-tunnel id once the user clicks on the Escape Tunnel button.
        effect: `blind` // Animates the appearance of the blind effect.
      });
      $(this).dialog(`close`); // Dialog creates a dialog box using the introduction-dialog id.
    }
  }
});

$(`#prisoner`).effect({
  effect: `shake`, // Default effect to shake element.
  duration: 2000, // Shakes for 2 seconds.
  times: 15, // Number of times to shake over 2 seconds.
  distance: 7, // Specifies the amount of pixels the element shakes on the x-axis.
  complete: makePrisonerDraggable // Allows the user to drag the prisoner once the effect is complete.
});

$(`#escape-tunnel`).droppable({ // Defines anonymous function for escape-tunnel
  drop: function(event, ui) { // Uses jquery ui event listener drop to drop function when id is overlapping, and mouse it let go.
    ui.draggable.remove(); // Calls the ui.draggable function to remove method when the prisoner is dopped on the #escape-tunnel. https://api.jqueryui.com/droppable/#event-drop
    $(this).hide({ // jquery method that is called to hide escape-tunnel.
      effect: `blind`, // blind effect that vertically slides escape-tunnel content up.
      duration: 500 // Effect takes place over 0.5 second.
    });
  }
});

function makePrisonerDraggable() { // Defines the makePrisonerDraggable function.
  $(`#prisoner`).draggable({ // Targets the prisoner id, and allows it to be draggable via the mouse.
    containment: `#prison`, // Ensures the #pisoner cannot leave the #prison.
    start: function(event, ui) { // Uses jquery ui event listener to start function when mouse is dragging.
      $(this).addClass(`prisoner-dragging`, 750); // jQuery adds prisoner dragging class to prisoner id, upon dragging. Animates effect over 0.75 second.
    },
    stop: function(event, ui) { // Uses jquery ui event listener to stop function when mouse is not dragging.
      $(this).removeClass(`prisoner-dragging`, 750); // jQuery removes prisoner dragging class to prisoner id, upon no dragging. Animates effect over 0.75 second.
    }
  });
}

// $(`#prisoner`).draggable({ // Targets the prisoner id, and allows it to be draggable via the mouse.
//   containment: `#prison`, // Ensures the #pisoner cannot leave the #prison.
//   start: function(event, ui) { // Uses jquery ui event listener to start function when mouse is dragging.
//     $(this).css(`text-decoration`, `underline`); // When dragging begins, the #prisoner gets underlined.
//     $(this).animate({ // Animates prisoner id while being dragged.
//       "color": `#4444ff` // Change text colour to blue.
//     }, 750); // Apply animation over 0.75 second.
//   },
//   stop: function(event, ui) { // Uses jquery ui event listener to stop function when mouse is not dragging.
//     $(this).css(`text-decoration`, `none`); // When the dragging stops, the #prisoner's underline is removed.
//     $(this).animate({ // Animates prisoner id when user stops dragging.
//       "color": `#000000` // Change text colour to black.
//     }, 750); // Apply animation over 0.75 second.
//   }
// });

// setTimeout(function() { // Defines Timeout function.
//   $(`#prisoner`).draggable(`disable`); // Calls the disable draggable method...
// }, 5000); // after 5 seconds.
