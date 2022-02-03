let string = `These are words`;

let lastCharacter = 0;

function setup() {
  createCanvas (500, 500);

}

function draw() {
  background(200);

  let x = 10;
  let y = 100;

  let currentString = string.substring(0, lastCharacter);

  push();
  textSize(18);
  text(currentString);

  x += textWidth(currentString);
  pop();

  lastCharacter += random(0, 0.5);
}
