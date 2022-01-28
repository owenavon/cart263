
// Exercise 02: Slamina New Game Plus
// Owen Avon

// A guessing game in which an automated voice says the name of a Canadian municipality "backwards". The user's objective is to say the name of the Canadian municipality "forwards".

"use strict";

const municipalities = [ // List of Canadian city names inside an array. List from https://github.com/dariusk/corpora/blob/master/data/geography/canadian_municipalities.json
  "toronto",
  "montreal",,
  "calgary",
  "ottawa",
  "edmonton",
  "mississauga",
  "winnipeg",
  "vancouver",
  "brampton",
  "hamilton",
  "quebec city",
  "surrey",
  "laval",
  "halifax",
  "london",
  "markham",
  "vaughan",
  "gatineau",
  "longueuil",
  "burnaby",
  "saskatoon",
  "kitchener",
  "windsor",
  "regina",
  "richmond",
  "richmond hill",
  "oakville",
  "burlington",
  "greater sudbury",
  "sherbrooke",
  "oshawa",
  "saguenay",
  "barrie",
  "abbotsford",
  "saint catharines",
  "cambridge",
  "coquitlam",
  "kingston",
  "whitby",
  "guelph",
  "kelowna",
  "saanich",
  "ajax",
  "thunder bay",
  "terrebonne",
  "saint johns",
  "langley",
  "delta",
  "waterloo",
  "cape breton",
  "brantford",
  "strathcona county",
  "red deer",
  "pickering",
  "kamloops",
  "clarington",
  "north vancouver",
  "milton",
  "nanaimo",
  "lethbridge",
  "niagara falls",
  "repentigny",
  "victoria",
  "newmarket",
  "brossard",
  "peterborough",
  "chilliwack",
  "maple ridge",
  "sault ste. marie",
  "kawartha lakes",
  "sarnia",
  "prince george",
  "drummondville",
  "saint john",
  "moncton",
  "new westminster",
  "wood buffalo",
  "granby",
  "norfolk county",
  "saint albert",
  "medicine hat",
  "caledon",
  "halton hills",
  "port coquitlam",
  "fredericton",
  "north bay",
  "blainville",
  "aurora",
  "welland",
  "shawinigan",
  "belleville"
];

let titleText = {
  string: `Name that Canadian Municipality!`,
  x: 960,
  y: 270
};

let instructionText = {
  string: `The name of a municipality will be voiced backwards. You say "It must be" followed by your guess.`,
  x: 960,
  y: 350
};

let startText = {
  string: `Click Anywhere to Begin`,
  x: 960,
  y: 575
};

let simulationText = {
  string: `It must be...`,
  x: 960,
  y: 270
};

let simulationInstructionText = {
  string: `Clap to generate voice.`,
  x: 960,
  y: 810
};

