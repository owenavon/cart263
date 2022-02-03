
// Spy Profile Generator Plus
// Owen Avon

// Generates a randomized spy profile for the user, and password protects it.

"use strict";

const INSTRUMENT_DATA = `https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`;
const OBJECT_DATA = `https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`;
const TAROT_DATA = `https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`;
const USER_PROFILE = `spy-profile-data`;

let instrumentData = undefined;
let objectData = undefined;
let tarotData = undefined;

let state = `landing`; // Makes the program to start in the landing state.
let numbers = ""; // Defines variable
let successMusic = undefined;

let spyProfile = {
  name: `**REDACTED**`,
  alias: `**REDACTED**`,
  secretWeapon: `**REDACTED**`,
  password: `**REDACTED**`,
  instruction: `**REDACTED**`
};

let titleText = {
  string: `PROTECTED INFORMATION PORTAL (PIP)`,
  x: 375,
  y: 350
};

let instructionHeading = {
  string: `Click on "Generate New Profile".`,
  x: 375,
  y: 385
};

let instructionSubheading = {
  string: `Type the keypad numbers for PIP, followed by "Enter".`,
  x: 375,
  y: 410
};

let answerField = {
  x: 375,
  y: 495,
  w: 280,
  h: 35
}

let fontSize = {
  small: 20, // Sets a font size of 20px.
  medium: 24, // Sets a font size of 24px.
  large: 32 // Sets a font size of 32px.
};

let colour = {
  white: {
    r: 255,
    g: 255,
    b: 255
  },
  red: {
    r: 130,
    g: 0,
    b: 0
  }
}


// PRELOAD
function preload() {
  instrumentData = loadJSON(INSTRUMENT_DATA); // Preloads JSON instrumentData file from URL.
  objectData = loadJSON(OBJECT_DATA); // Preloads JSON objectData file from URL.
  tarotData = loadJSON(TAROT_DATA); // Preloads JSON tarotData file from URL.

  successMusic = loadSound (`./assets/sounds/bark.wav`);
}


// Description of setup()
function setup() {
  createCanvas(750, 750);
  newInformation(); // Calls newInformation function.
  generateAnnyang(); // Calls generateAnnyang function.
}



function validateSpyCredentials() {
  let data = JSON.parse(localStorage.getItem(USER_PROFILE)); // Converts the specific key from a string to an object.

  if (data !== null) { // If there is saved data, then place it into the spyProfile.

    let password = prompt(`Agent! What is your password?!`); // Prompts the user to enter their password
    if (password === data.password) { // If the user types in the same password as what is listed in data.password, then...
      spyProfile.name = data.name; // Puts spyProfile name information into data name information.
      spyProfile.alias = data.alias; // Puts spyProfile alias information into data alias information.
      spyProfile.secretWeapon = data.secretWeapon; // Puts spyProfile secretWeapon information into data secretWeapon information.
      spyProfile.password = data.password; // Puts spyProfile password information into data password information.
      spyProfile.instruction = data.instruction; // Puts spyProfile password information into data password information.
      playMusicUponPassword();
    }
  }


  else { // If there is not save data, then...
    generateSpyProfile(); // Calls the generateSpyProfile function.
  }
}



function generateSpyProfile() {
  spyProfile.name = prompt(`Agent! what is your name?!`); // Whatever the user enters in the prompt will be assigned to spyProfile.name.
  let instrument = random(instrumentData.instruments); // Chooses a random element from the "instruments" property to instrument.
  spyProfile.alias = `The ${instrument}`; // Assigns the instrument value to spyProfile.alias.

  spyProfile.secretWeapon = random(objectData.objects); // Chooses a random element from the "objects" property and assigns it to spyProfile.secretWeapon.

  let card = random(tarotData.tarot_interpretations); // Chooses a random element from the tarot_interpretations object.
  spyProfile.password = random(card.keywords); // A random keyword from the "keywords" object is assigned to spyProfile.password.

  spyProfile.instruction = `Say "destory data" to sign out.`; // Generates static text that informs the user how to "sign out".

  localStorage.setItem(USER_PROFILE, JSON.stringify(spyProfile)); // Saves spyProfile in the broswer, with a specfifc key
}



function newInformation() {
  let regenInformation = createButton(`Regenerate Information`); // Assigns a variable to a button.
  regenInformation.mousePressed(generateProfile); // Calls regenerateProfile function upon button press.
}


function generateProfile() {
  if (state === `simulation`) { // If the state is equal to "simulation", then...
    spyProfile.alias = random(instrumentData.instruments); // A random keyword from the "keywords" object is re-shuffled.
    spyProfile.secretWeapon = random(objectData.objects); // A random element from the "objects" property is re-shuffled.
    // spyProfile.password = data.password; // Puts spyProfile password information into data password information.
  }
}



