
// Bubble Popper Plus Plus Exercise
// Owen Avon

// Pop bubbles with your index finger as a pin. Achieve 25 points to win. Don't miss more than two balloons.
// ml5.js Handpose: https://learn.ml5js.org/#/reference/handpose

"use strict";

let state = `landing`; // Starts the program in the loading state.
let video = undefined; // Stores the user's webcam.

let handpose = undefined; // The handpose model.
let predictions = []; // The current set of predictions.

let score = 0; // Starts the score board at "0".
let bubble = undefined; // The single bubble.
let bubbleReset = 0; // Starts with no bubbleResets.

let gameTitleFont; // Defines custom gameTitleFont.
let red = 0; // Sets intial red variable to black in colour.
let green = 0; // Sets intialgrren variable to black in colour.
let blue = 0; // Sets intial blue variable to black in colour.


let lives = { // Defines the lives.
  x: 540,
  y: 60,
  size: 10,
  remaining: 4
};


let titleText = {
  string: `BALLOON DEFLATOR`,
  x: 320,
  y: 85
};

let startText = {
  string: `"Click" to begin`,
  x: 320,
  y: 240
};

let instructionText = {
  string: `Use your index finger to pop the balloons.`,
  x: 320,
  y: 400
};

let instructionSubText = {
  string: `Achieve 25 points to win. Don't miss more than two balloons.`,
  x: 320,
  y: 425
};

let winnerText = {
  string: `Yahoo, you popped all the balloons! Be proud of your accomplishment.`,
  x: 320,
  y: 240
};

let loserText = {
  string: `You let too many balloons escape. You make the children cry.`,
  x: 320,
  y: 240
};

let fontSize = {
  small: 16, // Sets a font size of 16px.
  medium: 22, // Sets a font size of 22px.
  large: 50 // Sets a font size of 48px.
};

let colour = {
  white: {
    r: 255,
    g: 255,
    b: 255
  },
  grey: {
    r: 214,
    g: 206,
    b: 195
  },
  red: {
    r: 255,
    g: 0,
    b: 0
  },
  green: {
    r: 0,
    g: 175,
    b: 0
  },
  blue: {
    r: 0,
    g: 50,
    b: 100
  }
}

let gameSound = {
  winnerSFX: undefined, // Sets winnerSFX as a variable.
  loserSFX: undefined // Sets loserSFX as a variable.
};


// PRELOAD FUNCTION
function preload () { // P5 function that loads assets prior to starting the simulation.
  gameTitleFont = loadFont ("assets/fonts/bubble.ttf") // Preloads the custom downloaded font for efficient load times.

  gameSound.winnerSFX = loadSound(`./assets/sounds/clap.wav`); // Preloads the "clap.wav" for efficient load times.
  gameSound.loserSFX = loadSound(`./assets/sounds/cry.wav`); // Preloads the "cry.wav" for efficient load times.
}


// SETUP FUNCTION
function setup() {
  createCanvas(640, 480); // Sets the canvas size to 4:3 aspect ratio.
}


// DRAW FUNCTION
function draw() {
  if (state === `landing`) {
    landing(); // Calls the landing function.
  }
  else if (state === `loadWebcam`) {
    loadWebcam(); // Calls the loadWebcam function.
  }
  else if (state === `loadHandpose`) {
    loadHandpose(); // Calls the loadModel function.
  }
  else if (state === `simulation`) {
    simulation(); // Calls the simulation function.
  }
  else if (state === `winner`) {
    winner(); // Calls the winner function.
  }
  else if (state === `loser`) {
    loser(); // Calls the loser function.
  }
}


function landing() {
  background(colour.blue.r, colour.blue.g, colour.blue.b); // Sets the background to blue in colour.
  displayTitleText(); // Calls displayTitleText function
  displayStartText(); // Calls displayStartText function.
  displayInstructionText(); // Calls displayInstructionText function.
  displayInstructionSubText(); // Calls displaySubInstructionText function.
}


function displayTitleText() {
  push(); // Isolates code from using global properties.
  textFont(gameTitleFont); // Displays customFont.otf.
  textSize(fontSize.large); // Displays the font size 36px.
  fill(colour.grey.r, colour.grey.g, colour.grey.b); // Displays the instructions in orange colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(titleText.string, titleText.x, titleText.y); // // Displays the game header text.
  pop(); // Isolates code from using global properties.
}


// Displays the instruction subtext on the landing screen.
function displayStartText() {
  push(); // Isolates code from using global properties.
  textFont(`century gothic`); // Displays customFont.ttf.
  textSize(fontSize.medium); // Displays the font size 22px.
  fill(colour.grey.r, colour.grey.g, colour.grey.b); // Displays the instructions in orange colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(startText.string, startText.x, startText.y); // Displays the start game text.
  pop(); // Isolates code from using global properties.
}


