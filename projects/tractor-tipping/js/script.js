
// A Night at the Movies - Tractor Tipping
// Owen Avon

// Tip Tractors with the use of voice. See README.md for a more elaborate program breakdown.

"use strict";

let state = `landing`; // Provides the starting state. Can be "landing", "instruction" "tractorHonkOne", "tractorHonkTwo", "tractorHonkThree", "frankChase", "winner", "loser".
let disneyFont; // Defines custom disneyFont.
let titleFont; // Defines custom titleFont.

let voiceTimer = 10; // Sets the voiceTimer to 10 seconds.
let voiceWinnerTimer = 9; // Sets the voiceWinnerTimer to 9 seconds.
let voiceLoserTimer = 3; // Sets the voiceLoserTimer to 3 seconds.

let stateDelayTimerOne = 3; // Sets the stateDelayTimerOne to 3 seconds.
let stateDelayTimerTwo = 3; // Sets the stateDelayTimerTwo to 3 seconds.
let stateDelayTimerThree = 3; // Sets the stateDelayTimerThree to 3 seconds.

let stateDelayLoser = 3; // Sets th stateDelayLoser to 3 seconds.

let introCurrentCharacter = 0; // Starts without showing any characters on screen.

let loserCurrentCharacter = 0; // Starts without showing any characters on screen.
let winnerCurrentCharacter = 0; // Starts without showing any characters on screen.

let pageMargin = 50; // Page margins for a sheet of paper effect.

let microphone; // Defines microphone for AudioInput.
let minLoudness = 1.5; // Assigns a minimum loudness value. Any value below this will have no action.
let maxLoudness = 4.0; // Assigns a maximum loudness value. Any value above this will trigger Frank.

let materImage = undefined; // Assigns materImage as undefined.
let mater = undefined; // Assigns mater as undefined.

const NUM_TRACTOR_IMAGES = 3; // 3 different tractor images. Constant value, so it will not be changed throughout the program.
const NUM_TRACTORS = 1; // 1 Tractor object is created, and will not be changed throughout the program.

let tractorImages = []; // Empty anmimal images array.
let tractors = []; // Empty animal object array.

let frankImage = undefined; // Assigns frankImage as undefined.
let frank = undefined; // Assigns frank as undefined.

let introGif = undefined; // Assigns introGif as undefined.
let loserGif = undefined; // Assigns loserGif as undefined.
let winnerGif = undefined; // Assigns winnerGif as undefined.


let introVoiceString = `
K here's what you do.
You just sneak up in front of 'em and then honk.
And they do the rest.
Watch!`; // The text that the typewriter will write.

let tractorHonkOneVoiceString = `
Use the arrow keys to move Mater near tractor. When close, "honk" into the microphone, but not to loud. Make sure you don't touch tractor...`;

let tractorHonkTwoVoiceString = `
Fun eh!? Why don't you try er again?`;

let tractorHonkThreeVoiceString = `
Maybe one last time? You know, for good luck...`;

let frankSceneVoiceString = `
Uh oh, all that noise caught Franks attention. You bettrt get above Frank!`;

let loserVoiceString = `
That's Frank!`; // The text that the typewriter will write.

let winnerVoiceString = `
Haha haha, I swear tractors is so dumb.
I'll tell you what buddy,
it don't get much better!`; // The text that the typewriter will write.


let disneyText = {
  string: `Disney PIXAR`,
  x: 640,
  y: 235
};


let titleText = {
  string: `Tractor Tipping`,
  x: 640,
  y: 360
};

let startText = {
  string: `Press ENTER to Start Tipping`,
  x: 640,
  y: 500
};


let fontSize = {
  extraSmall: 18, // Sets a font size of 18px.
  small: 22, // // Sets a font size of 22px.
  medium: 32, // Sets a font size of 32px.
  large: 96 // Sets a font size of 96px.
};


let gameSound = {
  honkSFX: undefined, // Sets honkSFX as a variable.
  combineSFX: undefined // Sets combineSFX as a variable.
};


