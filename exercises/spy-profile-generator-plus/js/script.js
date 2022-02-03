
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

let instructionText = {
  string: `Enter the keypad numbers for PIP`,
  x: 375,
  y: 400
};

let fontSize = {
  small: 20, // Sets a font size of 26px.
  medium: 28, // Sets a font size of 36px.
  large: 32 // Sets a font size of 96px.
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
}


// Description of setup()
function setup() {
  createCanvas(750, 750);
  validateSpyCredentials(); // Calls validateSpyCredentials function.
  resetAll(); // Calls resetAll function.
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

  spyProfile.instruction = `Say "sign out" to sign out.`; // Generates static text that informs the user how to "sign out".

  localStorage.setItem(USER_PROFILE, JSON.stringify(spyProfile)); // Saves spyProfile in the broswer, with a specfifc key
}


function resetAll() {
  let resetButton = createButton(`Generate New Profile`); // Assigns a variable to a button.
  resetButton.mousePressed(generateProfile); // Calls regenerateProfile function upon button press.
}


function generateProfile() {
  localStorage.removeItem(USER_PROFILE); // Clears spy-profile-data rleated broswer storage.
  location.reload(); // Core Javascript that refreshes page.
}

function keyPressed() {
  if (key === `c`) {
    localStorage.removeItem(USER_PROFILE);
    spyProfile = undefined;
  }
}


function generateAnnyang () {
  if (annyang) { // Connects annyang API.
    let commands = { // defines command object.
      'sign out': function() {
        location.reload(); // Core Javascript that refreshes page.
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
  background(0);
  displayTitleText(); // Calls displayTitleText function
  displayInstructionText(); // Calls displayInstructionText function.
  displayAnswerField(); // Displays the text that generates from keyTyped.
}


function displayTitleText() {
  push(); // Isolates code from using global properties.
  // textFont(customFont); // Displays customFont.ttf.
  textSize(fontSize.large); // Displays the font size 96px.
  fill(colour.white.r, colour.white.g, colour.white.b); // Displays the instructions in orange colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(titleText.string, titleText.x, titleText.y); // Displays the title of the game.
  pop(); // Isolates code from using global properties.
}


function displayInstructionText() {
  push(); // Isolates code from using global properties.
  // textFont(customFont); // Displays customFont.ttf.
  textSize(fontSize.small); // Displays the font size 26px.
  fill(colour.white.r, colour.white.g, colour.white.b); // Displays the instructions in orange colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(instructionText.string, instructionText.x, instructionText.y); // Displays the title of the game.
  pop(); // Isolates code from using global properties.
}




function displayAnswerField() {
  // textFont(simFont); // Changes the font from the default to a custom font.
  textSize(fontSize.small); // Displays the font size 26px.
  text(numbers, width / 2, height / 1.5); // Coordinates that state where the keytyped content will appear.
  fill(255); // Displays the instructions in orange colour.
}



// SIMULATION FUNCTION
function simulation() {
  background(235);
  displaySpyProfile();
}

function displaySpyProfile() {
  let profile = `** SPY PROFILE! DO NOT DISTRIBUTE! **

  Name: ${spyProfile.name}
  Alias: ${spyProfile.alias}
  Secret weapon: ${spyProfile.secretWeapon}
  Password: ${spyProfile.password}
  Instruction: ${spyProfile.instruction}`;


  if (spyProfile !== undefined) {
    push();
    textFont(`Courier, monosapce`);
    textSize(24);
    textAlign(LEFT, TOP);
    fill(0);
    text(profile, 100, 100);
    pop();
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
    }
  }
}
