
// Activity 01: Where's Sausage Dog?
// Owen Avon

// The user objective is to find and click on the "Sausage Dog".

"use strict";

const NUM_ANIMAL_IMAGES = 10; // Constant value that will not be chnaged
const NUM_ANIMALS = 100; // 100 Anmials objects that are created

let animalImages = []; // Empty anmimal images array
let animals = []; // Empty animal object array

let sausageDogImage = undefined; // sausageDog image variable
let sausageDog = undefined; // sausageDog variable

let titleText = {
  string: `Where's Sausage Dog?`,
  x: 450,
  y: 250,
};

let subTitleText = {
  string: `"Click" to Play`,
  x: 450,
  y: 300,
};

let winnerText = {
  string: `You found the Sausage Dog!`,
  x: 450,
  y: 275,
};

let loserText = {
  string: `Times up! Where could the Sausage dog be?`,
  x: 450,
  y: 275,
};

let fontSize = {
  small: 28,
  medium: 36,
  large: 84
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
  yellow: {
    r: 255,
    g: 200,
    b: 25,
  },
  red: {
    r: 255,
    g: 0,
    b: 0,
  },
};

let state = `landing`; // Provides the starting state. Can be "landing", "simulation", "winner", "loser".
let timer = 10; // Set's the timer value


function preload () { // P5 function that loads assets prior to starting the simulation
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) { // Loop that counts up by 1 untill 10
    let animalImage = loadImage(`assets/images/animal${i}.png`); // Load images dynamically
    animalImages.push(animalImage); // Pushs the animal images into the array
  }

  sausageDogImage = loadImage (`assets/images/sausage-dog.png`); // Preloads static sausage-dog.png
}



function setup() { // P5 function for calculations
  createCanvas(900, 550);
  generateAnimals(); // Calls generateAnimals function
  generateSausageDog(); // Calls generateSausageDog function
  generateSpinInterval();
}

function generateAnimals() { // Create the animals
  for (let i = 0; i < NUM_ANIMALS; i++) {
    let x = random(0, width); // Random x postion for image placement
    let y = random(0, height); // Random y postion for image placement
    let animalImage = random(animalImages); // Random image from animalImages array
    let animal = new Animal(x, y, animalImage); // Creates a class for random animal
    animals.push(animal); // Add animal into animals array
  }
}

function generateSausageDog() {
  let x = random(0, width); // Place SausageDog image at a random x postion
  let y = random(0, height); // Place SausageDog image at a random y postion
  sausageDog = new SausageDog(x, y, sausageDogImage); // Creates a class for SausageDog
}

function generateSpinInterval() {
  setTimeout(delayStateChange, 4000);
}

function delayStateChange() {
  sausageDog.stateWait();
}



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



function landing() {
  background(0); // Sets background to black in colour
  headingText();
  subHeadingText();
}

function headingText() {
  text(titleText.string, titleText.x, titleText.y); // Displays the title of the game.
  textSize(fontSize.small); // Displays the font size as 28px.
  fill(textColour.grey.r, textColour.grey.g, textColour.grey.b); // Displays the instructions in yellow colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
}

function subHeadingText() {
  text(subTitleText.string, subTitleText.x, subTitleText.y,); // Displays the text that dictates what the user must press to start the game.
  textSize(fontSize.medium); // Displays the font size as 28px.
  fill(textColour.yellow.r, textColour.yellow.g, textColour.yellow.b); // Displays the instructions in grey colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
}



function simulation() {
  background(255, 255, 0); // Sets background to yellow in colour
  createAnimal(); // Calls createRandomAnimal
  createSausageDog(); // Calls createSausageDog
  createGameTimerText();
  createGameTimer();
}

function createAnimal() {
  for (let i = 0; i < animals.length; i++) { // Loop that counts to the value indicated in animal
    animals[i].update(); // Update "display" the animal at a random postion
  }
}

function createSausageDog() {
  sausageDog.update(); // Calls update to display sausageDog on canvas
}

function createGameTimerText() {
  push(); // Isolates code from using global properties.
  textSize(fontSize.medium); // Displays the font size as 64px.
  fill(255); // Makes the font white in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(`Time:`, 565, 50); // Displays text at the top right of the canvas.
  text(timer, 690, 50); // Displays dynamic timer result at the top right of the canvas.
  pop(); // Isolates code from using global properties.
}

function createGameTimer() {
  if (frameCount % 60 == 0 && timer > 0) { // Indicates that if the frameCount is divisible by 60, then a second has passed.
    timer--;
  }
  if (timer == 0) { // If the timer hits zero (0), then...
    state = `loser`; // Run the loser state.
  }
}



function winner() {
  background (0, 255, 0);
  winnerHeading();
}

function winnerHeading() {
  text(winnerText.string, winnerText.x, winnerText.y,); // Displays the text that dictates what the user must press to start the game.
  textSize(fontSize.small); // Displays the font size as 28px.
  fill(textColour.white.r, textColour.white.g, textColour.white.b); // Displays the instructions in white colour.
  textAlign(CENTER); // Dictates the text alignment style.
}



function loser() {
  background (255, 0, 0);
  loserHeading();
}

function loserHeading() {
  text(loserText.string, loserText.x, loserText.y,); // Displays the text that dictates what the user must press to start the game.
  textSize(fontSize.small); // Displays the font size as 28px.
  fill(textColour.white.r, textColour.white.g, textColour.white.b); // Displays the instructions in white colour.
  textAlign(CENTER); // Dictates the text alignment style.
}



function mousePressed() {
  if (state === `landing`) { // Indicates that if the mouse is clicked in the "landing" state, switch to the "simulation" state.
    state = `simulation`; // Runs the "simulation" state.
  }
  sausageDog.mousePressed(); // Calls method upon mouse press
}
