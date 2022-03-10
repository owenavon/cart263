
// Raving Redactionist Plus Plus
// Owen Avon

// Click on the revealed information in order for it to redact as quickly as possible. See README.md for further information.

"use strict";

const HALF_SECOND = 500; // Assigns 500 milliseconds (0.5 seond) to HALF_SECOND constant.
const ONE_SECOND = 1000; // Assigns 1000 milliseconds (1 second) to ONE_SECOND constant.
const TWO_HALF_SECOND = 2500; // Assigns 2500 milliseconds (2.5 secondS) to TWO_HALF_SECOND constant.
const TEN_PERCENT = 0.1; // Assigns 0.1 value to TEN_PERCENT constant.
const ELEVEN = 11; // Assigns a value of 11 to ELEVEN constant.

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

let letterBackward = [
  `n`,
  `o`,
  `i`,
  `t`,
  `a`,
  `s`,
  `s`,
  `e`,
  `c`
];


let instruction = [
  `The Russians are hacking. Quickly redact the revealed information. Take note of the spoken letters.`,
  `Incorect Password. Maybe hearing it backwards is easier for you?`,
  `Incorrect. System shutdown for American integrity.`
];

let currentIndex = 0;
let currentIndexBackward = 0;

let clickCounter = 0;

function onClick() { // Defines the onClick function.
  $(`#click`).on(`click`); //
  clickCounter += 1; // Allows the click counter to increase by 1 after each click.
  console.log(`Click # ${clickCounter}`); // Console logs the click counter.
  $("#counter-value").text(clickCounter); // Assigns the clickCounter value to counterValue ID to be used in HTML.
}


setInterval(revelation, HALF_SECOND); // Calls revelation function every 0.5 second.
$(`.top-secret`).on(`click`, redact); // Selects top-secret class, calls click listener, and calls function redact.


function redact(event) { // Defines the redact function. event is passed since the function is listening via .on
  $(this).removeClass(`revealed`); // Removes the revealed class.
  $(this).addClass(`redacted`); // Adds the redacted class.

  if (clickCounter >= ELEVEN) {
    spokenLetterBackward(); // Calls the spokenLetterBackward function if the user has made 12 previous clicks.
  }
  else { // Otherwise...
    spokenLetter(); // Calls the spokenLetter function
  }
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


setInterval(spokenInstruction(), ONE_SECOND); // Calls spokenInstruction after one second

function spokenInstruction() { // Defines the spokenInstruction function.
  responsiveVoice.speak(instruction[0]); // Responsive tells the user the task.
}


function spokenLetter() { // Defines the spokenLetter function
  responsiveVoice.speak(letter[currentIndex]); // Assigns the letter array to responsiveVoice, from 0 to 8.
  currentIndex = currentIndex + 1; // Allows each click on the top-secret class to progress through the array.

  if (currentIndex === letter.length + 1) { // If the array has been said, then the subsequent click will...
    passwordPrompt(); // Calls the passwordPrompt function.
  }
}


function passwordPrompt() { // Defines the passwordPrompt function.
  let secretWord = prompt("Enter password to terminate infiltration:")
  if (secretWord == `cessation`) { // If user types in "cessation", then...
    window.close(); // Closes window for security reasons.
  }
  else { // Otherwise...
    responsiveVoice.speak(instruction[1]); // Responsive Voice says the password was incorect password, try backwards..
  }
}


function spokenLetterBackward() { // Defines the spokenLetterBackward.
  responsiveVoice.speak(letterBackward[currentIndexBackward]); // Assigns the letterBackward array to responsiveVoice, from 0 to 8.
  currentIndexBackward = currentIndexBackward + 1; // Allows each click on the top-secret class to progress through the array.

  if (currentIndexBackward === letterBackward.length + 1) { // If the array has been said, then the subsequent click will...
    passwordPromptFinal(); // Calls the passwordPromptFinal function.
  }
}


function passwordPromptFinal() { // Defines the passwordPrompt function
  let secretWord = prompt("Enter the SUPER IMPORTANT password to terminate infiltration:")
  if (secretWord == `cessation`) {
    window.close(); // Closes window for security reasons.
  }
  else { // Otherwise...
    responsiveVoice.speak(instruction[2]); // Responsive Voice says the password was incorect too many times.
    slideContent(); // Calls the slideContent function.
  }
}


function slideContent() { // Defines the slideContent function.
  $(`#secret-document`) //
  .slideUp(TWO_HALF_SECOND);
}
