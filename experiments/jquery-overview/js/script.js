// Spend time with the api documentation to fully understand the capabilities of the various methods.

$(`#main-heading`).remove(); // select the id for removal, and use the jquery remove method.

// let $p = $(`<p></p>`); // Create elements by using the jquery function and putting html tags inside.
// $p.text(`Fresh, fresh paragraph!`); // Sets $p textual content
//
// $(`h2`).after($p); // Adds $p after h2 element. before is another option...
// $(`#second-section`).append($p); // Adds $p into the bottom of second-section id. prepend adds it to the start of the second-section id.

// let $link = $(`#thicc-link`); // Assigns id to variable
//
// if($link.attr(`href`) === `https://thi.cc`) { // If hyperlink is equal to https://thi.cc, then...
//   $link.text(`THICC`); // Change link text to THICC.
// }

// $(`#main-heading`).attr(`contenteditable`, `true`); // Editable heading for front end user

// let spanHTML = $(`#example-span`).html(); // Uses html method with no argument to return current html content.
// $(`#example-span`).html(`<strong>${spanHTML}</strong>`); // Sets html to a string with a strong tag around the spanHTML variable.

// let spanText  = $(`#example-span`).text(); // Returns text in the string.
// let reversedSpanText = spanText.split(``).reverse().join(``); // Assigns reversedSpanText to reversed text.
// $(`#example-span`).text(reversedSpanText); // Sets the example-span back into the span.

// $(`#example-span`).text(`a Spaniel`); // Change text in example-span id.

// $(`.header`).css({ // Object that contains various properties that are to be effected by the css method.
//   "color": `blue`,
//   "background-color": `black`,
//   "font-size": `10rem`
// });

// let $headers = $(`.header`); // Select $headers once, and act on action 3 times.
//
// $headers.css(`color`, `red`); // Changes .header text color to red.
// $headers.css(`background-color`, `black`); // Changes background color to black.
// $headers.css(`font-size`, `3rem`); // Changes font size to 3rem.

// $(`.header`).css(`color`, `#ff0000`); // Selects the header class, and apply the css method to element to change color to red.

// $(`#main-heading`).css(`color`, `#ff0000`); // Selects the main-heading element, and apply the css method to element to change color to red.

// let $mainHeading = $(`#main-heading`); // $ Selects the element with the ID of main-heading in index.html, and returns it.
// $mainHeading.css(`color`, `#339966`); // Uses css method to select the mainHeading's color to green.
