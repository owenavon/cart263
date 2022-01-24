
// Annyang Learning Material
// Owen Avon

// Description of project would go here

"use strict";

let face = `:-|`; // Starts with the light off.

// Description of setup()
function setup() {
  createCanvas(500, 500);

  if (annyang) { // Checks if annyang is available.
    let commands = {
      'I love you': love, // Calls love function
      'I hate you': hate // Calls hate function
    };
    annyang.addCommands(commands); // Add the commands and start annyang
    annyang.start();
  }
}


// Description of draw()
function draw() {
  background(0);

  // Draw the current face emoji in the centre of the createCanvas
  // Rotated to dsiplay more like a regular face

  push();
  translate(width / 2, height / 2);
  rotate(PI / 2);
  textSize(400);
  textAlign(CENTER, CENTER);
  fill(255);
  text(face, 0, 0);
  pop();
}

function love() {
  face = `:-)`;
}

function hate() {
  face = `:-(`;
}








// let on = false; // Starts with the light off.
//
// // Description of setup()
// function setup() {
//   createCanvas(500, 500);
//
//   if (annyang) { // Checks if annyang is available.
//     let commands = {
//       'Turn the light on': function() { // Anonymous function. Cannot use backtick for string.
//         on = true;
//       },
//       'Turn the light off': function() {
//         on = false;
//       }
//     };
//     annyang.addCommands(commands); // Add the commands and start annyang
//     annyang.start();
//   }
// }
//
//
// // Description of draw()
// function draw() {
//   if (on) { // If on is true, make the background white, otherwise make it black
//     background(255);
//   }
//   else {
//     background(0);
//   }
// }








// Description of setup()
// function setup() {
//   createCanvas(500, 500);
//
//   if (annyang) {
//     let commands = {
//       'hello': function() { // Anonymous function. Cannot use backtick for string. 'hello': sayHello
//         alert(`Howdy!`);
//       },
//       'goodbye': function() {
//         alert(`see ya!`);
//       }
//     };
//     annyang.addCommands(commands);
//     annyang.start();
//   }
// }


// Description of draw()
// function draw() {
//   background(0);
// }


// function sayHello() { // Defined function for annyang.
//   alert('Hello');
// }
