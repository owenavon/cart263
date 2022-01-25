
// Slamina Learning Material
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

    let currentAnimal = ``; // Chosen random animal will be placed inside the variable. Starts out as empty.
    let currentAnswer = ``; // Variable that stores the value of what the user guessed. Starts out as empty.


// Description of setup()
function setup() {
  createCanvas(windowWidth, windowHeight); // Sets the canvas to the users screen resolution.

  if (annyang) { // Connects annyang API.
    let commands = { // defines command object.
      'I think it is *animal': guessAnimal // Parameter with splat variable. This allows the user to guess the animal name.
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

  if (currentAnswer === currentAnimal) { // If the user answer is the correct animal name, then...
    fill(0, 255, 0); // Fill the background as green in colour.
  }
  else { // Otherwise...
    fill(255, 0, 0); // Fill the background as red in colour.
  }
  text(currentAnswer, width / 2, height / 2); // Display user's answer in the centre of the canvas.
}

function mousePressed() {
  currentAnimal = random(animals); // Fetch's random value from animals array.
  let reverseAnimal = reverseString(currentAnimal); // Asigns reverseAnimal the result of currentAnimal.
  responsiveVoice.speak(reverseAnimal); // reverseAnimal value is spoken aloud, via the responsiveVoice API.
}

function guessAnimal(animal) { // Calls animal parameter, which is the word that the user guessed.
  currentAnswer = animal.toLowerCase(); // Assign the guess inside the animal pararmter into the currentAnswer. Converts the guess toLowerCase.
}


function reverseString(string) { // Reverses the provided string.
  let characters = string.split(''); // Split the string into an array of characters.
  let reverseCharacters = characters.reverse(); // Reverse the array of characters.
  let result = reverseCharacters.join(''); // Join the array of characters back into a string.
  return result; // Return the result.
}
