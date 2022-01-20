
// Activity 01: Where's Sausage Dog?
// Owen Avon

// The user objective is to find and click on the "Sausage Dog".

"use strict";

const NUM_ANIMAL_IMAGES = 10; // Constant value that will not be chnaged
const NUM_ANIMALS = 25; // 100 Anmials objects that are created

let animalImages = []; // Empty anmimal images array
let animals = []; // Empty animal object array

let sausageDogImage = undefined; // sausageDog image variable
let sausageDog = undefined; // sausageDog variable

let gameSound = {
  wrongSFX: undefined, // Sets wrongSFX as a variable.
  failSFX: undefined, // Sets failSFX as a variable.
  winnerSFX: undefined // Sets winnerSFX as a variable.
};

let titleText = {
  string: `Where's Sausage Dog?`,
  x: 450,
  y: 250
};

let gameText = {
  string: `"How to play: Locate and click on the Sausage. Be quick, as you only have 5 seconds.`,
  x: 450,
  y: 300
};

let subTitleText = {
  string: `Press the "Enter" key to Play`,
  x: 450,
  y: 400
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
  small: 20,
  medium: 40,
  large: 60
};

let textColour = {
  grey: {
    r: 185,
    g: 185,
    b: 185
  },
  white: {
    r: 255,
    g: 255,
    b: 255
  },
  teal: {
    r: 20,
    g: 143,
    b: 168
  },
  red: {
    r: 255,
    g: 0,
    b: 0
  }
};

let state = `landing`; // Provides the starting state. Can be "landing", "simulation", "winner", "loser".
let timer = 5; // Set's the timer value


// PRELOAD FUNCTION
function preload () { // P5 function that loads assets prior to starting the simulation
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) { // Loop that counts up by 1 untill 10
    let animalImage = loadImage(`assets/images/animal${i}.png`); // Load images dynamically
    animalImages.push(animalImage); // Pushs the animal images into the array
  }

  sausageDogImage = loadImage (`assets/images/sausage-dog.png`); // Preloads static sausage-dog.png

  gameSound.wrongSFX = loadSound(`./assets/sounds/wrong.mp3`); // Preloads the "wrong.mp3" for efficient load times.
  gameSound.failSFX = loadSound(`./assets/sounds/fail.mp3`); // Preloads the "fail.mp3" for efficient load times.
  gameSound.winnerSFX = loadSound(`./assets/sounds/winner.mp3`); // Preloads the "winner.mp3" for efficient load times.
}


// SETUP FUNCTION
function setup() { // P5 function for calculations
  createCanvas(900, 550);
  generateAnimals(); // Calls generateAnimals function
  generateSausageDog(); // Calls generateSausageDog function
}

function generateAnimals() { // Create the animals
  for (let i = 0; i < NUM_ANIMALS; i++) {
    let x = random(0, width); // Random x postion for image placement
    let y = random(0, height); // Random y postion for image placement
    let animalImage = random(animalImages); // Random image from animalImages array
    let animal = new Animal(x, y, animalImage, gameSound.wrongSFX); // Creates a class for random animal
    animals.push(animal); // Add animal into animals array
  }
}

function generateSausageDog() {
  let x = random(0, width); // Place SausageDog image at a random x postion
  let y = random(0, height); // Place SausageDog image at a random y postion
  sausageDog = new SausageDog(x, y, sausageDogImage, gameSound.winnerSFX); // Creates a class for SausageDog
}


// DRAW FUNCTION
function draw() { // P5 Function that displays output on canvas
  if (state === `landing`) { // Indicates that when the state equates to "landing", start said state.
    landing();
  }
  else if (state === `simulation`) { // Indicates that when the state equates to "simulation", start said state.
    simulation();
  }
  else if (state === `winner`) { // Indicates that when the state equates to "winner", start said state.
    winner();
  }
  else if (state === `loser`) { // Indicates that when the state equates to "loser", start said state.
    loser();
  }
}


