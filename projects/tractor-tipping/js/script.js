
// A Night at the Movies - Tractor Tipping
// Owen Avon

// Tip Tractors with the use of voice

"use strict";


let state = `landing`; // Provides the starting state. Can be "landing", "redTractor", "greenTractor", "blueTractor", "chase", "winner", "loser".
let disneyFont; // Defines custom disneyFont.
let titleFont; // Defines custom titleFont.
// let gameFont; // Defines custom gameFont.
// let timer = 5; // Set's the timer value.


let titleText = {
  string: `Tractor Tipping`,
  x: 640,
  y: 315
};

let disneyText = {
  string: `Disney PIXAR`,
  x: 640,
  y: 125
};

let presentsText = {
  string: `presents`,
  x: 640,
  y: 225
};

let startText = {
  string: `Press ENTER to start tipping`,
  x: 640,
  y: 550
};

let winnerText = {
  string: `see ya Frank!`,
  x: 640,
  y: 275
};

let loserText = {
  string: `Hehe, Frank got ye!`,
  x: 640,
  y: 275
};

let fontSize = {
  extraSmall: 16, // Sets a font size of 16px.
  small: 18, // // Sets a font size of 18px.
  medium: 32, // Sets a font size of 32px.
  large: 96 // Sets a font size of 96px.
};

let colour = {
  white: {
    r: 255,
    g: 255,
    b: 255
  },
  grey: {
    r: 200,
    g: 200,
    b: 200
  },
  purple: {
    r: 50,
    g: 20,
    b: 50
  },
  orange: {
    r: 255,
    g: 165,
    b: 0
  },
  red: {
    r: 140,
    g: 0,
    b: 0
  },
  green: {
    r: 0,
    g: 140,
    b: 0
  },
  blue: {
    r: 0,
    g: 0,
    b: 100
  },
  yellow: {
    r: 185,
    g: 185,
    b: 0
  }
};

// let gameSound = {
//   wrongSFX: undefined, // Sets wrongSFX as a variable.
//   failSFX: undefined, // Sets failSFX as a variable.
//   winnerSFX: undefined // Sets winnerSFX as a variable.
// };


// Description of preload()
function preload () {
  titleFont = loadFont ("assets/fonts/magnetob.ttf") // Preloads the custom downloaded font for efficient load times.
  disneyFont = loadFont ("assets/fonts/disney.ttf") // Preloads the custom downloaded font for efficient load times.
}


// Description of setup()
function setup() {
createCanvas(1280, 720); // Sets the canvas size to 16:9 aspect ratio.
}


// Description of draw()
function draw() { // P5 Function that displays output on canvas.
  if (state === `landing`) { // Indicates that when the state equates to "landing", start said state.
    landing(); // Calls landing function.
  }
  else if (state === `instruction`) { // Indicates that when the state equates to "redTractor", start said state.
    instruction(); // Calls instruction function.
  }
  else if (state === `redTractor`) { // Indicates that when the state equates to "redTractor", start said state.
    simulation(); // Calls simulation function.
  }
  else if (state === `greenTractor`) { // Indicates that when the state equates to "greenTractor", start said state.
    greenTractor(); // Calls greenTractor function.
  }
  else if (state === `blueTractor`) { // Indicates that when the state equates to "blueTractor", start said state.
    blueTractor(); // Calls blueTractor function.
  }
  else if (state === `chase`) { // Indicates that when the state equates to "chase", start said state.
    chase(); // Calls chase function.
  }
  else if (state === `winner`) { // Indicates that when the state equates to "winner", start said state.
    winner(); // Calls winner function.
  }
  else if (state === `loser`) { // Indicates that when the state equates to "loser", start said state.
    loser(); // Calls loser function.
  }
}


// LANDING FUNCTION
function landing() {
  background(colour.purple.r, colour.purple.g, colour.purple.b); // Sets background to purple in colour.
  disneyPixarText(); // Calls the disneyPixarText function.
  subHeadingText(); // Calls the presentsText function.
  headingText(); // Calls the headingText function.
  startingText(); // Calls the startingText function.
}


function disneyPixarText() {
  push(); // Isolates code from using global properties.
  textFont(disneyFont); // Displays text font as disney.ttf.
  textSize(fontSize.medium); // Displays the font size as 32px.
  fill(colour.grey.r, colour.grey.g, colour.grey.b); // Displays the instructions in white colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(disneyText.string, disneyText.x, disneyText.y); // Displays the Sub Heading.
  pop(); // Isolates code from using global properties.
}


function subHeadingText() {
  push(); // Isolates code from using global properties.
  textFont(`courier`); // Displays text font as "calibri".
  textSize(fontSize.extraSmall); // Displays the font size as 32px.
  fill(colour.white.r, colour.white.g, colour.white.b); // Displays the instructions in white colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(presentsText.string, presentsText.x, presentsText.y); // Displays the Sub Heading.
  pop(); // Isolates code from using global properties.
}


function headingText() {
  push(); // Isolates code from using global properties.
  textFont(titleFont); // Displays text font as magnetob.ttf.
  textSize(fontSize.large); // Displays the font size 46px.
  fill(colour.yellow.r, colour.yellow.g, colour.yellow.b); // Displays the instructions in orange colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(titleText.string, titleText.x, titleText.y); // Displays the title of the game.
  pop(); // Isolates code from using global properties.
}


function startingText() {
  push(); // Isolates code from using global properties.
  textFont(`courier`); // Displays text font as "calibri".
  textSize(fontSize.small); // Displays the font size as 32px.
  fill(colour.white.r, colour.white.g, colour.white.b); // Displays the instructions in white colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(startText.string, startText.x, startText.y); // Displays the Sub Heading.
  pop(); // Isolates code from using global properties.
}
