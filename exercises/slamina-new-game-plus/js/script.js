
// Exercise 02: Slamina New Game Plus
// Owen Avon

// A guessing game in which the page pronounces the name of an animal backwards and the user has to figure out what it was and say the name forwards.

"use strict";

const animals = [ // List of animal names inside an array. List from https://github.com/dariusk/corpora/blob/master/data/animals/common.json
      "aardvark",
      "alligator",
      "alpaca",
      "antelope",
      "ape",
      "armadillo",
      "baboon",
      "badger",
      "bat",
      "bear",
      "beaver",
      "bison",
      "boar",
      "buffalo",
      "bull",
      "camel",
      "canary",
      "capybara",
      "cat",
      "chameleon",
      "cheetah",
      "chimpanzee",
      "chinchilla",
      "chipmunk",
      "cougar",
      "cow",
      "coyote",
      "crocodile",
      "crow",
      "deer",
      "dingo",
      "dog",
      "donkey",
      "dromedary",
      "elephant",
      "elk",
      "ewe",
      "ferret",
      "finch",
      "fish",
      "fox",
      "frog",
      "gazelle",
      "gila monster",
      "giraffe",
      "gnu",
      "goat",
      "gopher",
      "gorilla",
      "grizzly bear",
      "ground hog",
      "guinea pig",
      "hamster",
      "hedgehog",
      "hippopotamus",
      "hog",
      "horse",
      "hyena",
      "ibex",
      "iguana",
      "impala",
      "jackal",
      "jaguar",
      "kangaroo",
      "koala",
      "lamb",
      "lemur",
      "leopard",
      "lion",
      "lizard",
      "llama",
      "lynx",
      "mandrill",
      "marmoset",
      "mink",
      "mole",
      "mongoose",
      "monkey",
      "moose",
      "mountain goat",
      "mouse",
      "mule",
      "muskrat",
      "mustang",
      "mynah bird",
      "newt",
      "ocelot",
      "opossum",
      "orangutan",
      "oryx",
      "otter",
      "ox",
      "panda",
      "panther",
      "parakeet",
      "parrot",
      "pig",
      "platypus",
      "polar bear",
      "porcupine",
      "porpoise",
      "prairie dog",
      "puma",
      "rabbit",
      "raccoon",
      "ram",
      "rat",
      "reindeer",
      "reptile",
      "rhinoceros",
      "salamander",
      "seal",
      "sheep",
      "shrew",
      "silver fox",
      "skunk",
      "sloth",
      "snake",
      "squirrel",
      "tapir",
      "tiger",
      "toad",
      "turtle",
      "walrus",
      "warthog",
      "weasel",
      "whale",
      "wildcat",
      "wolf",
      "wolverine",
      "wombat",
      "woodchuck",
      "yak",
      "zebra"
    ];

    let staticText = {
      string: `I think it is a...`,
      x: 320,
      y: 160
    };

    let fontSize = {
      small: 22, // Sets a font size of 22px.
      medium: 32, // Sets a font size of 32px.
      large: 46 // Sets a font size of 46px.
    };

    let colour = {
      white: {
        r: 255,
        g: 255,
        b: 255
      },
    }

    let currentAnimal = ``; // Chosen random animal will be placed inside the variable. Starts out as empty.
    let currentAnswer = ``; // Variable that stores the value of what the user guessed. Starts out as empty.


// Description of setup()
function setup() {
  canvas = createCanvas(640, 480);
  windowResized(); //  Calls windowResized function.
  generateAnnyang(); // Calls the generateAnnyang function.
}

function windowResized() {
  let canvasRatio = height / width; // Calculate ratio of height to width for the canvas.
  let windowRatio = windowHeight / windowWidth; // Calculate ratio of height to width for the wndow.

  let newWidth = undefined; // Create variables to store the new width.
  let newHeight = undefined; // Create variables to store the new height.


  if (windowRatio < canvasRatio) { // If the window ratio is smaller, we'll use the window height to set the basis of our new canvas dimensions.
    newHeight = windowHeight;// Our canvas will fit by setting its height to the window height...
    newWidth = windowHeight / canvasRatio; // ... and then scaling the width based on the ratio
  }
  else {
    newWidth = windowWidth; // Our canvas will fit by setting its width to the window width...
    newHeight = windowWidth * canvasRatio; // ... and then scaling the height based on the ratio.
  }

  canvas.elt.style.width = `${newWidth}px`; // Set the canvas's CSS width and height properties to the new width value.
  canvas.elt.style.height = `${newHeight}px`; // Set the canvas's CSS width and height properties to the new height value.
}

function generateAnnyang () {
  if (annyang) { // Connects annyang API.
    let commands = { // defines command object.
      'I think it is a *animal': guessAnimal // Parameter with splat variable. This allows the user to guess the animal name.
    };
    annyang.addCommands(commands); // Tells annyang to listen to commands variable.
    annyang.start(); // Initiates speech recognition.

    textSize(96); // Displays text size at 32px.
    textStyle(BOLD); // Displays text in bold font family
    textAlign(CENTER, CENTER); // Displays text in the centre (vertically & horizontally) of the canvas.
  }
}


// Description of draw()
function draw() {
  background(0); // Sets the background to black in colour.
  displayStaticText(); // Calls the displayStaticText function.
  diaplayAnswer(); // Calls the displayAnswer function.
}

function displayStaticText() {
  push();
  textSize(fontSize.medium); // Displays the font size 46px.
  fill(colour.white.r, colour.white.g, colour.white.b); // Displays the instructions in orange colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(staticText.string, staticText.x, staticText.y); // Displays the title of the game.
  pop();
}



function diaplayAnswer() {
  if (currentAnswer === currentAnimal) { // If the user answer is the correct animal name, then...
    fill(0, 255, 0); // Fill the background as green in colour.
  }
  else { // Otherwise...
    fill(255, 0, 0); // Fill the background as red in colour.
  }
  text(currentAnswer, width / 2, height / 2); // Display user's answer in the centre of the canvas.
}



function sayAnimalBackwards(animal) { // Asigns reverseAnimal the result of animal.
  let reverseAnimal = reverseString(animal); // Asigns reverseAnimal the result of reverseString.
  responsiveVoice.speak(reverseAnimal); // reverseAnimal value is spoken aloud, via the responsiveVoice API.
}



function reverseString(string) { // Reverses the provided string.
  let characters = string.split(''); // Split the string into an array of characters.
  let reverseCharacters = characters.reverse(); // Reverse the array of characters.
  let result = reverseCharacters.join(''); // Join the array of characters back into a string.
  return result; // Return the result.
}



function guessAnimal(animal) { // Calls animal parameter, which is the word that the user guessed.
  currentAnswer = animal.toLowerCase(); // Assign the guess inside the animal pararmter into the currentAnswer. Converts the guess toLowerCase.
  oralFeedback(); // Calls oralFeedback function for voice dictation.
}



function oralFeedback() {
  if (currentAnswer === currentAnimal) { // If the user answer is the correct animal name, then...
    responsiveVoice.speak("Good job mate!", "UK English Male"); // Congratulate the user.
  }
  else { // Otherwise...
    responsiveVoice.speak("nope, better luck next time!", "UK English Male"); // Wish them better luck next time.
  }
}



function nextQuestion() { //
  currentAnswer = ``; // Clears answer from screen. Initially displays nothing on screen.
  currentAnimal = random(animals); // Fetch's random value from animals array.
  sayAnimalBackwards(currentAnimal); // Calls function to speak the animal name.
}



function mousePressed() {
  nextQuestion(); // Call the nextQuestion function
}
