
// Raving Redactionist Plus Plus
// Owen Avon

// Click on the revealed information in order for it to redact as quickly as possible. See README.md for further information.

"use strict";

const HALF_SECOND = 500; // Assigns 500 milliseconds to HALF_SECOND constant.
const TEN_PERCENT = 0.1; // Assigns 0.1 value to TEN_PERCENT constant.

let letter = [
  `c`,
  `e`,
  `s`,
  `s`,
  `a`,
  `t`,
  `i`,
  `o`,
  `n`
];

let currentIndex = 0;

setInterval(revelation, HALF_SECOND); // Calls revelation function every 0.5 second.
$(`.top-secret`).on(`click`, redact); // Selects top-secret class, calls click listener, and calls function redact.

function redact(event) { // Defines the redact function. event is passed since the function is listening via .on
  $(this).removeClass(`revealed`); // Removes the revealed class.
  $(this).addClass(`redacted`); // Adds the redacted class.
  spokenLetter(); // Calls the spokenLetter function
}

function revelation() { // Defines the revelation function.
  $(`.redacted`).each(attemptReveal); // Selects currently redacted text.
}

function attemptReveal() { // Defines the attemptReveal function.
  let numberPercentage = Math.random(); // Assigns numberPercentage to random function.
  if (numberPercentage < TEN_PERCENT) { // If the random number is less then a 10% chance, then...
    $(this).removeClass(`redacted`); // Remove the redacted class.
    $(this).addClass(`revealed`); // Adds the revealed class.
    $(this).animate({
      "font-size": "2rem"
    }, 2000);
  }
}

function spokenLetter() { // Defines the spokenLetter function
  responsiveVoice.speak(letter[currentIndex]); // Assigns the letter array to responsiveVoice
  currentIndex = currentIndex + 1; // Allows each click on the top-secret class to progress through the array.

  if (currentIndex === letter.length + 1) { // If the array has been said, then the subsequent click will...
    passwordPrompt(); // Call the passwordPrompt function.
  }
}

function passwordPrompt() { // Defines the passwordPrompt function
  let secretWord = prompt("Enter password to terminate infiltration:")
  if (secretWord == `cessation`) {
    window.close(); // Closes window for security reasons.
  }
  else {
    responsiveVoice.speak(`Incorect Password`);
    currentIndex = 0;
  }
}