// Displays the header text on the landing screen.
function displayInstructionText() {
  push(); // Isolates code from using global properties.
  textFont(`century gothic`); // Displays customFont.ttf.
  textSize(fontSize.small); // Displays the font size 16px.
  fill(colour.grey.r, colour.grey.g, colour.grey.b); // Displays the instructions in orange colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(instructionText.string, instructionText.x, instructionText.y); // Displays the game instructions text.
  pop(); // Isolates code from using global properties.
}


// Displays the instruction text on the landing screen.
function displayInstructionSubText() {
  push(); // Isolates code from using global properties.
  textFont(`century gothic`); // Displays customFont.ttf.
  textSize(fontSize.small); // Displays the font size 16px.
  fill(colour.grey.r, colour.grey.g, colour.grey.b); // Displays the instructions in orange colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(instructionSubText.string, instructionSubText.x, instructionSubText.y); // Displays the game instructions subtext.
  pop(); // Isolates code from using global properties.
}


// Handpose loadWebcam screen.
function loadWebcam() {
  background(255); // Sets the background to white in colour.
  displayWebcamLoadingText(); // Calls the displayLoadingText.
}


// Displays displayWebcamLoadingText on screen.
function displayWebcamLoadingText() {
  push(); // Isolates code from using global properties.
  textSize(fontSize.large); // Displays the font size 36px.
  textStyle(BOLD); // Bolds the text.
  textAlign(CENTER, CENTER); // Aligns the text in the center.
  text(`Loading Webcam...`, width / 2, height / 2); // Displays the text on screen with dynamic variable.
  fill(0); // Displays the text as white in colour.
  pop(); // Isolates code from using global properties.
}


function loadHandpose() {
  background(255); // Sets the background to white in colour.
  displayModelLoadingText(); // Calls the displayModelLoadingText.
}


// Displays displayModelLoadingTex on screen.
function displayModelLoadingText() {
  push(); // Isolates code from using global properties.
  textSize(fontSize.large); // Displays the font size 36px.
  textStyle(BOLD); // Bolds the text.
  textAlign(CENTER, CENTER); // Aligns the text in the center
  text(`Loading Handpose...`, width / 2, height / 2); // Displays the text on screen with dynamic variable
  fill(0); // Displays the text as white in colour.
  pop(); // Isolates code from using global properties.
}


// Calls function to run in the simulation state.
function simulation() {
  background(red, green, blue); // Sets the default background to black in colour.
  displayIndexPosition(); // Calls the displayIndexPosition function.
  displaySetBubbleVelocity(); // Calls the displaySetBubbleVelocity function.
  displayRelocateBubble(); // Calls the displayRelocateBubble function.
  displayBubble(); // Calls the displayBubble function.
  displayScoreboard(); // Calls the displayScoreboard function.
  displayLives(); // Calls the displayLives function.
}


// Associates handpose to index finger.
function displayIndexPosition() {
  if (predictions.length > 0) { // If the camera detects handpose, then...
    let hand = predictions [0]; // Assigns "hand" to postion 0 of predictions.
    let index = hand.annotations.indexFinger; // Assigns "index" to information found in handpose annotation information.
    let tip = index[3]; // Assigns index tip to position in array.
    let base = index[0]; // Assigns index base to position in array.
    let tipX = tip[0]; // Assigns X position of tip.
    let tipY = tip[1]; // Assigns Y position of tip.
    let baseX = base[0]; // Assigns X position of base.
    let baseY = base[1]; // Assigns y position of base.

    displayPinBody(hand, index, tip, base, tipX, tipY, baseX, baseY); // Calls the displayPinBody function.
    displayPinHead(hand, index, tip, base, tipX, tipY, baseX, baseY); // Calls the displayPinHead function.
    displayBubblePop(hand, index, tip, base, tipX, tipY, baseX, baseY); // Calls the displayBubblePop function.
  }
}


// Pin Body.
function displayPinBody(hand, index, tip, base, tipX, tipY, baseX, baseY) {
  push(); // Isolates code from using global properties.
  noFill(); // Indicates that the line has no fill.
  stroke(255, 255, 255); // Sets the stroke to white in colour
  strokeWeight(2); // Displays the stroke weight slighty thicker.
  line(baseX, baseY, tipX, tipY); // Draws the line from base x,y to tip x,y.
  pop(); // Isolates code from using global properties.
}


// Pin Head.
function displayPinHead(hand, index, tip, base, tipX, tipY, baseX, baseY) {
  push(); // Isolates code from using global properties.
  noStroke(); // Indicates that the there is no stroke.
  fill(255, 0, 0); // Displays the base ellipse as red in colour.
  ellipse(baseX, baseY, 20); // Draws an ellipse at the base end of the pin, at a size of 20px.
  pop(); // Isolates code from using global properties.
}


