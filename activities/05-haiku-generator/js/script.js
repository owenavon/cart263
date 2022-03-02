// Activity 5 Haiku Generator
// Owen Avon

// Webpage that displays a haiku where each line is chosen at random from a set of possibilities. If the user clicks on a line, it will fade out and fade back in as a new randomly selected line.

"use strict";

let fiveSyllableLines = [ // Array with 5 Haikus
  `O, to be a tree`,
  `The cat does not know`,
  `We are all forests`,
  `You have done your best`,
  `They are all gone now`
];

let sevenSyllableLines = [ // Array with 7 Haikus
  `Say the things left unsaid`,
  `Never believe the wind's lies`,
  `The autumn stretches its legs`,
  `Nothing can satisfy you`,
  `They will not come back again`
];


let line1 = random(fiveSyllableLines); // Line1 is assigned a random element from fiveSyllableLines
let line2 = random(sevenSyllableLines); // Line2 is assigned a random element from sevenSyllableLines
let line3 = random(fiveSyllableLines); // Line3 is assigned a random element from fiveSyllableLines

let line1P = document.getElementById('line-1'); // Assigns line-1 html id to line1P variable
let line2P = document.getElementById('line-2'); // Assigns line-2 html id to line2P variable
let line3P = document.getElementById('line-3'); // Assigns line-3 html id to line3P variable

line1P.innerText = line1; // Sets variable's innerText to the appropriate line.
line2P.innerText = line2; // Sets variable's innerText to the appropriate line.
line3P.innerText = line3; // Sets variable's innerText to the appropriate line.

line1P.addEventListener(`click`, lineClicked); // When clicked, function lineClicked is called.
line2P.addEventListener(`click`, lineClicked); // When clicked, function lineClicked is called.
line3P.addEventListener(`click`, lineClicked); // When clicked, function lineClicked is called.

function lineClicked(event) { // Checks the line that is cliked
  fadeOut(event.target, 1); // Click line1, provides line1, if cliked line2, provides line2 etc... Also indicates the intial full opacity of each line
}

function fadeOut(element, opacity) { // function to fade out element and current opacity
  opacity -= 0.01; // Opacity value fades down
  element.style[`opacity`] = opacity; // Sets the opacity fade out to the element's style
  if (opacity > 0) { // Says, if the opacity is greater than 0, then...
    requestAnimationFrame(function() { // Method that calls anonymous function in the next animation frame
      fadeOut(element, opacity); // Fades out the element and opacity, once per frame until it reaches 0
    });
  }
  else { // Once the element has faded out...
    setNewLine(element); // Calls the setNewLine function
    fadeIn(element, 0); // Calls the fadeIn function
  }
}

function fadeIn(element, opacity) { // function to fade in element and current opacity
  opacity += 0.01; // Opacity value fades in
  element.style[`opacity`] = opacity; // Sets the opacity fade in to the element's style
  if (opacity < 1) { // Says, if the opacity is less than 1, then...
    requestAnimationFrame(function() { // Method that calls anonymous function in the next animation frame
      fadeIn(element, opacity); // Fades in the element and opacity, once per frame until it reaches 1
    });
  }
}

function setNewLine(element) {
  if (element === line1P || element === line3P) { // If element is equal to line1P or line3P
    element.innerText = random(fiveSyllableLines); // Assigns element innerText a random line from the fiveSyllableLines
  }
  else if (element === line2P) { // otherwise, if element is equal to line2P
    element.innerText = random(sevenSyllableLines); // Assigns element innerText a random line from the sevenSyllableLines
  }
}

function random(array) {
  let index = Math.floor(Math.random() * array.length); // Selects a random index from an array. Math.floor only returns intergers
  return array[index]; // Returns a random element from the array
}
