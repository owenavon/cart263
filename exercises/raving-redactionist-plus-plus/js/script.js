
// Raving Redactionist Plus Plus
// Owen Avon

// Click on the revealed information to redact it as quickly as possible. See README.md for further information.

"use strict";

const HALF_SECOND = 500; // Assigns 500 milliseconds (0.5 seond) to HALF_SECOND constant.
const ONE_SECOND = 1000; // Assigns 1000 milliseconds (1 second) to ONE_SECOND constant.
const FIVE_SECOND = 5000; // Assigns 5000 milliseconds (5 seconds) to FIVE_SECOND constant.
const TEN_PERCENT = 0.1; // Assigns 0.1 value to TEN_PERCENT constant.
const ELEVEN = 11; // Assigns a value of 11 to ELEVEN constant.

let selfDestruct = 3; // Sets the selfDestruct timer to 3 seconds.
let currentIndex = 0; // Sets the intial currentIndex to 0.
let currentIndexBackward = 0; // Sets the intial currentIndexBackward to 0.
let clickCounter = 0; // Sets the intial clickCounter to 0.


let instruction = [
  `The Russians are hacking. Quickly redact the revealed information. Take note of the spoken letters.`,
  `Incorect Password. Maybe hearing the spoken letters backwards is easier for you?`,
  `Incorrect! Automatic system shutdown to protect American integrity.`,
  `Success! The document will now self-destruct.`
];


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


function onClick() { // Defines the onClick function.
  $(`#click`).on(`click`); // Selects click id, calls click listener, and waits for mouse click.
  clickCounter += 1; // Allows the click counter to increase by 1 after each click.

  $("#counter-value").text(clickCounter); // Assigns the clickCounter value to counterValue ID to be used in HTML.
  console.log(`Click # ${clickCounter}`); // Console logs the click counter.
}


setInterval(revelation, HALF_SECOND); // Calls revelation function every 0.5 second.
$(`.top-secret`).on(`click`, redact); // Selects top-secret class, calls click listener, and calls function redact.


function redact(event) { // Defines the redact function. event is passed since the function is listening via .on
  $(this).removeClass(`revealed`); // Removes the revealed class.
  $(this).addClass(`redacted`); // Adds the redacted class.

  if (clickCounter >= ELEVEN) { // Says, if the clickCounter is greater then or equal to 11 clicks, then...
    spokenLetterBackward(); // Call the spokenLetterBackward function.
  }
  else { // Otherwise...
    spokenLetter(); // Call the spokenLetter function.
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
    $(this).animate({ // Animates the reveal by increasing font-size
      "font-size": "2rem" // font-size increase to 2rem.
    }, 2000); // foint-size transition over 2 seconds.
  }
}


setInterval(spokenInstruction(), ONE_SECOND); // Calls spokenInstruction after one second

function spokenInstruction() { // Defines the spokenInstruction function.
  responsiveVoice.speak(instruction[0]); // Responsive tells the user the task.
}


function spokenLetter() { // Defines the spokenLetter function
  responsiveVoice.speak(letter[currentIndex]); // Assigns the letter array to responsive Voice, from 0 to 8.
  currentIndex = currentIndex + 1; // Allows each click on the top-secret class to progress through the array.

  if (currentIndex === letter.length + 1) { // If the array reaches the last element + 1, then the subsequent click will...
    passwordPrompt(); // Call the passwordPrompt function.
  }
}


function passwordPrompt() { // Defines the passwordPrompt function.
  let secretWord = prompt("Enter password to terminate infiltration:") // Text that displays on the first prompt alert.
  if (secretWord == `cessation`) { // If user types in "cessation", then...
    passwordCorrectVoice(); // Responsive Voice congratulates user.
    timerSelfDestruct(); // Timer starts countdown from 5 seconds.
  }
  else { // Otherwise...
    responsiveVoice.speak(instruction[1]); // Responsive Voice says the password is incorect. Perhaps saying it backwards may help...
  }
}


function spokenLetterBackward() { // Defines the spokenLetterBackward.
  responsiveVoice.speak(letterBackward[currentIndexBackward]); // Assigns the letterBackward array to responsive Voice, from 0 to 8.
  currentIndexBackward = currentIndexBackward + 1; // Allows each click on the top-secret class to progress through the array.

  if (currentIndexBackward === letterBackward.length + 1) { // If the array reaches the last element + 1, then the subsequent click will...
    passwordPromptFinal(); // Call the passwordPromptFinal function.
  }
}


function passwordPromptFinal() { // Defines the passwordPrompt function
  let secretWord = prompt("Enter the SUPER IMPORTANT password to terminate infiltration:") // Text that displays on the second prompt alert.
  if (secretWord == `cessation`) { // If user types in "cessation", then...
    passwordCorrectVoice(); // Responsive Voice congratulates user.
    timerSelfDestruct(); // Timer starts countdown from 5 seconds.
  }
  else { // Otherwise...
    responsiveVoice.speak(instruction[2]); // Responsive Voice says the password is incorect too many times.
    slideContent(); // Calls the slideContent function.
  }
}


function passwordCorrectVoice() { // Defines the passwordCorrectVoice function.
  responsiveVoice.speak(instruction[3]); // Responsive Voice says the password is correct!
}


function timerSelfDestruct() { // Defines the timerSelfDestruct function.
  setInterval(destruction, 1000); // Creates a timer that calls the function destruction, divisible by 1 second.
}


function destruction() { // Defines the destruction function.
  if (selfDestruct > 0) { // Says, if the timer is an interger greater than zero (0), then...
    selfDestruct--; // Decrease the number by 1.
  }
  else if (selfDestruct === 0) { // Says, if the timer reaches zero (0), then...
    window.close(); // Call js function to close browser window.
  }
}


function slideContent() { // Defines the slideContent function.
  $(`#secret-document`) // Selects the secret-document class.
  .slideUp(FIVE_SECOND); // Performs jquery slideUp animation over 5 seconds.
}