let colour = {
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
    b: 60
  },
  orange: {
    r: 200,
    g: 120,
    b: 0
  },
  grey: {
    r: 175,
    g: 175,
    b: 175
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



// GENERATE MATER FUNCTION
function generateMater() {
  let x = 160; // Spawns mater at the x orgin point.
  let y = 80; // Spawns mater at the y orgin point.
  mater = new Mater (x, y, materImage); // Sends arguments to constructor in Mater.js.
}



// GENERATE TRACTOR FUNCTION
function generateTractors() { // Generates the animals.
  for (let i = 0; i < NUM_TRACTORS; i++) { // For loop to duplicate the animals.
    let x = random(640, 1280); // Random x postion for image placement.
    let y = random(150, 570); // Random y postion for image placement.
    let tractorImage = random(tractorImages); // Random image from animalImages array.
    let tractor = new Tractor(x, y, tractorImage); // Sends parameters to constructor in Tractor class.
    tractors.push(tractor); // Add tractor into tractors array.
  }
}



// generateFrank
function generateFrank() {
  let x = random(260, 1020); // Spawns Frank at a random position on the x axis.
  let y = 0; // Spawns Frank at the top of the canvas.
  frank = new Frank (x, y, frankImage); // Sends arguments to constructor in Frank.js.
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
  else if (state === `frankChase`) { // Indicates that when the state equates to "frankChase", start said state.
    frankChase(); // Calls frankChase function.
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
  background(colour.blue.r, colour.blue.g, colour.blue.b); // Sets background to purple in colour.
  disneyPixarText(); // Calls the disneyPixarText function.
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


function headingText() {
  push(); // Isolates code from using global properties.
  textFont(titleFont); // Displays the text font as magnetob.ttf.
  textSize(fontSize.large); // Displays the font size 96px.
  fill(colour.orange.r, colour.orange.g, colour.orange.b); // Displays the instructions in orange colour.
  textAlign(CENTER, CENTER); // Positions the text allignment to center.
  text(titleText.string, titleText.x, titleText.y); // Displays the title of the game.
  pop(); // Isolates code from using global properties.
}


function startingText() {
  push(); // Isolates code from using global properties.
  textFont(`calibri`); // Displays the text font as calibri.
  textSize(fontSize.small); // Displays the font size as 22px.
  fill(colour.grey.r, colour.grey.g, colour.grey.b); // Displays the instructions in white colour.
  textAlign(CENTER, CENTER); // Positions the text allignment to center.
  text(startText.string, startText.x, startText.y); // Displays the Sub Heading.
  pop(); // Isolates code from using global properties.
}



// INSTRUCTION FUNCTION
function instruction() {
  background(introGif); // Sets background to black in colour.
  generateIntroCaption(); // Calls the generateIntroCaption function.
  responsiveVoiceTimer(); // Calls the responsiveVoiceTimer function.
}


function generateIntroCaption() {
  let currentString = introVoiceString.substring(0, introCurrentCharacter); // The substring() method will return all the characters of a string between the starting and ending positions (starts at 0).

  push(); // Isolates code from using global properties.
  fill(colour.grey.r, colour.grey.g, colour.grey.b); // Displays the written text in grey
  textSize(fontSize.medium); // Displays the font size as 32px.
  textFont(`Calibri`); // Displays the text font as calibri.
  textAlign(CENTER, TOP); // Positions the text allignment to top left.
  text(currentString, pageMargin + 600, pageMargin + 400); // Draw the current string on the page, with some margins.
  pop(); // Isolates code from using global properties.

  introCurrentCharacter += random(0,0.45); // Increase the current character so that we get a longer and longer substring above. Using fractional numbers allows us to slow down the pace.
}


function responsiveVoiceTimer() {
  if (voiceTimer == 0) { // Says, when the voiceTimer reaches zero (0), then...
    state = `tractorHonkOne`; // Change the state to tractorHonkOne.
    generateMater(); // Calls the generateMater function.
    generateTractors(); // Calls the generateTractors function.
    talkingTractorHonkOne(); // Calls the talkingTractorHonkOne function.
  }
}



// tractorHonkOne FUNCTION
function tractorHonkOne() { // tractorHonkOne function
  background(colour.red.r, colour.red.g, colour.red.b); // Sets background to red in colour.
  updateStateOneDelayTimer(); // Calls the updateStateOneDelayTimer function.

  updateAudioInputLevel(); // Calls the updateAudioInputLevels function.
  updateMater(); // Calls the updateMater function.
  updateTractor(); // Calls the updateTractor function.
}


// UPDATE STATEONE DELAY ONE FUNCTION
function updateStateOneDelayTimer() {
  if (stateDelayTimerOne == 0) { // Says, when the voiceTimer reaches zero (0), then...
    state = `tractorHonkTwo`; // Change the state to tractorHonkTwo.
    updateTractorReset(); // Calls the updateTractorReset function.
    talkingTractorHonkTwo(); // Calls the talkingTractorHonkTwo function.
  }
}



// tractorHonkTwo FUNCTION
function tractorHonkTwo() {
  background(colour.green.r, colour.green.g, colour.green.b); // Sets background to green in colour.
  updateStateTwoDelayTimer(); // Calls the updateStateTwoDelayTimer function.

  updateAudioInputLevel(); // Calls the updateAudioInputLevels function.
  updateMater(); // Calls the createMater function.
  updateTractor(); // Calls the updateTractor function.
}



// UPDATE STATE ONE DELAY TIMER FUNCTION
function updateStateTwoDelayTimer() {
  if (stateDelayTimerTwo == 0) { // Says, when the voiceTimer reaches zero (0), then...
  state = `tractorHonkThree`; // Change the state to tractorHonkTwo.
  updateTractorReset(); // Calls the updateTractorReset function.
  talkingTractorHonkThree(); // Calls the talkingTractorHonkThree function.
  }
}




// tractorHonkThree FUNCTION
function tractorHonkThree() {
  background(colour.blue.r, colour.blue.g, colour.blue.b); // Sets background to blue in colour.
  updateStateThreeDelayTimer(); // Calls the updateStateOneDelayTimer function.

  updateAudioInputLevel(); // Calls the updateAudioInputLevels function.
  updateMater(); // Calls the createMater function.
  updateTractor(); // Calls the updateTractor function.
}



// UPDATESTATE THREE DELAY TIMER FUNCTION
function updateStateThreeDelayTimer() {
  if (stateDelayTimerThree == 0) { // Says, when the voiceTimer reaches zero (0), then...
  state = `frankChase`; // Change the state to winner.
  generateFrank(); // Calls the generateFrank function.
  talkingFrankScene(); // Calls the talkingFrankScene.
  }
}



// frankChase FUNCTION
function frankChase() {
  background(colour.grey.r, colour.grey.g, colour.grey.b); // Sets background to red in colour.

  updateMater(); // Calls the createMater function.
  updateFrank(); // Calls the updateFrank function.
  playCombineSound(); // Calls the playCombineSound function.
}



// LOSER FUNCTION
function loser() { // loser function
  background(loserGif); // Sets background to loserGif.
  updateDelayedLoserCaption(); // Calls the updateDelayedLoserCaption function.

  stopCombineSound(); // Calls the stopCombineSound function.
}



// UPDATE DEALYED LOSER CAPTION
function updateDelayedLoserCaption() {
  if (stateDelayLoser == 1) { // Says, when the stateDelayLoser reaches three (3), then...
    generateLoserCaption(); // Calls the generateLoserCaption
    talkingMaterLoser(); // Calls the talkingMaterLoser function in script.js
  }
}



// WINNER FUNCTION
function winner() { // loser function
  background(winnerGif); // Sets background to winnerGif.
  generateWinnerCaption(); // Calls the generateWinnerCaption function.

  stopCombineSound(); // Calls the stopCombineSound function.
}


function generateWinnerCaption() {
  let winnerCurrentString = winnerVoiceString.substring(0, winnerCurrentCharacter); // The substring() method will return all the characters of a string between the starting and ending positions (starts at 0).

  push(); // Isolates code from using global properties.
  fill(colour.grey.r, colour.grey.g, colour.grey.b); // Displays the written text in grey
  textSize(fontSize.medium); // Displays the font size as 32px.
  textFont(`Calibri`); // Displays the text font as calibri.
  textAlign(CENTER, TOP); // Positions the text allignment to top left.
  text(winnerCurrentString, pageMargin + 600, pageMargin + 400); // Draw the current string on the page, with some margins.
  pop(); // Isolates code from using global properties.

  winnerCurrentCharacter += random(0,0.45); // Increase the current character so that we get a longer and longer substring above. Using fractional numbers allows us to slow down the pace.
}







// LOADIMAGES FUNCTION
function loadImages() {
  materImage = loadImage (`assets/images/materRight.png`) // Preloads the image of mater for efficient load times.
  frankImage = loadImage (`assets/images/frankTest.png`) // Preloads the image of frank for efficient load times.
  introGif = loadImage (`assets/images/introGif.gif`) // Preloads the introGif for efficient load times.
  loserGif = loadImage (`assets/images/loserGif.gif`) // Preloads the loserGif for efficient load times.
  winnerGif = loadImage (`assets/images/winnerGif.gif`) // Preloads the winnerGif for efficient load times.


  for (let i = 0; i < NUM_TRACTOR_IMAGES; i++) { // Loop that counts up by 1 untill 3.
    let tractorImage = loadImage(`assets/images/tractor${i}.png`); // Load tractor images dynamically.
    tractorImages.push(tractorImage); // Push's the animal images into the array.
  }
}



// LOADFONTS FUNCTION
function loadSounds() {
  gameSound.honkSFX = loadSound (`./assets/sounds/honk.mp3`); // Preloads the "honk" sound effect for efficient load times.
  gameSound.combineSFX = loadSound (`./assets/sounds/combine.mp3`); // Preloads the "combine" sound effect for efficient load times.
}



// LOADFONTS FUNCTION
function loadFonts() {
  titleFont = loadFont ("assets/fonts/magneto.ttf") // Preloads the custom downloaded font for efficient load times.
  disneyFont = loadFont ("assets/fonts/disney.ttf") // Preloads the custom downloaded font for efficient load times.
}



// KEYPRESSED FUNCTION
function keyPressed () { // p5 function to perform action with keyboard input.
  if (keyCode === 13 && state === `landing`) { // When the "Enter" key is pushed, and the state is in "landing", switch to the "instruction" state.
    state = `instruction`; // Runs the "simulation" state.
    talkingMaterIntro(); // Calls the talkingMaterIntro function which uses responsive voice api.
    generateStateVoiceDelay(); // Calls the generateStateVoiceDelay function.
  }
}



// TALKING MATER INTRO FUNCTION
function talkingMaterIntro() {
  responsiveVoice.speak(introVoiceString, "Australian Male", { // Uses responsiveVoice api to speak the variable "introVoiceString" aloud.
    pitch: 1.1, // Increases the voice's pitch.
    rate: 0.80, // Decreases the voice's rate.
    volume: 1 // Sets the speakers voice to 100%.
  });
}


// TALKING VOICE IN TRACTOR HONK ONE
function talkingTractorHonkOne() {
  responsiveVoice.speak(tractorHonkOneVoiceString, "UK English Female", { // Uses responsiveVoice api to speak the variable "tractorHonkOneVoiceString" aloud.
    pitch: 1, // Increases the voice's pitch.
    rate: 1, // Decreases the voice's rate.
    volume: 1 // Sets the speakers voice to 100%.
  });
}


// TALKING VOICE IN TRACTOR HONK TWO
function talkingTractorHonkTwo() {
  responsiveVoice.speak(tractorHonkTwoVoiceString, "UK English Female", { // Uses responsiveVoice api to speak the variable "tractorHonkTwoVoiceString" aloud.
    pitch: 1, // Increases the voice's pitch.
    rate: 1, // Decreases the voice's rate.
    volume: 1 // Sets the speakers voice to 100%.
  });
}


// TALKING VOICE IN TRACTOR HONK THREE
function talkingTractorHonkThree() {
  responsiveVoice.speak(tractorHonkThreeVoiceString, "UK English Female", { // Uses responsiveVoice api to speak the variable "tractorHonkThreeVoiceString" aloud.
    pitch: 1, // Increases the voice's pitch.
    rate: 1, // Decreases the voice's rate.
    volume: 1 // Sets the speakers voice to 100%.
  });
}


// TALKING VOICE IN TALKING FRANK
function talkingFrankScene() {
  responsiveVoice.speak(frankSceneVoiceString, "UK English Female", { // Uses responsiveVoice api to speak the variable "frankSceneVoiceString" aloud.
    pitch: 1, // Increases the voice's pitch.
    rate: 1, // Decreases the voice's rate.
    volume: 1 // Sets the speakers voice to 100%.
  });
}


// TALKING MATER LOSER FUNCTION
function talkingMaterLoser() {
  responsiveVoice.speak(loserVoiceString, "Australian Male", { // Uses responsiveVoice api to speak the variable "introVoiceString" aloud.
    pitch: 1.1, // Increases the voice's pitch.
    rate: 0.80, // Decreases the voice's rate.
    volume: 1 // Sets the speakers voice to 100%.
  });
}


// TALKING MATER WINNER FUNCTION
function talkingMaterWinner() {
  responsiveVoice.speak(winnerVoiceString, "Australian Male", { // Uses responsiveVoice api to speak the variable "introVoiceString" aloud.
    pitch: 1.1, // Increases the voice's pitch.
    rate: 0.80, // Decreases the voice's rate.
    volume: 1 // Sets the speakers voice to 100%.
  });
}


// UPDATE FRANK FUNCTION
function updateFrank() {
  frank.display(); // Calls the display class in frank.js.
  frank.overlapMater(mater); // Calls the overlap class in Mater.js.
  frank.move(mater); // Calls the move class in frank.js.
}



// UPDATE MATER FUNCTION
function updateMater() {
  mater.display(); // Calls the display class in Mater.js.
  mater.handleInput(); // Calls the handleInput class in Mater.js.
  mater.move(); // Calls the move class in Mater.js.
}



// UPDATE TRACTOR FUNCTION
function updateTractor() {
  for (let i = 0; i < tractors.length; i++) { // Loop that counts to the value indicated in tractor.
    tractors[i].display(); // Calls the display function in tractor.js while in the tractors array.
    tractors[i].constrain(); // Calls the constrain function in tractor.js while in the tractors array.
    tractors[i].overlapMater(mater); // Calls the overlap function in tractor.js while in the tractors array.
    tractors[i].distanceToMater(mater); // Calls the distanceToMater function in tractor.js while in the tractors array.
  }
}


// UPDATE TRACTOR RESET FUNCTION
function updateTractorReset() {
  for (let i = 0; i < tractors.length; i++) { // Loop that counts to the value indicated in tractor.
    tractors[i].reset(random(640, 1280), random(150, 570), random(tractorImages)); // Re-positions a random tractor from the tractor array within the given X and Y coordinates.
  }
}

// HONK FUNCTION
function playHonk() {
  if (!gameSound.honkSFX.isPlaying()) { // States that if the honk sound effect is not playing, then...
    gameSound.honkSFX.play(); // Plays combineSFX.
  }
}


// COMBINE FUNCTION
function playCombineSound() {
  if (!gameSound.combineSFX.isPlaying()) { // States that if the cobine sound effect is playing, then...
    gameSound.combineSFX.play(); // Stop combineSFX.
  }
}


// COMBINE FUNCION
function stopCombineSound() {
  gameSound.combineSFX.stop();
}



// CREATE AUDIO INPUT FUNCTION
function updateAudioInputLevel() {
  let level = microphone.getLevel(); // Assigns level to getLevel function.



  if (level > minLoudness) {

    if (state === `tractorHonkOne`) {
      generateStateDelayOne(); // Calls the generateStateDelayTimer which adds a 3 second delay to the state change.
    }

    else if (state === `tractorHonkTwo`) {
      generateStateDelayTwo(); // Calls the generateStateDelayTimer which adds a 3 second delay to the state change.
    }

    else if (state === `tractorHonkThree`) {
      generateStateDelayThree(); // Calls the generateStateDelayTimer which adds a 3 second delay to the state change.
    }

    for (let i = 0; i < tractors.length; i++) { // Loop that counts to the value indicated in tractor.
      tractors[i].tip(); // Calls the tractor tip function, which makes the tractor rotate 90 degrees.
    }
    playHonk(); // Calls the playHonk function to add sound effect.
  }

  if (level > maxLoudness) {
    state = `frankChase`; // Changes the state to frankChase.
    generateFrank(); // Calls the generateFrank function.
    talkingFrankScene() // Calls the talkingFrankScene function.
    playCombineSound(); // Calls the playCombineSound function.

  }

  console.log(level); // Console logs audio input for testing purposes.
}


// GENERATE STATE VOICE DELAY SETUP
function generateStateVoiceDelay() {
  setInterval(stateVoiceDelay, 1000); // Creates a timer that calls the function trickTimer.
}


// STATE VOICE DELAY FUNCTION
function stateVoiceDelay() {
  if (voiceTimer > 0) { // Says, if the timer is an interger greater then zero (0), then...
    voiceTimer--; // Decrease the number by 1.
  }
}


// STATE DELAY ONE SETUP
function generateStateDelayOne() {
  setInterval(stateDelayOne, 1000); // Creates a timer that calls the function stateDelayOne.
}


// STATE DELAY ONE FUNCTION
function stateDelayOne() {
  if (stateDelayTimerOne > 0) { // Says, if the timer is an interger greater then zero (0), then...
    stateDelayTimerOne--; // Decrease the number by 1.
  }
}


// STATE DELAY TWO SETUP
function generateStateDelayTwo() {
  setInterval(stateDelayTwo, 1000); // Creates a timer that calls the function stateDelayTwo.
}


// STATE DELAY TWO FUNCTION
function stateDelayTwo() {
  if (stateDelayTimerTwo > 0) { // Says, if the timer is an interger greater then zero (0), then...
    stateDelayTimerTwo--; // Decrease the number by 1.
  }
}


// STATE DELAY THREE SETUP
function generateStateDelayThree() {
  setInterval(stateDelayThree, 1000); // Creates a timer that calls the function stateDelayThree.
}


// STATE DELAY THREE FUNCTION
function stateDelayThree() {
  if (stateDelayTimerThree > 0) { // Says, if the timer is an interger greater then zero (0), then...
    stateDelayTimerThree--; // Decrease the number by 1.
  }
}


// GENERATE STATE VOICE LOSER SETUP
function generateLoserDelay() {
  setInterval(stateLoserDelay, 1000); // Creates a timer that calls the function trickTimer.
}


// STATE VOICE LOSER FUNCTION
function stateLoserDelay() {
  if (voiceLoserTimer > 0) { // Says, if the timer is an interger greater then zero (0), then...
    voiceLoserTimer--; // Decrease the number by 1.
  }
  else if (voiceLoserTimer === 0) { // Says, if the timer reaches zero (0), then...
    location.reload(); // Reload the program.
  }
}


// GENERATE STATE VOICE WINNER SETUP
function generateWinnerDelay() {
  setInterval(stateWinnerDelay, 1000); // Creates a timer that calls the function trickTimer.
}


// STATE VOICE WINNER FUNCTION
function stateWinnerDelay() {
  if (voiceWinnerTimer > 0) { // Says, if the timer is an interger greater then zero (0), then...
    voiceWinnerTimer--; // Decrease the number by 1.
  }
  else if (voiceWinnerTimer === 0) { // Says, if the timer reaches zero (0), then...
    location.reload(); // Reload the program.
  }
}



// STATE DELAY THREE SETUP
function generateDelayWaitLoser() {
  setInterval(stateDelayLoserWait, 1000); // Creates a timer that calls the function stateDelayThree.
}


// STATE DELAY THREE FUNCTION
function stateDelayLoserWait() {
  if (stateDelayLoser > 0) { // Says, if the timer is an interger greater then zero (0), then...
    stateDelayLoser--; // Decrease the number by 1.
  }
}



function generateLoserCaption() {
  let loserCurrentString = loserVoiceString.substring(0, loserCurrentCharacter); // The substring() method will return all the characters of a string between the starting and ending positions (starts at 0).

  push(); // Isolates code from using global properties.
  fill(colour.grey.r, colour.grey.g, colour.grey.b); // Displays the written text in grey
  textSize(fontSize.medium); // Displays the font size as 32px.
  textFont(`Calibri`); // Displays the text font as calibri.
  textAlign(CENTER, TOP); // Positions the text allignment to top left.
  text(loserCurrentString, pageMargin + 600, pageMargin + 400); // Draw the current string on the page, with some margins.
  pop(); // Isolates code from using global properties.

  loserCurrentCharacter += random(0,0.45); // Increase the current character so that we get a longer and longer substring above. Using fractional numbers allows us to slow down the pace.
}
