class SausageDog extends Animal { // Creates a class that is called from script.js
  constructor(x, y, image, winnerSFX) { // Call variables from script.js
    super(x, y, image); // Connects SausageDog to Animal, so that x, y, and image do not need to be defined again.

    this.found = false; // Assigns a boolean value.
    this.rotationSpeed = 0.25; // Assigns a rotation speed.
    this.winnerSFX = winnerSFX; // Defines a sound effect.
  }


  update() { // SausageDog version of update.
    super.update(); // Updates from animal class.

    if (this.found) { // If the sausagedog is clicked on then...
      this.angle += this.rotationSpeed; // Allows the sausageDog to rotate.
    }
  }


  winState() { // Function that is called within setTimeout to create delay.
    state = `winner`; // Runs the simulation state.
  }


  mousePressed() { // Function called from script.js
    if (this.overlap(mouseX, mouseY)) { // Correlates to overlap function in Animal.js
        this.found = true; // Assign true if user clicks on Sausage Dog image.
        setTimeout(this.winState.bind(this), 1750); // Allows the Sausage Dog to spin for 1.75 seconds prior to changing states.
        if (!this.winnerSFX.isPlaying()) { // If winnerSFX is not playing when sausageDog is found, then...
          this.winnerSFX.play(); // Play winnerSFX when Sausage Dog is found.
        }
      }
    }
  }
