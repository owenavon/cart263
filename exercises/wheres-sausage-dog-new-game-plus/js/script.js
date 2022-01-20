
// Activity 01: Where's Sausage Dog New Game Plus?
// Owen Avon

// The user objective is to find and click on the "Sausage Dog".

"use strict";

const NUM_ANIMAL_IMAGES = 10; // 100 different animal images. Constant value, so it will not be changed throughout the program.
const NUM_ANIMALS = 30; // 30 Anmials objects are created, and will not be changed throughout the program.

let animalImages = []; // Empty anmimal images array.
let animals = []; // Empty animal object array.

let sausageDogImage = undefined; // sausageDog image variable.
let sausageDog = undefined; // sausageDog variable.

let gameTitleFont; // Defines custom gameTitleFont.
let gameFont; // Defines custom gameFont.
let state = `landing`; // Provides the starting state. Can be "landing", "simulation", "winner", "loser".
let timer = 5; // Set's the timer value.

let titleText = {
  string: `Where's Sausage Dog?`,
  x: 450,
  y: 200
};

let gameText = {
  string: `Click on the Sausage Dog before the timer runs out!`,
  x: 450,
  y: 250
};

let subTitleText = {
  string: `Press "Enter" to Start`,
  x: 450,
  y: 330
};

let winnerText = {
  string: `You found the Sausage Dog!`,
  x: 450,
  y: 275
};

let loserText = {
  string: `Times up! Where could the Sausage dog be?`,
  x: 450,
  y: 275
};

let fontSize = {
  small: 22, // Sets a font size of 22px.
  medium: 32, // Sets a font size of 32px.
  large: 46 // Sets a font size of 46px.
};

let colour = {
  white: {
    r: 255,
    g: 255,
    b: 255
  },
  purple: {
    r: 50,
    g: 25,
    b: 55
  },
  orange: {
    r: 200,
    g: 100,
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
    b: 140
  }
};

let gameSound = {
  wrongSFX: undefined, // Sets wrongSFX as a variable.
  failSFX: undefined, // Sets failSFX as a variable.
  winnerSFX: undefined // Sets winnerSFX as a variable.
};



// PRELOAD FUNCTION
function preload () { // P5 function that loads assets prior to starting the simulation.
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) { // Loop that counts up by 1 untill 10.
    let animalImage = loadImage(`assets/images/animal${i}.png`); // Load images dynamically.
    animalImages.push(animalImage); // Push's the animal images into the array.
  }
  gameTitleFont = loadFont ("assets/fonts/adelia.otf") // Preloads the custom downloaded font for efficient load times.
  gameFont = loadFont ("assets/fonts/kiddos.ttf") // Preloads the custom downloaded font for efficient load times.

  sausageDogImage = loadImage (`assets/images/sausage-dog.png`); // Preloads static sausage-dog.png

  gameSound.wrongSFX = loadSound(`./assets/sounds/wrong.mp3`); // Preloads the "wrong.mp3" for efficient load times.
  gameSound.failSFX = loadSound(`./assets/sounds/fail.mp3`); // Preloads the "fail.mp3" for efficient load times.
  gameSound.winnerSFX = loadSound(`./assets/sounds/winner.mp3`); // Preloads the "winner.mp3" for efficient load times.
}


// SETUP FUNCTION
function setup() { // P5 function for calculations.
  createCanvas(900, 550); // Creates a viewable space of 900px X 550px.
  generateAnimals(); // Calls generateAnimals function.
  generateSausageDog(); // Calls generateSausageDog function.
}

function generateAnimals() { // Generates the animals.
  for (let i = 0; i < NUM_ANIMALS; i++) { // For loop to duplicate the animals.
    let x = random(0, width); // Random x postion for image placement.
    let y = random(0, height); // Random y postion for image placement.
    let animalImage = random(animalImages); // Random image from animalImages array.
    let animal = new Animal(x, y, animalImage, gameSound.wrongSFX); // Sends parameters to constructor in Animal class.
    animals.push(animal); // Add animal into animals array.
  }
}

function generateSausageDog() { // Generates the SausageDog.
  let x = random(0, width); // Place SausageDog image at a random x postion.
  let y = random(0, height); // Place SausageDog image at a random y postion.
  sausageDog = new SausageDog(x, y, sausageDogImage, gameSound.winnerSFX); // Sends parameters to constructor in sauasgeDog class.
}


