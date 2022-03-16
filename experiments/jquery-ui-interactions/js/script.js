$(`#prisoner`).draggable({ // Targets the prisoner id, and allows it to be draggable via the mouse.
  containment: `#prison`, // Ensures the #pisoner cannot leave the #prison.
  start: function(event, ui) { // Uses jquery ui event listener to start function when mouse is dragging.
    $(this).css(`text-decoration`, `underline`); // When dragging begins, the #prisoner gets underlined.
  },
  stop: function(event, ui) { // Uses jquery ui event listener to stop function when mouse is not dragging.
    $(this).css(`text-decoration`, `none`); // When the dragging stops, the #prisoner's underline is removed.
  }
});

$(`#escape-tunnel`).droppable({
  drop: function(event, ui) { // Uses jquery ui event listener drop to drop function when id is overlapping, and mouse it let go.
    ui.draggable.remove(); // Calls the ui.draggable function to remove method when the prisoner is dopped on the #escape-tunnel. https://api.jqueryui.com/droppable/#event-drop
  }
});

// setTimeout(function() { // Defines Timeout function.
//   $(`#prisoner`).draggable(`disable`); // Calls the disable draggable method...
// }, 5000); // after 5 seconds.
