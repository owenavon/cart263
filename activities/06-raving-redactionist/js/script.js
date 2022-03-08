
// Raving Redactionist
// Owen Avon

// A hacker is uncensoring top secret information. You must click on the revealed information and redact as quickly as possible.

"use strict";

const HALF_SECOND = 500; // Assigns 500 milliseconds to HALF_SECOND constant.
const TEN_PERCENT = 0.1; // Assigns 0.1 value to TEN_PERCENT constant.

setInterval(revelation, HALF_SECOND); // Calls revelation function every 0.5 second.
$(`.top-secret`).on(`click`, redact); // Selects top-secret class, calls click listener, and calls function redact.

function redact(event) { // Defines the redact function. event is passed since the function is listening via .on
  $(this).removeClass(`revealed`); // Removes the revealed class.
  $(this).addClass(`redacted`); // Adds the redacted class.
}

function revelation() { // Defines the revelation function.
  $(`.redacted`).each(attemptReveal); // Selects currently redacted text.
}

function attemptReveal() { // Defines the attemptReveal function.
  let numberPercentage = Math.random(); // Assigns numberPercentage to random function.
  if (numberPercentage < TEN_PERCENT) { // If the random number is less then a 10% chance, then...
    $(this).removeClass(`redacted`); // Remove the redacted class.
    $(this).addClass(`revealed`); // Adds the revealed class.
  }
}