// DRAW FUNCTION
function draw() { // P5 Function that displays output on canvas.
  if (state === `landing`) { // Indicates that when the state equates to "landing", start said state.
    landing(); // Calls landing function.
  }
  else if (state === `simulation`) { // Indicates that when the state equates to "simulation", start said state.
    simulation(); // Calls simulation function.
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
  headingText(); // Calls the headingText function.
  gameInstructionText(); // Calls the gameInstructionText function.
  subHeadingText(); // Calls the subHeadingText function.
}

function headingText() {
  push(); // Isolates code from using global properties.
  textFont(gameTitleFont); // Displays custom adelia.otf font.
  textSize(fontSize.large); // Displays the font size 46px.
  fill(colour.orange.r, colour.orange.g, colour.orange.b); // Displays the instructions in orange colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(titleText.string, titleText.x, titleText.y); // Displays the title of the game.
  pop(); // Isolates code from using global properties.
}

function gameInstructionText() {
  push(); // Isolates code from using global properties.
  textFont(gameFont); // Displays custom kiddos.ttf font
  textSize(fontSize.small); // Displays the font size as 22px.
  fill(colour.white.r, colour.white.g, colour.white.b); // Displays the instructions in white colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(gameText.string, gameText.x, gameText.y); // Displays the game instructions
  pop(); // Isolates code from using global properties.
}

function subHeadingText() {
  push(); // Isolates code from using global properties.
  textFont(gameFont); // Displays custom kiddos.ttf font.
  textSize(fontSize.medium); // Displays the font size as 32px.
  fill(colour.white.r, colour.white.g, colour.white.b); // Displays the instructions in white colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(subTitleText.string, subTitleText.x, subTitleText.y); // Displays the Sub Heading.
  pop(); // Isolates code from using global properties.
}


// SIMULATION FUNCTION
function simulation() {
  background(colour.blue.r, colour.blue.g, colour.blue.b); // Sets background to blue in colour.
  createAnimal(); // Calls createRandomAnimal.
  createSausageDog(); // Calls createSausageDog.
  createGameTimerText(); // Calls the createGameTimerText function.
  createGameTimer(); // Calls the createGamerTimer function.
}

function createAnimal() {
  for (let i = 0; i < animals.length; i++) { // Loop that counts to the value indicated in animal.
    animals[i].update(); // Update (display) the animals at a random postion.
  }
}

function createSausageDog() {
  sausageDog.update(); // Calls update to display sausageDog in respected class.
}

function createGameTimerText() {
  push(); // Isolates code from using global properties.
  textSize(fontSize.medium); // Displays the font size as 32px.
  textFont(gameFont); // Displays custom kiddos.ttf font.
  fill(colour.white.r, colour.white.g, colour.white.b); // Displays the instructions in white colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(`Time:`, 75, 45); // Displays `Time` text at the top left of the canvas.
  text(timer, 140, 45); // Displays dynamic timer result just right of `Time`.
  pop(); // Isolates code from using global properties.
}

function createGameTimer() {
  if (frameCount % 60 == 0 && timer > 0 && !sausageDog.found) { // Count down by 1 second. Stop the timer if the sauasgeDog is found.
    timer--;
  }
  if (timer == 0) { // If the timer hits zero (0), then...
    state = `loser`; // Run the loser state.
    gameSound.failSFX.play(); // Play wrong.mp3 (5 seconds).
  }
}


// WINNER FUNCTION
function winner() {
  background (colour.green.r, colour.green.g, colour.green.b); // Sets the background as Green in colour.
  winnerHeading(); // Calls the winnerHeading function.
}

function winnerHeading() {
  push(); // Isolates code from using global properties.
  textFont(gameFont); // Displays custom kiddos.ttf font.
  textSize(fontSize.medium); // Displays the font size as 32px.
  fill(colour.white.r, colour.white.g, colour.white.b); // Displays the instructions in white colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(winnerText.string, winnerText.x, winnerText.y,); // Displays the text that dictates what the user must press to start the game.
  pop(); // Isolates code from using global properties.
}


// LOSER FUNCTION
function loser() {
  background (colour.red.r, colour.red.g, colour.red.b); // Sets the background as Red in colour.
  loserHeading(); // Calls loserHeading function.
}

function loserHeading() {
  push(); // Isolates code from using global properties.
  textFont(gameFont); // Displays custom kiddos.ttf font
  textSize(fontSize.medium); // Displays the font size as 28px.
  fill(colour.white.r, colour.white.g, colour.white.b); // Displays the instructions in white colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(loserText.string, loserText.x, loserText.y,); // Displays the text that dictates what the user must press to start the game.
  pop(); // Isolates code from using global properties.
}


// KEYPRESSED FUNCTION
function keyPressed () { // p5 function to perform action with keyboard input.
  if (keyCode === 13 && state === `landing`) { // When the "Enter" key is pushed, and the state is in "landing", switch to the "simulation" state.
    state = `simulation`; // Runs the "simulation" state.
  }
}


// MOUSEPRESSED FUNCTION
function mousePressed() {
  if (state === `simulation`) { // If state is equal to simulation then... This prevents mouse activation in landing page.
    sausageDog.mousePressed(); // Calls method in object, in sausageDog class.
    for (let i = 0; i < animals.length; i++) { // Loop that counts to the value indicated in animal.
      animals[i].mousePressed(); // Update "display" the animal at a random postion.
    }
  }
}
