
// 5.3. ml5.js: Handpose
// Owen Avon

// A skeleton framework for using ml5.js's Handpose feature. Includes a loading screen followed by a live webcam feed with a circle drawn at the tip of the user's index finger.


"use strict";

// Current state of program
let state = `loading`; // Default loading state of program.
let video; // User's webcam
let modelName = `Handpose`; // The name of our model,
let handpose; // Handpose object (using the name of the model for clarity),
let predictions = []; // The current set of predictions made by Handpose once it's running,


function setup() { // Starts the webcam and the Handpose,
  createCanvas(640, 480);

  video = createCapture(VIDEO); // Start webcam.
  video.hide(); // Hide the resulting HTML element.

  handpose = ml5.handpose(video, { // Start the Handpose model.
    flipHorizontal: true // // boolean value for if the video should be flipped, defaults to false.
  }, function() {

    state = `running`; // Switch to the running state.
  });

  handpose.on(`predict`, function(results) { // Anonymous function that listen's for prediction events from Handpose.
    predictions = results; // Stores the results in our predictions array when they occur.
  });
}



function draw() { // Handles the two states of the program: loading, running.
  if (state === `loading`) {
    loading();
  }
  else if (state === `running`) {
    running();
  }
}



function loading() { // Displays a simple loading screen with the loading model's name.
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
If there is a hand it outlines it and highlights the tip of the index finger.
*/
function running() {

  let flippedVideo = ml5.flipImage(video); // Display the webcam input.
  image(flippedVideo, 0, 0, width, height); // Reverse's image so it's a mirror.

  if (predictions.length > 0) { // Check if there currently predictions to display. Technically there will only be ONE because it only detects ONE hand.
    let hand = predictions[0]; // Get the hand predicted.
    highlightHand(hand); // Highlight it on the canvas.
  }
}



function highlightHand(hand) { // Provided with a detected hand. Display a circle at the tip of the index finger.
  let index = hand.annotations.indexFinger[3]; // Highlights the tip of the index finger.
  let indexX = index[0];
  let indexY = index[1];

  push();
  fill(255, 255, 0);
  noStroke();
  ellipse(indexX, indexY, 50);
  pop();
}