function generateAnnyang () {
  if (annyang) { // Connects annyang API.
    let commands = { // defines command object.
      'destory data': function() {
        localStorage.removeItem(USER_PROFILE); // Clears spy-profile-data rleated broswer storage.
        spyProfile = undefined; // Removes visible data from screen.
      }
    };
    annyang.addCommands(commands); // Tells annyang to listen to commands variable.
    annyang.start(); // Initiates speech recognition.
  }
  else { // If the user is not using the Google Chrome broswer, then...
    alert(`Please visit this page in Google Chrome on a desktop.`) // Tells the end user visiting instructions.
  }
}



// DRAW FUNCTION
function draw() {
  if (state === `landing`) { // Indicates that when the state equates to "landing", start said state.
    landing(); // Calls landing function.
  }
  else if (state === `simulation`) { // Indicates that when the state equates to "simulation", start said state.
    simulation(); // Calls simulation function.
  }
}



// LANDING FUNCTION
function landing() {
  background(0); // Sets the background colour to black.
  displayTitleText(); // Calls displayTitleText function
  displayInstructionHeading(); // Calls displayInstructionHeading function.
  displayInstructionSubHeading(); // Calls displayInstructionSubHeading function.
  displayAnswerField(); // Calls the white answer input field box.
  displayUserInput(); // Calls the text that generates from keyTyped.
}



function displayTitleText() {
  push(); // Isolates code from using global properties.
  textFont(`Courier, monosapce`); // Displays text font as "courier"
  textSize(fontSize.large); // Displays the font size 32px.
  fill(colour.white.r, colour.white.g, colour.white.b); // Displays the instructions in white colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(titleText.string, titleText.x, titleText.y); // Displays the title of the game.
  pop(); // Isolates code from using global properties.
}



function displayInstructionHeading() {
  push(); // Isolates code from using global properties.
  textFont(`Courier, monosapce`); // Displays text font as "courier"
  textSize(fontSize.small); // Displays the font size 20px.
  fill(colour.white.r, colour.white.g, colour.white.b); // Displays the instructions in white colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(instructionHeading.string, instructionHeading.x, instructionHeading.y); // Displays the title of the game.
  pop(); // Isolates code from using global properties.
}



function displayInstructionSubHeading() {
  push(); // Isolates code from using global properties.
  textFont(`Courier, monosapce`); // Displays text font as "courier"
  textSize(fontSize.small); // Displays the font size 20px.
  fill(colour.white.r, colour.white.g, colour.white.b); // Displays the instructions in white colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(instructionSubheading.string, instructionSubheading.x, instructionSubheading.y); // Displays the title of the game.
  pop(); // Isolates code from using global properties.
}



function displayAnswerField() {
  rect(answerField.x, answerField.y, answerField.w, answerField.h); // Draws the answerField input field.
  rectMode(CENTER); // Draws the rectangle from the center outwards.
  fill(0); // Sets the answer field input box as white in colour.
}



function displayUserInput() {
  textFont(`Courier, monosapce`); // Displays text font as "courier"
  textSize(fontSize.small); // Displays the font size 20px.
  text(numbers, width / 2, height / 1.5); // Coordinates that state where the keytyped content will appear.
  fill(255); // Displays the instructions in white colour.
}



// SIMULATION FUNCTION
function simulation() {
  background(235);
  displaySpyProfile(); // Calls displaySpyProfile.
}



function displaySpyProfile() {
  let profile = `** SPY PROFILE! DO NOT DISTRIBUTE! **

  Name: ${spyProfile.name}
  Alias: ${spyProfile.alias}
  Secret weapon: ${spyProfile.secretWeapon}
  Password: ${spyProfile.password}
  Instruction: ${spyProfile.instruction}`;


  if (spyProfile !== undefined) {
    push(); // Isolates code from using global properties.
    textFont(`Courier, monosapce`);
    textSize(fontSize.medium);
    textAlign(LEFT, TOP); // Aligns the text content.
    fill(0); // Displays the font as black in colour.
    text(profile, 40, 100); // Displays the profile information at the top left of the canvas.
    pop(); // Isolates code from using global properties.
  }
}



function playMusicUponPassword() {
  if (!successMusic.isPlaying()) { // States that if the click sound effect is not playing, it will be played everytime the basket and goldAcorn touch.
    successMusic.play();
  }
}



// KEYTYPED FUNCTION
function keyTyped() {
  if (state === `landing`) { // If the state is in cameraRiddle then...
    numbers = numbers + key; // Add key function to each pressed letter.
  }
}



// KEYPRESSED FUNCTION
function keyPressed() {
  if (state === `landing`) {
    if (keyCode === BACKSPACE) { // Allows the "Backspace" key remove previous letters.
      numbers = numbers.slice(0, numbers.length - 1); // This is a way to remove the last character in a string!
    }
    else if (numbers === `747`) { // Change state to cameraFlash if user types in "webcam" followed by "Enter".
      state = `simulation`; // Swaps to cameraFlash STATE.
      validateSpyCredentials(); // Calls validateSpyCredentials function.
    }
  }
}
