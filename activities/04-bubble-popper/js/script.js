
// Bubble Popper Activity
// Owen Avon

// Pop bubbles with your index finger as a pin.
// ml5.js Handpose:
// https://learn.ml5js.org/#/reference/handpose

"use strict";

let video = undefined; // Stores the user's webcam.
let handpose = undefined; // The handpose model.
let predictions = []; // The current set of predictions.
let bubble = undefined; // The bubble.


// SETUP FUNCTION
function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO); // Acess the user's webcam.
  video.hide(); // Hides the html element on the webpage.

  handpose = ml5.handpose(video, { // Load the handpose model.
    flipHorizontal: true // Mirrors the handpose input on screen.
  }, function() { // Anonymous function that prints "Model Loaded" in the console, should the model load correctly.
    console.log(`Model Loaded.`);
  });


  handpose.on(`predict`, function (results) { // Listen for predictions, and creates a parameter. Keeps predeictions array "up to date".
    console.log(results); // Print the "results" in the console.
    predictions = results; // Assign the "results" into the "predictions" global array.
  });


  bubble = {
    x: random(width), // Allows the bubble to appear anywhere on the canvas's x axis.
    y: height, // Displays the buble at the bottom of the canvas.
    size: 100, // Size of bubble in pixels.
    vx: 0, // No intial movement of bubble on the x axis.
    vy: -2, // Allows the bubble to move upwards on the y axis.
  }

}




// DRAW FUNCTION
function draw() {
  background(0); // Sets the background to black in colour.

  displayIndexPosition(); // Calls the displayIndexPosition function.

  displaySetBubbleVelocity() // Calls the displaySetBubbleVelocity function.
  displayRelocateBubble() // Calls the displayRelocateBubble function.
  displayBubble() // Calls the displayBubble function.
}



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

    displayPinBody(); // Calls the displayPinBody function.
    displayPinHead(); // Calls the displayPinHead function.
    displayBubblePop(); // Calls the displayBubblePop function.
  }
}


// Pin Body.
function displayPinBody() {
  push(); // Isolates code from using global properties.
  noFill(); // Indicates that the line has no fill.
  stroke(255, 255, 255); // Sets the stroke to white in colour
  strokeWeight(2); // Displays the stroke weight slighty thicker.
  line(baseX, baseY, tipX, tipY); // Draws the line from base x,y to tip x,y.
  pop(); // Isolates code from using global properties.
}


// Pin Head.
function displayPinHead() {
  push(); // Isolates code from using global properties.
  noStroke(); // Indicates that the there is no stroke.
  fill(255, 0, 0); // Displays the base ellipse as red in colour.
  ellipse(baseX, baseY, 20); // Draws an ellipse at the base end of the pin, at a size of 20px.
  pop(); // Isolates code from using global properties.
}


// Check if the bubble pops.
function displayBubblePop() {
let d = dist(tipX, tipY, bubble.x, bubble.y); // Assign the distance between index tip, base and bubble.
  if (d < bubble.size / 2) { // If the distance is less then half the bubbles size, then...
    bubblePosition(); // Calls the bubblePosition function.
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
  }
}


// Display Bubble/
function displayBubble() {
  push(); // Isolates code from using global properties.
  fill (0, 100, 200); // Displays the base ellipse as light blue in colour.
  noStroke(); // Indicates that the there is no stroke.
  ellipse(bubble.x, bubble.y, bubble.size) // Draws a bubble (ellipse) at the bottom of the canvas.
  pop(); // Isolates code from using global properties.
}


// Sets bubble Position.
function bubblePosition() {
  bubble.x = random(width); // Randomly places the bubble's x position on the canvas.
  bubble.y = height; // Places the bubble's y position at the bottom of the canvas.
}
