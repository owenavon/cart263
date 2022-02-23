
// A Night at the Movies - Tractor Tipping
// Owen Avon

// Tip Tractors with the use of voice.

"use strict";


let state = `landing`; // Provides the starting state. Can be "landing", "tractorHonkOne", "tractorHonkTwo", "tractorHonkThree", "touchTractor" "chase", "winner", "loser".
let disneyFont; // Defines custom disneyFont.
let titleFont; // Defines custom titleFont.
// let gameFont; // Defines custom gameFont.
// let timer = 5; // Set's the timer value.

let voiceTimer = 11; // Sets the voiceTimer to 11 seconds.

let stateDelayTimer = 3; // Sets the stateDelayTimer to 3 seconds.

let currentCharacter = 0; // Starts without showing any characters on screen.
let pageMargin = 50; // Page margins for a sheet of paper effect.

let microphone; // Defines microphone for AudioInput
let minLoudness = 0.3; // Assigns a minimum loudness value
let maxLoudness = 0.7; // Assigns a maximum loudness value

let materImage = undefined;
let mater = undefined;

const NUM_TRACTOR_IMAGES = 3; // 3 different tractor images. Constant value, so it will not be changed throughout the program.
const NUM_TRACTORS = 1; // 1 Tractor object is created, and will not be changed throughout the program.

let tractorImages = []; // Empty anmimal images array.
let tractors = []; // Empty animal object array.
// let tractor = undefined;

let frankImage = undefined;
let frank = undefined;


let voiceString = `
Okay now here's what you do.
You just sneak up in front of 'em and then honk.
And they do the rest!`; // The text that the typewriter will write.


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

let titleText = {
  string: `Tractor Tipping`,
  x: 640,
  y: 315
};

let startText = {
  string: `Press ENTER to start tipping`,
  x: 640,
  y: 550
};

// Display near the top of the canvas. Fade out after 5 seconds.
let tipInstructionText = {
  string: `Use the arrow keys to move Mater near tractor. When close, "honk" into the microphone, but not to loud. Also, make sure you don't touch tractor...`,
  x: 640,
  y: 125
}

let tractorRoundTwoText = {
  string: `Fun eh!? Why don't you try er again?`,
  x: 640,
  y: 125
}

let tractorRoundThreeText = {
  string: `Maybe one last time, for good luck sake, right?`,
  x: 640,
  y: 125
}

let touchTractorText = {
  string: `Mr. Tractor don't like confrontation.`,
  x: 640,
  y: 275
};

// Display near the top, fade out after 5 seconds.
let chaseText = {
  string: `Uh oh, all that noise caught Franks attention. You better Run!`,
  x: 640,
  y: 125
};

let loserText = {
  string: `Hehe, Frank got ye!`,
  x: 640,
  y: 275
};

let winnerText = {
  string: `See ya Frank!`,
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
  red: {
    r: 140,
    g: 0,
    b: 0
  },
  brightRed: {
    r: 255,
    g: 0,
    b: 0
  },
  green: {
    r: 0,
    g: 140,
    b: 0
  },
  brightGreen: {
    r: 0,
    g: 255,
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
  },
  orange: {
    r: 255,
    g: 165,
    b: 0
  },
  purple: {
    r: 50,
    g: 20,
    b: 50
  },
  grey: {
    r: 200,
    g: 200,
    b: 200
  },
  white: {
    r: 255,
    g: 255,
    b: 255
  },
  black: {
    r: 0,
    g: 0,
    b: 0
  }
};


let gameSound = {
  honkSFX: undefined, // Sets honkSFX as a variable.
};


// Description of preload()
function preload () {

  loadImages(); // Calls the loadImages function.
  loadSounds(); // Calls the loadSounds function
  loadFonts(); // Calls the loadFonts function.
}



// Description of setup()
function setup() {
createCanvas(1280, 720); // Sets the canvas size to 16:9 aspect ratio.
generateAudioInput(); // Calls the generateAudioInput function upon starting the tractorHonkOne state.
}


function generateAudioInput() {
  microphone = new p5.AudioIn(); // Connects to p5.Audio Library
  microphone.start(); // Starts the microphone.
  userStartAudio(); // starts the AudioContext on a user gesture, to enable audio input in browser.
}



