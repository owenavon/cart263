let mainHeading = document.getElementById(`main-heading`); // Allows the script to acess the main-heading id attribute from index.html.

mainHeading.parentElement.removeChild(mainHeading); // Gets hold of the parent element, in order to remove the child element. Allows for deletion of main-heading content.

// let newP = document.createElement(`p`); // Creates a new element inside of js.
// newP.innerText = `Gosh, I sure do like clowns.`; // Added text to newP using the innerText property.
//
// let clownSection = document.getElementById(`clown-section`); // Locate clown-section, as the place where we want to add newP content.
// clownSection.appendChild(newP); // Used appendChild to add newP text into the clown-section.

// let headers = document.querySelectorAll(`h1`); // css selector
//
// for (let i = 0; i < headers.length; i++) { // For loop to go through array
//   headers[i].style[`color`] = `#ff0000`; // Sets the colour property of headers to red.
// }

// let h2s = document.getElementsByTagName(`h2`); // Allows the script to acess all h2 tags from index.html.
//
// for (let i = 0; i < h2s.length; i++) { // For loop to go through array
//   h2s[i].style[`color`] = `#ff0000`; // Sets the colour property of each h2 element to red.
// }

// let headers = document.getElementsByClassName(`header`); // Allows the script to acess the header class attribute from index.html.

// for (let i = 0; i < headers.length; i++) { // For loop to go through array
//   headers[i].style[`color`] = `#ff0000`; // Sets the colour property of each headers element to red.
// }

// let image = document.getElementById(`clown-image`); // Allows the script to acess the clown-image id attribute from index.html.
//
// image.setAttribute(`src`, `http://loremflickr.com/320/240/clown`); // Manipulate the attributes of clown-image.

// let pronoun = document.getElementById(`pronoun`); // Allows the script to acess the main-heading id attribute from index.html.
//
// pronoun.innerHTML = `<strong>you</strong>`; // Manipulate's html properties.

// if (pronoun.innerText === `we`) { // If innerText is "we", then...
//   pronoun.innerText = `you` // Manipulate the textual content of pronoun id.
// }

// mainHeading.style[`color`] = `#339966`; // Manipulate the mainHeading color.
// mainHeading.style[`font-size`] = `4rem`; // Manipulate the mainHeading font size.
// mainHeading.style[`font-family`] = `Courier, monospace`; // Manipulate the font family.
// mainHeading.style[`background-color`] = `red`; // Manipulate the background colour.
