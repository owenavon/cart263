
// Responsive Voice Learning Material
// Owen Avon

// Description of project would go here

"use strict";

let phrase = `Hello world!`;
let saying = ``; // Track what is currently being said. Nothing initially.

// Description of setup()
function setup() {
  createCanvas(windowWidth, windowHeight);
}


// Display what is currenlty being said...
function draw() {
  background(255);

  push();
  textSize(32);
  textAlign(CENTER);
  text(saying, width / 2, height / 2);
  pop();
}

function mousePressed() {
  responsiveVoice.speak(phrase, "UK English Male", {
    onstart: showSpeaking, // Calls showSpeaking function when text start.
    onend: hideSpeaking // calls hideSpeaking function when text finish.
  });
}

function showSpeaking() {
  saying = phrase;
}

function hideSpeaking() {
  saying = ``;
}

// function mousePressed() {
//   responsiveVoice.speak(`Hello world. How are you today?`, `UK English Male`, {
//     pitch: 0.5,
//     rate: 0.5,
//     volume: 1
//   }); // speak is the method that targets the responsiveVoice library.
// }
//
//
// // Description of setup()
// function setup() {
//   createCanvas(500, 500);
// }
//
//
// // Description of draw()
// function draw() {
//   background(0);
// }
//
//
// function mousePressed() {
//   responsiveVoice.speak(`Hello world. How are you today?`, `UK English Male`, {
//     pitch: 0.5,
//     rate: 0.5,
//     volume: 1
//   }); // speak is the method that targets the responsiveVoice library.
// }