// Description of draw()
function draw() { // P5 Function that displays output on canvas.
  if (state === `landing`) { // Indicates that when the state equates to "landing", start said state.
    landing(); // Calls landing function.
  }
  else if (state === `instruction`) { // Indicates that when the state equates to "tractorHonkOne", start said state.
    instruction(); // Calls instruction function.
  }
  else if (state === `tractorHonkOne`) { // Indicates that when the state equates to "tractorHonkOne", start said state.
    tractorHonkOne(); // Calls simulation function.
  }
  else if (state === `tractorHonkTwo`) { // Indicates that when the state equates to "tractorHonkTwo", start said state.
    tractorHonkTwo(); // Calls tractorHonkTwo function.
  }
  else if (state === `tractorHonkThree`) { // Indicates that when the state equates to "tractorHonkThree", start said state.
    tractorHonkThree(); // Calls tractorHonkThree function.
  }
  else if (state === `touchTractor`) { // Indicates that when the state equates to "touchTractor", start said state.
    touchTractor(); // Calls touchTractor function.
  }
  else if (state === `chase`) { // Indicates that when the state equates to "chase", start said state.
    chase(); // Calls chase function.
  }
  else if (state === `loser`) { // Indicates that when the state equates to "loser", start said state.
    loser(); // Calls loser function.
  }
  else if (state === `winner`) { // Indicates that when the state equates to "winner", start said state.
    winner(); // Calls winner function.
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
  textFont(disneyFont); // Displays the text font as disney.ttf.
  textSize(fontSize.medium); // Displays the font size as 32px.
  fill(colour.grey.r, colour.grey.g, colour.grey.b); // Displays the instructions in white colour.
  textAlign(CENTER, CENTER); // Positions the text allignment to center.
  text(disneyText.string, disneyText.x, disneyText.y); // Displays the Sub Heading.
  pop(); // Isolates code from using global properties.
}


function subHeadingText() {
  push(); // Isolates code from using global properties.
  textFont(`courier`); // Displays the text font as courier.
  textSize(fontSize.extraSmall); // Displays the font size as 16px.
  fill(colour.white.r, colour.white.g, colour.white.b); // Displays the instructions in white colour.
  textAlign(CENTER, CENTER); // Positions the text allignment to center.
  text(presentsText.string, presentsText.x, presentsText.y); // Displays the Sub Heading.
  pop(); // Isolates code from using global properties.
}


function headingText() {
  push(); // Isolates code from using global properties.
  textFont(titleFont); // Displays the text font as magnetob.ttf.
  textSize(fontSize.large); // Displays the font size 96px.
  fill(colour.yellow.r, colour.yellow.g, colour.yellow.b); // Displays the instructions in orange colour.
  textAlign(CENTER, CENTER); // Positions the text allignment to center.
  text(titleText.string, titleText.x, titleText.y); // Displays the title of the game.
  pop(); // Isolates code from using global properties.
}


function startingText() {
  push(); // Isolates code from using global properties.
  textFont(`courier`); // Displays the text font as courier.
  textSize(fontSize.small); // Displays the font size as 18px.
  fill(colour.white.r, colour.white.g, colour.white.b); // Displays the instructions in white colour.
  textAlign(CENTER, CENTER); // Positions the text allignment to center.
  text(startText.string, startText.x, startText.y); // Displays the Sub Heading.
  pop(); // Isolates code from using global properties.
}



// INSTRUCTION FUNCTION
function instruction() {
  background(0); // Sets background to black in colour.
  displayTypewritterEffect(); // Calls the displayTypewritterEffect function.
  responsiveVoiceTimer(); // Calls the responsiveVoiceTimer function.
}


function displayTypewritterEffect() {
  let currentString = voiceString.substring(0, currentCharacter); // The substring() method will return all the characters of a string between the starting and ending positions (starts at 0).

  push(); // Isolates code from using global properties.
  fill(colour.grey.r, colour.grey.g, colour.grey.b); // Displays the written text in grey
  textSize(fontSize.medium); // Displays the font size as 32px.
  textFont(`Courier`); // Displays the text font as courier.
  textAlign(LEFT, TOP); // Positions the text allignment to top left.
  text(currentString, pageMargin + 50, pageMargin + 25); // Draw the current string on the page, with some margins.
  pop(); // Isolates code from using global properties.

  currentCharacter += random(0,0.4); // Increase the current character so that we get a longer and longer substring above. Using fractional numbers allows us to slow down the pace.
}


function responsiveVoiceTimer() {
  if (voiceTimer == 0) { // Says, when the voiceTimer reaches zero (0), then...
    state = `tractorHonkOne`; // Change the state to tractorHonkOne.
    generateMater(); // Calls the generateMater function.
    generateTractors(); // Calls the generateTractors function.
  }
}


    // TRICKTIMER SETUP
function generateTrickTimer() {
  setInterval(trickTimer, 1000); // Creates a timer that calls the function trickTimer.
}


    // TRCIKTIMER FUNCTION
function trickTimer() {
  if (voiceTimer > 0) { // Says, if the timer is an interger greater then zero (0), then...
    voiceTimer--; // Decrease the number by 1.
  }
}


// RESPONSIVEVOICE FUNCTION
function talkingmater() {
  responsiveVoice.speak(voiceString, "Australian Male", { // Uses responsiveVoice api to speak the variable "voiceString" aloud.
    pitch: 1.1, // Increases the voice's pitch.
    rate: 0.70, // Decreases the voice's rate.
    volume: 1 // Sets the speakers voice to 100%.
  });
}



// tractorHonkOne FUNCTION
function tractorHonkOne() { // tractorHonkOne function
  background(colour.red.r, colour.red.g, colour.red.b); // Sets background to red in colour.

  createtractorHonkOneHeadingText(); // Calls the createtractorHonkOneHeadingText.
  createAudioInputLevel(); // Calls the createAudioInputLevels function.
  createMater(); // Calls the createMater function.
  createTractor(); // Calls the createTractor function.
  createStateChangeDelayTimer(); // Calls the createStateChangeDelay function.
}


function createtractorHonkOneHeadingText() {
  push(); // Isolates code from using global properties.
  textFont(`courier`); // Displays the text font as courier.
  textSize(fontSize.extraSmall); // Displays the font size as 32px.
  fill(colour.white.r, colour.white.g, colour.white.b); // Displays the instructions in white colour.
  textAlign(CENTER, CENTER); // Positions the text allignment to center.
  text(tipInstructionText.string, tipInstructionText.x, tipInstructionText.y); // Displays the Sub Heading.
  pop(); // Isolates code from using global properties.
}


    // CREATE AUDIO INPUT FUNCTION
function createAudioInputLevel() {
  let level = microphone.getLevel(); // Assigns level to getLevel function.

  if (level > minLoudness) {

    for (let i = 0; i < tractors.length; i++) { // Loop that counts to the value indicated in tractor.
      tractors[i].tip(); // Calls the tractor tip function, which makes the tractor rotate 90 degrees.
    }

    generateStateDelayTimer(); // Calls the generateStateDelayTimer which adds a 3 second delay to the state change.
    playHonk(); // Calls the playHonk function to add sound effect.
  }

  if (level > maxLoudness) {
    state = `chase`; // Changes the state to chase.
    generateFrank(); // Calls the generateFrank function.
  }

  console.log(level); // Console logs audio input for testing purposes.
}


// GENERATE MATER FUNCTION
function generateMater() {
  let x = 0; // Spawns mater at the x orgin point.
  let y = 0; // Spawns mater at the y orgin point.
  mater = new Mater (x, y, materImage); // Sends arguments to constructor in Mater.js.
}


// GENERATE TRACTOR FUNCTION
function generateTractors() { // Generates the animals.
  for (let i = 0; i < NUM_TRACTORS; i++) { // For loop to duplicate the animals.
    let x = random(0, width); // Random x postion for image placement.
    let y = random(0, height); // Random y postion for image placement.
    let tractorImage = random(tractorImages); // Random image from animalImages array.
    let tractor = new Tractor(x, y, tractorImage); // Sends parameters to constructor in Tractor class.
    tractors.push(tractor); // Add tractor into tractors array.
  }
}


    // CREATE MATER FUNCTION
function createMater() {
  mater.display(); // Calls the display class in Mater.js.
  mater.handleInput(); // Calls the handleInput class in Mater.js.
  mater.move(); // Calls the move class in Mater.js.
}


    // CREATE TRACTOR FUNCTION
function createTractor() {
  for (let i = 0; i < tractors.length; i++) { // Loop that counts to the value indicated in tractor.
    tractors[i].display();
    tractors[i].overlapMater(mater);
  }
}


    // CREATE STATECHANGEDELAY FUNCTION
function createStateChangeDelayTimer() {
  if (stateDelayTimer == 0) { // Says, when the voiceTimer reaches zero (0), then...
    state = `tractorHonkTwo`; // Change the state to tractorHonkTwo.
  }
}



// tractorHonkTwo FUNCTION
function tractorHonkTwo() {
  background(colour.green.r, colour.green.g, colour.green.b); // Sets background to green in colour.
  createtractorHonkTwoHeadingText(); // Calls the createtractorHonkTwoHeadingText.

  createAudioInputLevel(); // Calls the createAudioInputLevels function.
  createMater(); // Calls the createMater function.
  // createTractor();

  // NEED TO FIGURE OUT HOW TO DISPLAY TRACTOR WITH CREATETRACTOR RESET.

  createTractorReset(); // Calls the createTractorReset function
}


function createtractorHonkTwoHeadingText() {
  push(); // Isolates code from using global properties.
  textFont(`courier`); // Displays the text font as courier.
  textSize(fontSize.small); // Displays the font size as 32px.
  fill(colour.white.r, colour.white.g, colour.white.b); // Displays the instructions in white colour.
  textAlign(CENTER, CENTER); // Positions the text allignment to center.
  text(tractorRoundTwoText.string, tractorRoundTwoText.x, tractorRoundTwoText.y); // Displays the Sub Heading.
  pop(); // Isolates code from using global properties.
}

function createTractorReset() {
  for (let i = 0; i < tractors.length; i++) { // Loop that counts to the value indicated in tractor.
    tractors[i].reset(random(0, width), random(0, height));
  }
}


// tractorHonkThree FUNCTION
function tractorHonkThree() {
  background(colour.blue.r, colour.blue.g, colour.blue.b); // Sets background to blue in colour.
  createtractorHonkThreeHeadingText(); // Calls the createtractorHonkTwoHeadingText.
}


function createtractorHonkThreeHeadingText() {
  push(); // Isolates code from using global properties.
  textFont(`courier`); // Displays the text font as courier.
  textSize(fontSize.Small); // Displays the font size as 32px.
  fill(colour.white.r, colour.white.g, colour.white.b); // Displays the instructions in white colour.
  textAlign(CENTER, CENTER); // Positions the text allignment to center.
  text(tractorRoundThreeText.string, tractorRoundThreeText.x, tractorRoundThreeText.y); // Displays the Sub Heading.
  pop(); // Isolates code from using global properties.
}



// TOUCHTRACTOR FUNCTION
function touchTractor() {
  background(colour.black.r, colour.black.g, colour.black.b); // Sets background to red in colour.
  touchTractorHeadingText(); // Calls the touchTractorHeadingText.
}


function touchTractorHeadingText() {
  push(); // Isolates code from using global properties.
  textFont(`courier`); // Displays the text font as courier.
  textSize(fontSize.medium); // Displays the font size as 32px.
  fill(colour.white.r, colour.white.g, colour.white.b); // Displays the instructions in white colour.
  textAlign(CENTER, CENTER); // Positions the text allignment to center.
  text(touchTractorText.string, touchTractorText.x, touchTractorText.y); // Displays the Sub Heading.
  pop(); // Isolates code from using global properties.
}



// CHASE FUNCTION
function chase() {
  background(colour.grey.r, colour.grey.g, colour.grey.b); // Sets background to red in colour.
  chaseTractorHeadingText(); // Calls the touchTractorHeadingText.
  createFrank(); // Calls the createFrank function.
}


function chaseTractorHeadingText() {
  push(); // Isolates code from using global properties.
  textFont(`courier`); // Displays the text font as courier.
  textSize(fontSize.small); // Displays the font size as 32px.
  fill(colour.black.r, colour.black.g, colour.black.b); // Displays the instructions in black colour.
  textAlign(CENTER, CENTER); // Positions the text allignment to center.
  text(chaseText.string, chaseText.x, chaseText.y); // Displays the Sub Heading.
  pop(); // Isolates code from using global properties.
}


function createFrank() {
  frank.display(); // Calls the display class in frank.js.
  frank.overlapMater(mater); // Calls the overlap class in Mater.js.
  frank.move(); // Calls the move class in frank.js.
}


    // generateFrank
function generateFrank() {
  let x = random(320, 960); // Spawns Frank at a random position on the x axis.
  let y = 0; // Spawns Frank at the top of the canvas.
  frank = new Frank (x, y, frankImage); // Sends arguments to constructor in Frank.js.
}



// LOSER FUNCTION
function loser() { // loser function
  background(colour.brightRed.r, colour.brightRed.g, colour.brightRed.b); // Sets background to brightRed in colour.
  loserHeadingText(); // Calls the loserHeadingText function.
}


function loserHeadingText() {
  push(); // Isolates code from using global properties.
  textFont(`courier`); // Displays the text font as courier.
  textSize(fontSize.medium); // Displays the font size as 32px.
  fill(colour.white.r, colour.white.g, colour.white.b); // Displays the instructions in white colour.
  textAlign(CENTER, CENTER); // Positions the text allignment to center.
  text(loserText.string, loserText.x, loserText.y); // Displays the Sub Heading.
  pop(); // Isolates code from using global properties.
}



// WINNER FUNCTION
function winner() { // loser function
  background(colour.brightGreen.r, colour.brightGreen.g, colour.brightGreen.b); // Sets background to brightRed in colour.
  winnerHeadingText(); // Calls the loserHeadingText function.
}


function winnerHeadingText() {
  push(); // Isolates code from using global properties.
  textFont(`courier`); // Displays the text font as courier.
  textSize(fontSize.medium); // Displays the font size as 32px.
  fill(colour.white.r, colour.white.g, colour.white.b); // Displays the instructions in white colour.
  textAlign(CENTER, CENTER); // Positions the text allignment to center.
  text(winnerText.string, winnerText.x, winnerText.y); // Displays the Sub Heading.
  pop(); // Isolates code from using global properties.
}



















// KEYPRESSED FUNCTION
function keyPressed () { // p5 function to perform action with keyboard input.
  if (keyCode === 13 && state === `landing`) { // When the "Enter" key is pushed, and the state is in "landing", switch to the "instruction" state.
    state = `instruction`; // Runs the "simulation" state.
    talkingmater(); // Calls the talkingmater function which uses responsive voice api.
    generateTrickTimer(); // Calls the generateTrickTimer fnction.
  }
}


// LOADIMAGES FUNCTION
function loadImages() {
  materImage = loadImage (`assets/images/materRight.png`) // Preloads the image of mater for efficient load times.
  frankImage = loadImage (`assets/images/frankTest.png`) // Preloads the image of frank for efficient load times.


  for (let i = 0; i < NUM_TRACTOR_IMAGES; i++) { // Loop that counts up by 1 untill 3.
    let tractorImage = loadImage(`assets/images/tractor${i}.png`); // Load tractor images dynamically.
    tractorImages.push(tractorImage); // Push's the animal images into the array.
  }
}


// LOADFONTS FUNCTION
function loadSounds() {
  gameSound.honkSFX = loadSound (`./assets/sounds/honk.mp3`); // Preloads the "horn" sound effect for efficient load times.
}


// LOADFONTS FUNCTION
function loadFonts() {
  titleFont = loadFont ("assets/fonts/disney.ttf") // Preloads the custom downloaded font for efficient load times.
  disneyFont = loadFont ("assets/fonts/disney.ttf") // Preloads the custom downloaded font for efficient load times.
}


// STATEDELAY SETUP
function generateStateDelayTimer() {
  setInterval(stateDelay, 1000); // Creates a timer that calls the function trickTimer.
}


// STATEDELAY FUNCTION
function stateDelay() {
  if (stateDelayTimer > 0) { // Says, if the timer is an interger greater then zero (0), then...
    stateDelayTimer--; // Decrease the number by 1.
  }
}


// HONK FUNCION
function playHonk() {
  if (!gameSound.honkSFX.isPlaying()) { // States that if the horn sound effect is not playing, it will be played.
    gameSound.honkSFX.play();
  }
}
