class SausageDog extends Animal {
  constructor(x, y, image, winnerSFX) { // Call variables from script.js
    super(x, y, image); // Calls the animal constructor

    this.found = false;
    this.rotationSpeed = 0.25;
    this.winnerSFX = winnerSFX;
  }


  update() { // SausageDog version of update
    super.update(); // Updates from animal class

    if (this.found) { // Bollean value (True or False)
      this.angle += this.rotationSpeed; // Allows the sauasgeDog to rotate
    }
  }


  winState() { // Function that is called within setTimeout to create delay
    state = `winner`; // Runs the simulation state
  }


  mousePressed() { // Function called from script.js
    if (this.overlap(mouseX, mouseY)) { // Correlates to overlap function in Animal.js
        this.found = true; // Assign true if user clicks on Sausage Dog image.
        setTimeout(this.winState.bind(this), 1750); // Allows the Sausage Dog to spin for 1.75 seconds prior to changing states.
        if (!this.winnerSFX.isPlaying()) { // Plays winnerSFX when Sausage Dog is found.
          this.winnerSFX.play();
        }
      }
    }
  }
