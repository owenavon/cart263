"use strict";

// Current state of program
let state = `loading`; // loading, running
// User's webcam
let video;
// The name of our model
let modelName = `Handpose`;
// Handpose object (using the name of the model for clarity)
let handpose;
// The current set of predictions made by Handpose once it's running
let predictions = [];

let thing = {
  x: 500,
  y: 150,
  size: 50,
  dragging: false
};

/**
Starts the webcam and the Handpose
*/
function setup() {
  createCanvas(640, 480);

  // Start webcam and hide the resulting HTML element
  video = createCapture(VIDEO);
  video.hide();

  // Start the Handpose model and switch to our running state when it loads
  handpose = ml5.handpose(video, {
    flipHorizontal: true
  }, function() {
    // Switch to the running state
    state = `running`;
  });

  // Listen for prediction events from Handpose and store the results in our
  // predictions array when they occur
  handpose.on(`predict`, function(results) {
    predictions = results;
  });
}

/**
Handles the two states of the program: loading, running
*/
function draw() {
  if (state === `loading`) {
    loading();
  }
  else if (state === `running`) {
    running();
  }
}

/**
Displays a simple loading screen with the loading model's name
*/
function loading() {
  background(255);

  push();
  textSize(32);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(`Loading ${modelName}...`, width / 2, height / 2);
  pop();
}

/**
Displays the webcam.
If there is a hand it outlines it and highlights the tip of the index finger
*/
function running() {
  // Display the webcam with reveresd image so it's a mirror
  let flippedVideo = ml5.flipImage(video);
  image(flippedVideo, 0, 0, width, height);

  push();
  fill(0, 255, 255);
  ellipse(thing.x, thing.y, thing.size);
  pop();


  // Check if there currently predictions to display
  if (predictions.length > 0) {
    // Technically there will only be ONE because it only detects ONE hand
    // Get the hand predicted
    let hand = predictions[0];
    // Highlight it on the canvas
    highlightHand(hand);
  }
}

/**
Provided with a detected hand it highlights the tip of the index finger
*/
function highlightHand(hand) {
  // Display a circle at the tip of the index finger
  let index = hand.annotations.indexFinger[3];
  let indexX = index[0];
  let indexY = index[1];

  let thumb = hand.annotations.thumb[3];
  let thumbX = thumb[0];
  let thumbY = thumb[1];



  let d = dist(indexX, indexY, thumbX, thumbY);
  if (d < 40) {
    fill(0, 255, 0);
    let thingDistance = dist(thing.x, thing.y, indexX, indexY);
    if (thingDistance < thing.size / 2) {
      thing.dragging = true;
      thing.x = indexX;
      thing.y = indexY;
    }
  }
  else {
    fill(255, 0, 0);
    thing.dragging = false;
  }


  push();
  noStroke();
  ellipse(indexX, indexY, 10);
  pop();


  push();
  noStroke();
  ellipse(thumbX, thumbY, 10);
  pop();
}
