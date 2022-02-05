
// 5.2. ml5.js: Object Detector
// Owen Avon

"use strict";

let state = `loading`; // Default loading state of program.
let video; // User's webcam.
let modelName = `CocoSsd`; // The name of our model.
let cocossd; // ObjectDetector object (using the name of the model for clarify).
let predictions = []; // The current set of predictions made by CocoSsd once it's running.



// SETUP FUNCTION
function setup() { // Starts the webcam and the ObjectDetector.
  createCanvas(640, 480);

  // Start webcam and hide the resulting HTML element.
  video = createCapture(VIDEO);
  video.hide();

  // Start the CocoSsd model and when it's ready start detection.
  // and switch to the running state.
  cocossd = ml5.objectDetector('cocossd', {}, function() {
    // Ask CocoSsd to start detecting objects, calls gotResults.
    // if it finds something.
    cocossd.detect(video, gotResults);
    // Switch to the running state.
    state = `running`;
  });
}



function gotResults(err, results) { // Called when CocoSsd has detected at least one object in the video feed.

  if (err) { // If there's an error, report it.
    console.error(err);
  }
  else { // Otherwise, save the results into our predictions array.
    predictions = results;
  }
  cocossd.detect(video, gotResults); // Ask CocoSsd to detect objects again so it's continuous.
}



// DRAW FUNCTION
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



function running() { // Displays the webcam. If there are currently objects detected it outlines them and labels them with the name and confidence value.
  image(video, 0, 0, width, height); // Display the webcam.

  if (predictions) { // Check if there currently predictions to display.
    for (let i = 0; i < predictions.length; i++) { // If so run through the array of predictions.

      let object = predictions[i]; // Get the object predicted.

      if (object.label === `bottle`) { // If the object prediction equals "waterbottle", then...
        censorObject(object); // Censors waterbottle(s).
      }
      else {
        highlightObject(object); // Highlight it on the canvas.
      }
    }
  }
}



function highlightObject(object) { // Provided a detected object, it draws a box around it and includes its label and confidence value.

  // Display a box around it.
  push();
  noFill();
  stroke(255, 255, 0);
  rect(object.x, object.y, object.width, object.height);
  pop();

  // Display the label and confidence in the center of the box.
  push();
  textSize(18);
  fill(255, 255, 0);
  textAlign(CENTER, CENTER);
  text(`${object.label}, ${object.confidence.toFixed(2)}`, object.x + object.width / 2, object.y + object.height / 2);
  pop();
}

function censorObject(object) {
  push(); // Isolates code from using global properties.
  fill(0); // Fills the rectangle to black in colour.
  rect(object.x, object.y, object.width, object.height); // Creates a censoring rectangle.
  pop(); // Isolates code from using global properties.
}
