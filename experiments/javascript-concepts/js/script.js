
// JavaScript Concepts Learning Material
// Owen Avon

"use strict";

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  let config = { // Using an object to pass through properties that define parameters
    x: 250,
    y: 250,
    width: 200,
    height: 200,
    fillColor: {
      r: 255,
      g: 255,
      b: 0
    },
    mode: CENTER
  };

  drawFancyRect(config); // Passing the object through to the function
}

function drawFancyRect({ x, y, width, height, fillColor, mode }) { // Destructing the object in the function parameters to break the object apart into it's individual properties
  push();
  fill(fillColor.r, fillColor.g, fillColor.b);
  rectMode (mode);
  rect (x, y, width, height);
  pop();
}

















// "use strict";
//
// const NUM_CIRCLES = 10; // Use constants when you have values that will never change. Good practice.
// let circleAlpha = 50;
// let circleSizeIncrease = 50;
//
//
// // Description of setup()
// function setup() {
//   createCanvas(500, 500);
// }
//
// // Description of draw()
// function draw() {
//   background(0);
//
//   circleAlpha = map(mouseX, 0, width, 10, 100);
//   circleSizeIncrease = map(mouseY, 0, height, 10, 100);
//
//   for (let i = 0; i < NUM_CIRCLES; i++) {
//     push();
//     fill(255, circleAlpha);
//     ellipse(width/2, height/2, i * circleSizeIncrease);
//     pop();
//   }
// }
