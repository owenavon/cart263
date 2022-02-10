
// Bubble Popper Plus Plus Exercise
// Owen Avon

// Pop bubbles with your index finger as a pin.
// ml5.js Handpose: https://learn.ml5js.org/#/reference/handpose

"use strict";

let state = `landing`; // Starts the program in the loading state.
let video = undefined; // Stores the user's webcam.
let modelName = `Handpose`; // Defines handpose object.
let handpose = undefined; // The handpose model.
let predictions = []; // The current set of predictions.
let bubble = undefined; // The single bubble.
let score = 0; // Starts the score board at "0".
let bubbleReset = 0; // Starts with no bubbleResets.

let red = 0; // Sets intial red variable to black in colour.
let green = 0; // Sets intialgrren variable to black in colour.
let blue = 0; // Sets intial blue variable to black in colour.


let titleText = {
  string: `Popper McPoppy`,
  x: 320,
  y: 160
};

let instructionText = {
  string: `Use your finger to pop the on screen ballons. Don't miss more then 2.`,
  x: 320,
  y: 200
};

let startText = {
  string: `"Click" anywhere to begin`,
  x: 320,
  y: 260
};

let winnerText = {
  string: `Yahoo, you popped all the ballons! Be proud of your accomplishment.`,
  x: 320,
  y: 240
};

let loserText = {
  string: `You let too many ballons escape. You make the children cry.`,
  x: 320,
  y: 240
};

let fontSize = {
  small: 18, // Sets a font size of 18px.
  medium: 24, // Sets a font size of 24px.
  large: 36 // Sets a font size of 36px.
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
  green: {
    r: 0,
    g: 175,
    b: 0
  },
  red: {
    r: 255,
    g: 0,
    b: 0
  }
}


// SETUP FUNCTION
function setup() {
  createCanvas(640, 480); // Sets the canvas size to 4:3 aspect ratio.


  generateHandposeModel(); // Calls the generateHandposeModel function.
  generateHandposePredictions(); // Calls the generateHandposePredictions function.
  generateBubble(); // Calls the generateBubble function.

}

function generateCamera() {
  video = createCapture(VIDEO); // Acess the user's webcam.
  video.hide(); // Hides the html element on the webpage.
}


// Generates the implemenatation of the ml5js.handpose.
function generateHandposeModel() {
  generateCamera(); // Calls the generateCamera function.
  handpose = ml5.handpose(video, { // Load the handpose model.
    flipHorizontal: true // Mirrors the handpose input on screen.
  }, function() { // Anonymous function that calls a state change once handpose has loaded.
    if (state === `loading`) {
      state = `simulation`; // Changes state to `simulation`.
    }
    else {
      state = `simulation`; // Automatically jumps to simulation state once the camera has been loaded.
    }
  });
}


// Generates Handpose's predictions and assigns it to the predictions array.
function generateHandposePredictions() {
  handpose.on(`predict`, function (results) { // Listen for predictions, and creates a parameter. Keeps predeictions array "up to date".
    console.log(results); // Print the "results" in the console.
    predictions = results; // Assign the "results" into the "predictions" global array.
  });
}


// Defines the bubble's variables.
function generateBubble() {
  bubble = {
    x: random(width), // Allows the bubble to appear anywhere on the canvas's x axis.
    y: height, // Displays the buble at the bottom of the canvas.
    size: 100, // Size of bubble in pixels.
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


// DRAW FUNCTION
function draw() {
  if (state === `landing`) {
    landing(); // Calls the landing function.
  }
  else if (state === `loading`) {
    loading(); // Calls the loading function.
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
  background(50); // Sets the background to black in colour.

  displayTitleText(); // Calls displayTitleText function
  displayInstructionText(); // Calls displayInstructionText function.
  displayStartText(); // Calls displayStartText function.
}


function displayTitleText() {
  push(); // Isolates code from using global properties.
  textFont(`century gothic`); // Displays customFont.ttf.
  textSize(fontSize.large); // Displays the font size 36px.
  fill(colour.grey.r, colour.grey.g, colour.grey.b); // Displays the instructions in orange colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(titleText.string, titleText.x, titleText.y); // Displays the title of the game.
  pop(); // Isolates code from using global properties.
}


function displayInstructionText() {
  push(); // Isolates code from using global properties.
  textFont(`century gothic`); // Displays customFont.ttf.
  textSize(fontSize.small); // Displays the font size 18px.
  fill(colour.grey.r, colour.grey.g, colour.grey.b); // Displays the instructions in orange colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(instructionText.string, instructionText.x, instructionText.y); // Displays the title of the game.
  pop(); // Isolates code from using global properties.
}


function displayStartText() {
  push(); // Isolates code from using global properties.
  textFont(`century gothic`); // Displays customFont.ttf.
  textSize(fontSize.small); // Displays the font size 18px.
  fill(colour.grey.r, colour.grey.g, colour.grey.b); // Displays the instructions in orange colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(startText.string, startText.x, startText.y); // Displays the title of the game.
  pop(); // Isolates code from using global properties.
}



// Handpose loading screen.
function loading() {
  background(255); // Sets the background to white in colour.
  displayLoadingText(); // Calls the displayLoadingText.
}


// Displays loading text on screen.
function displayLoadingText() {
  push(); // Isolates code from using global properties.
  textSize(fontSize.large); // Displays the font size 36px.
  textStyle(BOLD); // Bolds the text.
  textAlign(CENTER, CENTER); // Aligns the text in the center
  text(`Loading ${modelName}...`, width / 2, height / 2); // Displays the text on screen with dynamic variable
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
  fill(colour.grey.r, colour.grey.g, colour.grey.b); // Makes the font white in colour.
  textFont(`century gothic`); // Displays customFont.ttf.
  textSize(fontSize.medium); // Displays the font size as 24px.
  text(`Score:`, 50, 65); // Displays text at the top left of the canvas.
  text(score, 130, 65); // Displays dynamic score result at the top left of the canvas.
  pop(); // Isolates code from using global properties.
}


// Changes states upon reaching target score.
function scoreWin() {
  if (score >= 20) { // If the score is equal to or greater then 20...
    state = `winner`; // Runs the winner state.
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
  textSize(fontSize.small); // Displays the font size as 18px.
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
  textSize(fontSize.small); // Displays the font size as 18px.
  fill(colour.white.r, colour.white.g, colour.white.b); // Displays the instructions in white colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(loserText.string, loserText.x, loserText.y,); // Displays the text that dictates what the user must press to start the game.
  pop(); // Isolates code from using global properties.
}


// Sets rule for how to lose game by not popping ballons.
function failedPoppingObjective() {

  if (bubble.y >= height) { // If the bubble reaches the top of the canvas, then...
    bubbleReset = bubbleReset + 1; // Keeps count of the missed bubbles
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
  }

  // bubbleMissedVoice(); // Calls the bubbleMissed Voice.
}

// Generates pop sound.
// function bubbleMissedVoice() {
//   responsiveVoice.speak("Pop!", "French Female", { // Generated voice says "pop!" upon popping a ballon.
//     pitch: 1.5, // Increased the pitch.
//     rate: 0.9, // Decreased the rate.
//     volume: 1 // Kept the volume as default.
//   });
// }


// MOUSEPRESSED FUNCTION
function mousePressed () { // p5 function to perform action with keyboard input.
  if (state === `landing`) {
    state = `loading`; // Runs the "loading" state.
  }
}
