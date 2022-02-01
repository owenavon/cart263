
// JSON Learning Material
// Owen Avon

"use strict";

let jokeText = ``; // The current joke.
let jokeData = undefined; // The loaded joke data.

function preload() {
  jokeData = loadJSON(`https://official-joke-api.appspot.com/jokes/programming/random`);
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  let joke = jokeData[0]; // We get the joke object as the first element of the array.
  jokeText = `${joke.setup}\n\n${joke.punchline}`; // Set the joke text as the setup and punchline properties together.
}


function draw() {
  background(0);

  push(); // Display the current joke.
  fill(255, 255, 0);
  textSize(32);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  text(jokeText, width / 2, height / 2, width / 2, height / 2);
  pop();
}


// let tarotData = undefined;
// let fortune = `No fortune found yet...`;
//
// // Description of preload()
// function preload() {
//   // tarotData = loadJSON(`assets/data/tarot_interpretations.json`);
//   tarotData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`); // Dynamic url link.
// }
//
//
// // Description of setup()
// function setup() {
//   createCanvas(windowWidth, windowHeight);
//
//   let card = random(tarotData.tarot_interpretations); // Picks a random element from tarot_interpretations.json
//   fortune = random(card.fortune_telling); // Selects a random object within the fortune_telling array.
// }
//
//
// // Description of draw()
// function draw() {
//   background(255);
//
//   // let firstShadowMeaning = tarotData.tarot_interpretations[0].meanings.shadow[0]; // Targets a specific property in the tarot_interpretations.json file.
//   // let description = tarotData.description; // Regular JavaScript object.
//
//   push();
//   textSize(32);
//   textAlign(CENTER);
//   fill(0);
//   text(fortune, width / 2, height / 2);
//   pop();
// }
//
// // function mousePressed() {
// //   loadJSON(`assets/data/tarot_interpretations.json`, tarotLoaded); // Loads json file as well as calls tarotLoaded function.
// // }
// //
// // function tarotLoaded(data) { // Passes through as an argument the loaded data.
// //   tarotData = data; // Saves data to tarotData variable.
// //   let card = random(tarotData.tarot_interpretations); // Picks a random element from tarot_interpretations.json
// //   fortune = random(card.fortune_telling); // Selects a random object within the fortune_telling array.
// // }
