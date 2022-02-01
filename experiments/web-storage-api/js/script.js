
// Web Storage API Learning Material
// Owen Avon

"use strict";

let userData = {
  name: `stranger`
};

// Description of setup()
function setup() {
  createCanvas(windowWidth, windowHeight);

  let data = JSON.parse(localStorage.getItem(`web-storage-example-personalization`)); // Converts string back into an object, in order to read value in web browser. Can also use sessionStorage.
  if (data !== null) { // If userData exists, then...
    userData.name = data.name; // Use current data.
  }
  else { // If no name is provided, then...
    userData.name = prompt(`What is your name?`); // Asks user to enter data.
    localStorage.setItem(`web-storage-example-personalization`, JSON.stringify(userData)); // If there is no data, ask for data and save it.
  }
}


// Description of draw()
function draw() {
  background(255);

  push();
  textSize(64);
  textAlign(CENTER, CENTER);
  text(`Howdy, ${userData.name}!`, width / 2, height / 2);
  pop();
}






// "use strict";
//
// let clicks = 0;
//
// let gameData = {
//   highScore: 0
// };
//
//
// // Description of setup()
// function setup() {
//   createCanvas(windowWidth, windowHeight);
//
//   let data = JSON.parse(localStorage.getItem(`click-attack-game-data`)); // Converts string back into an object, in order to read value in web browser. Can also use sessionStorage.
//   if (data !== null) { // If gameData exists, then...
//     gameData = data; // Current gameData (0) gets replaced by loaded data.
//   }
// }
//
//
// // Description of draw()
// function draw() {
//   background(255);
//
//   push();
//   textSize(64);
//   textAlign(CENTER, CENTER);
//   textStyle(BOLD);
//   fill(0);
//   text(clicks, width / 2, height / 2);
//   pop();
//
//   push();
//   textSize(32);
//   textAlign(LEFT, TOP);
//   textStyle(BOLD);
//   fill(0);
//   text(`High score: ${gameData.highScore}`, 100, 100);
//   pop();
// }
//
// function mousePressed() {
//   clicks++; // Increases clicks variable by one each time the mouse is pressed.
//
//   if (clicks > gameData.highScore) { // If clicks is greater then highScore, then...
//     gameData.highScore = clicks; // Current amount of cliks becomes teh highScore.
//     localStorage.setItem(`click-attack-game-data`, JSON.stringify(gameData)); // Converts the object to a string, in order to say value to web browser. Saves to your domain, so use a specific strings.
//   }
// }
//
// function keyPressed() {
//   if (key === `c`) {
//     localStorage.removeItem(`click-attack-game-data`); // Deletes web data for specific string.
//   }
// }