// LANDING FUNCTION
function landing() {
  background(0); // Sets background to black in colour
  headingText(); // Calls the headingText function
  gameInstructionText(); // Calls the gameInstructionText function
  subHeadingText(); // Calls the subHeadingText function
}

function headingText() {
  text(titleText.string, titleText.x, titleText.y); // Displays the title of the game.
  textSize(fontSize.small); // Displays the font size XX
  fill(textColour.grey.r, textColour.grey.g, textColour.grey.b); // Displays the instructions in XX colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
}

function gameInstructionText() {
  text(gameText.string, gameText.x, gameText.y); // Displays the game instructions
  textSize(fontSize.medium); // Displays the font size as XX
  fill(textColour.teal.r, textColour.teal.g, textColour.teal.b); // Displays the instructions in XX colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
}

function subHeadingText() {
  text(subTitleText.string, subTitleText.x, subTitleText.y); // Displays the Sub Heading
  textSize(fontSize.large); // Displays the font size as XX
  fill(textColour.teal.r, textColour.teal.g, textColour.teal.b); // Displays the instructions in XX colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
}


// SIMULATION FUNCTION
function simulation() {
  background(20, 143, 168); // Sets background to Teal in colour.
  createAnimal(); // Calls createRandomAnimal.
  createSausageDog(); // Calls createSausageDog.
  createGameTimerText();
  createGameTimer();
}

function createAnimal() {
  for (let i = 0; i < animals.length; i++) { // Loop that counts to the value indicated in animal.
    animals[i].update(); // Update "display" the animal at a random postion.
  }
}

function createSausageDog() {
  sausageDog.update(); // Calls update to display sausageDog in respected class
}

function createGameTimerText() {
  push(); // Isolates code from using global properties.
  textSize(fontSize.medium); // Displays the font size as 64px.
  fill(0); // Makes the font white in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(`Time:`, 75, 50); // Displays text at the top left of the canvas.
  text(timer, 150, 50); // Displays dynamic timer result at the top left of the canvas.
  pop(); // Isolates code from using global properties.
}

function createGameTimer() {
  if (frameCount % 60 == 0 && timer > 0 && !sausageDog.found) { // Stop the timer when the sauasgeDog is found.
    timer--;
  }
  if (timer == 0) { // If the timer hits zero (0), then...
    state = `loser`; // Run the loser state.
    gameSound.failSFX.play(); // Play wrong.mp3 (5 seconds).
  }
}


// WINNER FUNCTION
function winner() {
  background (0, 140, 0); // Sets the background as Green in colour.
  winnerHeading();
}

function winnerHeading() {
  push();
  text(winnerText.string, winnerText.x, winnerText.y,); // Displays the text that dictates what the user must press to start the game.
  textSize(fontSize.small); // Displays the font size as 28px.
  fill(textColour.white.r, textColour.white.g, textColour.white.b); // Displays the instructions in white colour.
  textAlign(CENTER); // Dictates the text alignment style.
  pop();
}


// LOSER FUNCTION
function loser() {
  background (140, 0, 0); // Sets the background as Red in colour.
  loserHeading();
}

function loserHeading() {
  push();
  text(loserText.string, loserText.x, loserText.y,); // Displays the text that dictates what the user must press to start the game.
  textSize(fontSize.small); // Displays the font size as 28px.
  fill(textColour.white.r, textColour.white.g, textColour.white.b); // Displays the instructions in white colour.
  textAlign(CENTER); // Dictates the text alignment style.
  pop();
}


// KEYPRESSED FUNCTION
function keyPressed () { // p5 function to perform action with keyboard input.
  if (keyCode === 13 && state === `landing`) { // Says when the "P" key is pushed, and the state is in "title", switch to the "simulation" state.
    state = `simulation`; // Runs the "simulation" state.
  }
}


// MOUSEPRESSED FUNCTION
function mousePressed() {
  if (state === `simulation`) { // If state is equal to simulation then...
    sausageDog.mousePressed(); // Calls method in object.
    for (let i = 0; i < animals.length; i++) { // Loop that counts to the value indicated in animal
      animals[i].mousePressed(); // Update "display" the animal at a random postion
    }
  }
}
