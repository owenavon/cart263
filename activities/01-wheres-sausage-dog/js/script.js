
// Activity 01: Where's Sausage Dog?
// Owen Avon

// The user objective is to find and click on the "Sausage Dog".

"use strict";

const NUM_ANIMAL_IMAGES = 10; // Constant value that will not be chnaged
const NUM_ANIMALS = 100; // 100 Anmials objects that are created

let animalImages = []; // Empty anmimal images array
let animals = []; // Empty animal object array

let sausageDogImage = undefined; // sausageDog image variable
let sausageDog = undefined; // sausageDog variable



function preload () { // P5 function that loads assets prior to starting the simulation
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) { // Loop that counts up by 1 untill 10
    let animalImage = loadImage(`assets/images/animal${i}.png`); // Load images dynamically
    animalImages.push(animalImage); // Pushs the animal images into the array
  }

  sausageDogImage = loadImage (`assets/images/sausage-dog.png`); // Preloads static sausage-dog.png
}



function setup() { // P5 function for calculations
  createCanvas(windowWidth, windowHeight);
  generateAnimals(); // Calls generateAnimals function
  generateSausageDog(); // Calls generateSausageDog function
}

function generateAnimals() { // Create the animals
  for (let i = 0; i < NUM_ANIMALS; i++) {
    let x = random(0, width); // Random x postion for image placement
    let y = random(0, height); // Random y postion for image placement
    let animalImage = random(animalImages); // Random image from animalImages array
    let animal = new Animal(x, y, animalImage); // Creates a class for random animal
    animals.push(animal); // Add animal into animals array
  }
}

function generateSausageDog() {
  let x = random(0, width); // Place SausageDog image at a random x postion
  let y = random(0, height); // Place SausageDog image at a random y postion
  sausageDog = new SausageDog(x, y, sausageDogImage); // Creates a class for SausageDog
}



function draw() { // P5 Function that displays output on canvas
  background(255, 255, 0); // Sets background to yellow in colour
  createAnimal(); // Calls createRandomAnimal
  createSausageDog(); // Calls createSausageDog
}

function createAnimal() {
  for (let i = 0; i < animals.length; i++) { // Loop that counts to the value indicated in animal
    animals[i].update(); // Update "display" the animal at a random postion
  }
}

function createSausageDog() {
  sausageDog.update(); // Calls update to display sausageDog on canvas
}

function mousePressed() {
  sausageDog.mousePressed(); // Calls method upon mouse press
}