// Check if the bubble pops.
function displayBubblePop(hand, index, tip, base, tipX, tipY, baseX, baseY) {
let d = dist(tipX, tipY, bubble.x, bubble.y); // Assign the distance between index tip, base and bubble.
  if (d < bubble.size / 2) { // If the distance is less then half the bubbles size, then...

    bubblePosition(); // Calls the bubblePosition function.
    bubbleCharacteristics(); // Calls the bubbleCharacteristics function.
    bubblePoints(); // Calls the bubblePoints function.
    bubblePopVoice(); // Calls the bubblePopVoice.
  }
}


// Bubble velocity.
function displaySetBubbleVelocity() {
  bubble.x += bubble.vx; // Adds bubble's x velocity to it's x position.
  bubble.y += bubble.vy; // Adds bubble's y velocity to it's y position.
}


// Relocates bubble.
function displayRelocateBubble() {

  if (bubble.y < 0) { // If the bubble has floated above the top of the canvas, then...
    bubblePosition(); // Calls the bubblePosition function.
    bubbleCharacteristics(); // Calls the bubbleCharacteristics function.
  }

  failedPoppingObjective(); // Calls failedPoppingObjective function.
}


// Display Bubble.
function displayBubble() {
  push(); // Isolates code from using global properties.
  fill (bubble.redBubble, bubble.greenBubble, bubble.blueBubble,); // Displays the base ellipse as light blue in colour.
  noStroke(); // Indicates that the there is no stroke.
  ellipse(bubble.x, bubble.y, bubble.size) // Draws a bubble (ellipse) at the bottom of the canvas.
  pop(); // Isolates code from using global properties.
}


// Sets bubble Position.
function bubblePosition() {
  bubble.x = random(width); // Randomly places the bubble's x position on the canvas.
  bubble.y = height; // Places the bubble's y position at the bottom of the canvas.
}


// Sets the bubbleCharacteristics
function bubbleCharacteristics() {
  bubble.vy = random(bubble.minVelocity, bubble.maxVelocity); // Allows the bubble to vertically travel at various velocities within a range.
  bubble.size = random(bubble.minSize, bubble.maxSize); // Allows the bubble to vertically appear at random sizes within a range.

  bubble.redBubble = random(55, 255); // Generates a random red value.
  bubble.greenBubble = random(55, 255); // Generates a random green value.
  bubble.blueBubble = random(55, 255); // Generates a random blue value.
}


// Sets the point system for each popped bubble.
function bubblePoints() {
  if (bubble.size >= 100 && bubble.size <= 125) {
    score = score + 1; // 1 point for each large sized popped bubble.
  }
  if (bubble.size >= 50 && bubble.size <= 99) {
    score = score + 2; // 2 points for each medium sized popped bubble.
  }
  if (bubble.size >= 25 && bubble.size <= 49) {
    score = score + 3; // 3 points for each small sized popped bubble.
  }
}


// Creates the displayScoreboard function
function displayScoreboard() { // Main code for dynamic score board.
  displayScoreText(); // Calls the displayScoreText.
  scoreWin(); // Calls the scoreWin function.
}


// Creates the scoreboard text
function displayScoreText() {
  push(); // Isolates code from using global properties.
  fill(colour.grey.r, colour.grey.g, colour.grey.b); // Makes the font grey in colour.
  textFont(`century gothic`); // Displays customFont.ttf.
  textSize(fontSize.medium); // Displays the font size as 24px.
  text(`Score:`, 40, 65); // Displays text at the top left of the canvas.
  text(`Hearts:`, 470, 65); // Displays text at the top left of the canvas.
  text(score, 110, 65); // Displays dynamic score result at the top left of the canvas.
  pop(); // Isolates code from using global properties.
}


// Changes states upon reaching target score.
function scoreWin() {
  if (score >= 25) { // If the score is equal to or greater then 20...
    state = `winner`; // Runs the winner state.
    generateWinnerSFX(); // Calls the winnerSFX function.
  }
}


// Creates the 3 draw lives
function displayLives() {
  let healthEllipseX = lives.x; // Defines the elipses X position.
  let healthEllipseY = lives.y; // Defines the elipses Y position.

  for (let i = 0; i < lives.remaining; i++) { // For loop that calls lives remaining upon running loop.
    healthEllipseX += lives.size * 2; // Spaces the ellipses side by side on the X axis.
    displayLivesCharacteristics(healthEllipseX, healthEllipseY);
  }
}

function displayLivesCharacteristics(healthEllipseX, healthEllipseY) {
  push(); // Isolates code from using global properties.
  fill (colour.red.r, colour.red.g, colour.red.b) // Makes the ellipse grey in colour.
  noStroke(); // Display no stroke.
  ellipse(healthEllipseX, healthEllipseY, lives.size); // Draws ellipses.
  pop(); // Isolates code from using global properties.
}


