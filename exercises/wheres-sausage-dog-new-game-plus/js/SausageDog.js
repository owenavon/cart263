class SausageDog extends Animal {
  constructor(x, y, image) {
    super(x, y, image); // Calls the animal constructor

    this.found = false;
    this.rotationSpeed = 0.25;
  }

  update() { // SausageDog version of update
    super.update(); // Updates from animal class

    if (this.found) { // Bollean value (True or False)
      this.angle += this.rotationSpeed; // Allows the sauasgeDog to rotate
    }
  }

  setTimeout() { // OR setInterval??

  }

  mousePressed() { // function called from script.js
    if (this.overlap(mouseX, mouseY)) { // Correlates to overlap function in Animal.js
        this.found = true; // Assign true if user clicks on Sausage Dog image
    }
  }
}