let fontSize = {
  small: 26, // Sets a font size of 26px.
  medium: 36, // Sets a font size of 36px.
  large: 96 // Sets a font size of 96px.
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

let currentMunicipality = ``; // Chosen random municipality will be placed inside the variable. Starts out as empty.
let currentAnswer = ``; // Variable that stores the value of what the user guessed. Starts out as empty.
let state = `landing`; // Makes the program to start in the landing state.
let customFont; // Defines customFont.
let canadaFlag; // Assigns variable to background image.
let microphone = undefined; // undefined variable that will later be associated to a variable / parameter.
let halfLoudness = 0.5; // Assigns a value to  microphone input loudness.
let red = 0; // Sets intial red variable to black in colour.
let green = 0; // Sets intial red variable to green in colour.
let blue = 0; // Sets intial red variable to blue in colour.



// PRELOAD FUNCTION
function preload() {
  canadaFlag = loadImage("assets/images/canada-flag.png"); // Preloads the "Canadian Flag" image for efficient load times.

  customFont = loadFont ("assets/fonts/molly-sans.ttf") // Preloads the custom downloaded font for efficient load times.
}



// SETUP FUNCTION
function setup() {
  canvas = createCanvas(1920, 1080);
  audioInLink(); // Calls audioInLink function.
  windowResized(); //  Calls windowResized function.
  generateAnnyang(); // Calls the generateAnnyang function.
}


function audioInLink() {
  microphone = new p5.AudioIn(); // Links to p5 AudioIn Library.
}


function windowResized() {
  let canvasRatio = height / width; // Calculate ratio of height to width for the canvas.
  let windowRatio = windowHeight / windowWidth; // Calculate ratio of height to width for the wndow.

  let newWidth = undefined; // Create variables to store the new width.
  let newHeight = undefined; // Create variables to store the new height.

  if (windowRatio < canvasRatio) { // If the window ratio is smaller, we'll use the window height to set the basis of our new canvas dimensions.
    newHeight = windowHeight;// Our canvas will fit by setting its height to the window height...
    newWidth = windowHeight / canvasRatio; // ... and then scaling the width based on the ratio
  }
  else {
    newWidth = windowWidth; // Our canvas will fit by setting its width to the window width...
    newHeight = windowWidth * canvasRatio; // ... and then scaling the height based on the ratio.
  }

  canvas.elt.style.width = `${newWidth}px`; // Set the canvas's CSS width and height properties to the new width value.
  canvas.elt.style.height = `${newHeight}px`; // Set the canvas's CSS width and height properties to the new height value.
}


function generateAnnyang () {
  if (annyang) { // Connects annyang API.
    let commands = { // defines command object.
      'It must be *municipality': guessMunicipality // Parameter with splat variable. This allows the user to guess the municipality name.
    };
    annyang.addCommands(commands); // Tells annyang to listen to commands variable.
    annyang.start(); // Initiates speech recognition.

    textSize(fontSize.large); // Displays text size at 96px.
    textStyle(BOLD); // Displays text in bold font family
    textAlign(CENTER, CENTER); // Displays text in the centre (vertically & horizontally) of the canvas.
  }
  else {
    alert(`Please visit this page in Google Chrome on a desktop.`)
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
  background(canadaFlag); // Sets the background to black in colour.

  displayTitleText(); // Calls displayTitleText function
  displayInstructionText(); // Calls displayInstructionText function.
  displayStartText(); // Calls displayStartText function.
}


function displayTitleText() {
  push(); // Isolates code from using global properties.
  textFont(customFont); // Displays customFont.ttf.
  textSize(fontSize.large); // Displays the font size 96px.
  fill(colour.white.r, colour.white.g, colour.white.b); // Displays the instructions in orange colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(titleText.string, titleText.x, titleText.y); // Displays the title of the game.
  pop(); // Isolates code from using global properties.
}


function displayInstructionText() {
  push(); // Isolates code from using global properties.
  textFont(customFont); // Displays customFont.ttf.
  textSize(fontSize.small); // Displays the font size 26px.
  fill(colour.white.r, colour.white.g, colour.white.b); // Displays the instructions in orange colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(instructionText.string, instructionText.x, instructionText.y); // Displays the title of the game.
  pop(); // Isolates code from using global properties.
}


function displayStartText() {
  push(); // Isolates code from using global properties.
  textFont(customFont); // Displays customFont.ttf.
  textSize(fontSize.medium); // Displays the font size 36px.
  fill(colour.white.r, colour.white.g, colour.white.b); // Displays the instructions in orange colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(startText.string, startText.x, startText.y); // Displays the title of the game.
  pop(); // Isolates code from using global properties.
}



// SIMULATION FUNCTION
function simulation() {
  background(red, green, blue); // Sets the background to black in colour.
  displaySimulationText(); // Calls the displayStaticText function.
  displaySimulationInstructionText(); // Calls the displayAnswer function.
  displayAnswer(); // Calls the displayAnswer function.
  clapToNextQuestion(); // Calls the clapToNextQuestion function.
}


function displaySimulationText() {
  push(); // Isolates code from using global properties.
  textFont(customFont); // Displays customFont.ttf.
  textSize(fontSize.large); // Displays the font size 96px.
  fill(colour.white.r, colour.white.g, colour.white.b); // Displays the instructions in orange colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(simulationText.string, simulationText.x, simulationText.y); // Displays the title of the game.
  pop(); // Isolates code from using global properties.
}


function displaySimulationInstructionText() {
  push(); // Isolates code from using global properties.
  textFont(customFont); // Displays customFont.ttf.
  textSize(fontSize.medium); // Displays the font size 36px.
  fill(colour.white.r, colour.white.g, colour.white.b); // Displays the instructions in orange colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(simulationInstructionText.string, simulationInstructionText.x, simulationInstructionText.y); // Displays the title of the game.
  pop(); // Isolates code from using global properties.
}


function displayAnswer() {
  if (currentAnswer === currentMunicipality) { // If the user answer is the correct municipality name, then...
    fill(0, 180, 0); // Fill the background as green in colour.
  }
  else { // Otherwise...
    fill(180, 0, 0); // Fill the background as red in colour.
  }
  text(currentAnswer, width / 2, height / 2); // Display user's answer in the centre of the canvas.
}


function sayMunicipalityBackwards(municipality) { // Asigns reversemunicipality the result of municipality.
  let reversemunicipality = reverseString(municipality); // Asigns reversemunicipality the result of reverseString.
  responsiveVoice.speak(reversemunicipality); // reversemunicipality value is spoken aloud, via the responsiveVoice API.
}


function reverseString(string) { // Reverses the provided string.
  let characters = string.split(''); // Split the string into an array of characters.
  let reverseCharacters = characters.reverse(); // Reverse the array of characters.
  let result = reverseCharacters.join(''); // Join the array of characters back into a string.
  return result; // Return the result.
}


function guessMunicipality(municipality) { // Calls municipality parameter, which is the word that the user guessed.
  currentAnswer = municipality.toLowerCase(); // Assign the guess inside the municipality pararmter into the currentAnswer. Converts the guess toLowerCase.
  oralFeedback(); // Calls oralFeedback function for voice dictation.
}


function oralFeedback() {
  if (currentAnswer === currentMunicipality) { // If the user answer is the correct municipality name, then...
    responsiveVoice.speak("Good job mate!", "UK English Male", {
      pitch: 0.9,
      rate: 1.1,
      volume: 1
    }); // Congratulate the user.
  }
  else { // Otherwise...
    responsiveVoice.speak("nope, better luck next time!", "UK English Male", {
      pitch: 0.9,
      rate: 1.1,
      volume: 1
    }); // Wish them better luck next time.
  }
}


function nextQuestion() { //
  currentAnswer = ``; // Clears answer from screen. Initially displays nothing on screen.
  currentMunicipality = random(municipalities); // Fetch's random value from municipalities array.
  sayMunicipalityBackwards(currentMunicipality); // Calls function to speak the municipality name.
}


function clapToNextQuestion() {
  let microphoneLevel = microphone.getLevel(); // Allows microphone to pickup audio input

  if (microphoneLevel > halfLoudness) { // Indicates that then the level reaches 0.6 or louder, then...
    nextQuestion(); // Call the nextQuestion function.
    red = random (0, 200); // Generates a random dark red value.
    green = random (0, 200); // Generates a random dark green value.
    blue = random (0, 200); // Generates a random dark blue value.
  }
}

// MOUSEPRESSED FUNCTION
function mousePressed () { // p5 function to perform action with keyboard input.
  state = `simulation`; // Runs the "simulation" state.
  microphone.start(); // Starts microphone input.
  userStartAudio(); // starts the AudioContext on a user gesture, to enable audio input in browser.
}
