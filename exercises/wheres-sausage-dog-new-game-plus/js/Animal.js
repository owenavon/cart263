class Animal { // Creates a class that is called from script.js
  constructor(x, y , image, wrongSFX) { // Call variables from script.js
    this.x = x; // Defines a x postion.
    this.y = y; // Defines a y postion.
    this.image = image; // Defines an image (animals).
    this.wrongSFX = wrongSFX; // Defines a sound effect
    this.angle = 0; // Assigns a starting rotation
  }

  update() {
    this.display(); // function that is created inside of update.
  }

  display() {
    push(); // Isolates code from using global properties.
    imageMode(CENTER); // Fromats image from the center outwards.
    translate(this.x, this.y); // Transalte the image postion.
    rotate(this.angle); // Allows the animal to rotate.
    image(this.image, 0, 0); // Orgin point has been moved to where we want to draw due to translate.
    pop(); // Isolates code from using global properties.
  }

  overlap(x, y) { // Connects to mouseX & MouseY postion.
    if(x > this.x - this.image.width / 2 && // Centre postion minus half the width provides the left hand edge of the sausage dog.
        x < this.x + this.image.width / 2 &&
        y > this.y - this.image.height / 2 && // Centre postion plus half the width provides the right hand edge of the sausage dog.
        y < this.y + this.image.height / 2) {
        return true; // Tells the program that the cursor is overtop of an animal.
    }
    else { // Only happens if the first part of code returns false.
      return false; // Tells the program that the cursor is not overtop of an animal.
    }
  }


  mousePressed() { // Function called from script.js
    if (this.overlap(mouseX, mouseY)) { // Correlates to overlap function in Animal.js
        this.found = false; // Assign true if user clicks on Sausage Dog image.
        this.image.resize(50, 50); // Resizes the animal to 50% when cliked.
        if (!this.wrongSFX.isPlaying()) { // If wrongSFX is not playing when animal (not sauasgeDog) is found, then...
          this.wrongSFX.play(); // Play wrongSFX when any animal is found.
        }
      }
    }
  }