// Generates the ability for winnerSFX to be played.
function generateWinnerSFX() {
  if (!gameSound.winnerSFX.isPlaying()) { // If winnerSFX is not playing, then play it upon reaching a score of "20".
    gameSound.winnerSFX.play(); // Play's winnerSFX.
  }
}


// Generates pop sound.
function bubblePopVoice() {
  responsiveVoice.speak("Pop!", "French Female", { // Generated voice says "pop!" upon popping a ballon.
    pitch: 1.5, // Increased the pitch.
    rate: 0.9, // Decreased the rate.
    volume: 1 // Kept the volume as default.
  });
}


// WINNER FUNCTION
function winner() {
  background (colour.green.r, colour.green.g, colour.green.b); // Sets the background as Green in colour.
  winnerHeading(); // Calls the winnerHeading function.
}

function winnerHeading() {
  push(); // Isolates code from using global properties.
  textFont(`century gothic`); // Displays customFont.ttf.
  textSize(fontSize.small); // Displays the font size as 16px.
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
  textFont(`century gothic`); // Displays customFont.ttf.
  textSize(fontSize.small); // Displays the font size as 16px.
  fill(colour.white.r, colour.white.g, colour.white.b); // Displays the instructions in white colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(loserText.string, loserText.x, loserText.y,); // Displays the text that dictates what the user must press to start the game.
  pop(); // Isolates code from using global properties.
}


// Sets rule for how to lose game by not popping ballons.
function failedPoppingObjective() {

  if (bubble.y >= height) { // If the bubble reaches the top of the canvas, then...
    bubbleReset = bubbleReset + 1; // Keeps count of the missed bubbles
    lives.remaining--; // Removes 1 life ellipse.
  }
  else if (bubbleReset === 1) { // When the bubble intially spawns...
    green = 0; // Keeps the background as black.
  }
  else if (bubbleReset === 2) { // When the bubble is missed once, then...
    red = 85; // Make the background dark red.
  }
  else if (bubbleReset === 3) { // When the bubble is missed twice, then...
    red = 170; // Make he background bright red.
  }
  else if (bubbleReset > 3) { // If more then 3 bubbles get missed, then...
    state = `loser`; // Changes to the loser state.
    generateLoserSFX(); // Calls the generateLoserSFX function.
  }
}


// Generates the ability for loserSFX to be played.
function generateLoserSFX() {
  if (!gameSound.loserSFX.isPlaying()) { // If loserSFX is not playing, then play it upon losing all "hearts".
    gameSound.loserSFX.play(); // Play's loserSFX.
  }
}


// MOUSEPRESSED FUNCTION
function mousePressed () { // p5 function to perform action with keyboard input.
  if (state === `landing`) { // if the state is in landing, then...

    video = createCapture(VIDEO, webcamLoaded); // Acess the user's webcam.
    video.hide(); // Hides the html element on the webpage.
    state = `loadWebcam`; // Chnages to loadWebcam sate.
  }
}


// video loaded function called once the webcam loads.
function webcamLoaded () {
  state = `loadHandpose`; // Chnages to loadWebcam sate.

  generateMachineEngine(); // Calls the generateMachineEngine function.
  generatePredictions(); // Calls the generatePredictions function.
  generateBubble(); // Calls the generateBubble function.
}


// Generates the ml5 machchine engine
function generateMachineEngine() {
  handpose = ml5.handpose(video, { // Load the handpose model.
    flipHorizontal: true // Mirrors the handpose input on screen.
  }, function() { // Anonymous function that calls a state change once handpose has loaded.
    state = `simulation`;
  });
}


// Generates ml5's predictions
function generatePredictions() {
  handpose.on(`predict`, function (results) { // Listen for predictions, and creates a parameter. Keeps predeictions array "up to date".
    console.log(results); // Print the "results" in the console.
    predictions = results; // Assign the "results" into the "predictions" global array.
  });
}


// Generates the onscreen bubble.
function generateBubble() {
  bubble = {
    x: random(width), // Allows the bubble to appear anywhere on the canvas's x axis.
    y: 0, // Displays the bubble at the bottom of the canvas.
    size: 75, // Size of bubble in pixels.
    vx: 0, // No intial movement of bubble on the x axis.
    vy: -2, // Allows the bubble to move upwards on the y axis.
    minSize: 25, // Sets a minimum bubble size.
    maxSize: 125, // Sets a maximum bubble size.
    minVelocity: -1, // Sets a minimum vlocity of ball movement on the y-axis.
    maxVelocity: -3, // Sets a maximum vlocity of ball movement on the y-axis.
    redBubble: 0, // Sets intial red variable to red in colour.
    greenBubble: 0, // Sets intial red variable to green in colour.
    blueBubble: 0 // Sets intial red variable to blue in colour.
  }
}
