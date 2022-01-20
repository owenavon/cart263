class Animal {
  constructor(x, y , image, wrongSFX) { // Call variables from script.js
    this.x = x;
    this.y = y;
    this.image = image;
    this.angle = 0;
    this.wrongSFX = wrongSFX;
  }

  update() {
    this.display(); // Method that gets defined inside of update
  }

  display() {
    push();
    imageMode(CENTER); // Fromats image from the center outwards
    translate(this.x, this.y); // Transalte the image postion
    rotate(this.angle); // Allows the animal to rotate
    image(this.image, 0, 0); // Orgin point has been moved to where we want to draw due to translate
    pop();
  }

  overlap(x, y) {
    if(x > this.x - this.image.width / 2 && // Centre postion minus half the width provides the left hand edge of the sausage dog
        x < this.x + this.image.width / 2 &&
        y > this.y - this.image.height / 2 && // Centre postion plus half the width provides the right hand edge of the sausage dog
        y < this.y + this.image.height / 2) {
        return true;
    }
    else {
      return false;
    }
  }


  mousePressed() { // Function called from script.js
    if (this.overlap(mouseX, mouseY)) { // Correlates to overlap function in Animal.js
        this.found = false; // Assign true if user clicks on Sausage Dog image.
        this.image.resize(50, 50); // Resizes the snimal to 50% when cliked.
        if (!this.wrongSFX.isPlaying()) { // Plays wrongSFX when animal is found.
          this.wrongSFX.play();
        }
      }
    }
  }
