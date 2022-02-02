
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

let spyProfile = {
  name: `**REDACTED**`,
  alias: `**REDACTED**`,
  secretWeapon: `**REDACTED**`,
  password: `**REDACTED**`
};


// Description of preload()
function preload() {
  instrumentData = loadJSON(INSTRUMENT_DATA); // Preloads JSON instrumentData file from URL.
  objectData = loadJSON(OBJECT_DATA); // Preloads JSON objectData file from URL.
  tarotData = loadJSON(TAROT_DATA); // Preloads JSON tarotData file from URL.
}


// Description of setup()
function setup() {
  createCanvas(windowWidth, windowHeight);
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


function generateAnnyang () {
  if (annyang) { // Connects annyang API.
    let commands = { // defines command object.
      'sign out': function() {
        location.reload(); // Core Javascript that refreshes page.
      }// Parameter with splat variable. This allows the user to guess the municipality name.
    };
    annyang.addCommands(commands); // Tells annyang to listen to commands variable.
    annyang.start(); // Initiates speech recognition.
  }
  else {
    alert(`Please visit this page in Google Chrome on a desktop.`)
  }
}



// Description of draw()
function draw() {
  background(255);
  displaySpyProfile();

}

function displaySpyProfile() {
  let profile = `** SPY PROFILE! DO NOT DISTRIBUTE! **

  Name: ${spyProfile.name}
  Alias: ${spyProfile.alias}
  Secret weapon: ${spyProfile.secretWeapon}
  Password: ${spyProfile.password}`;

  push();
  textFont(`Courier, monosapce`);
  textSize(24);
  textAlign(LEFT, TOP);
  fill(0);
  text(profile, 100, 100);
  pop();
}
