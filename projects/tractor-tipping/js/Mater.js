class Mater { // Creates a class that is called from script.js.
  constructor(x, y, image) { // Calls x, y, and image from script.js.
    this.x = x; // Defines intial mater x postion in script.js.
    this.y = y; // Defines intial mater y postion in script.js.
    this.image = image; // Defines image variable in script.js.
    this.vx = 0; // Assigns an intial horizontal X velocity of zero (0). No automated movement.
    this.vy = 0; // Assigns an intial vertical Y velocity of zero (0). No automated movement.
    this.speed = 3; // Assigns an intial movement velcoity of 3. (Moderate moving speed).
    // this.jump = 0; // Assigns mater an intial jumping value of 0.
    // this.jumpMax = 1; // Assigns mater a maxium jumping height of 1.
    this.width = 0; // Assigns an intial width of zero (0).
    this.height = 0; // Assigns an intial height of zero (0).
  }


  display() {
    push(); // Isolates code from using global properties.
    imageMode(CENTER); // Formats image from the center outwards.
    translate(this.x, this.y); // Transalte the image postion.
    image(this.image, 0, 0); // Orgin point has been moved to where we want to draw due to translate.
    pop(); // Isolates code from using global properties.
  }

  touchTractorState() { // Function that calls the touchTractor state in script.js.
    state = `touchTractor`; // Runs the touchTractor state.
  }


  overlapTractor(tractor) { // Provides tractor as an argument to connect mater class to tractor class. Locates the center point of both mater and tractor.
    if (this.x > tractor.x - tractor.image.width / 2 && // If mater's x position is greater than tractor's x position, minus tractors's width / 2.
        this.x < tractor.x + tractor.image.width / 2 && // If mater's x position is less than tractor's x position, plus tractors's width / 2.
        this.y > tractor.y - tractor.image.height / 2 && // If mater's y position is greater than tractor's y position, minus tractor's width / 2.
        this.y < tractor.y + tractor.image.height / 2) { // If mater's y position is less than tractor's y position, plus tractor's width / 2.
          this.touchTractorState(); // Then, call the touchTractor function.
    }
  }


  handleInput() {
    if (keyIsDown(LEFT_ARROW)) { // If the user presses the left arrow key, then...
      this.vx = -this.speed; // Make mater move horizontally to the left.
    }
    else if(keyIsDown(RIGHT_ARROW)) { // If the user presses the right arrow key, then...
      this.vx = this.speed; // Make mater move horizontally to the right.
    }
    else { // Otherwise...
      this.vx = 0; // Keep mater's horizontal position static.
    }

    if (keyIsDown(UP_ARROW)) { // If the user presses the up arrow key, then..
      this.vy = -this.speed; // Make mater move vertically upwards.
    }
    else if(keyIsDown(DOWN_ARROW)) { // If the user presses the down arrow key, then..
      this.vy = this.speed; // Make mater move vertically downwards.
    }
    else { // Otherwise...
      this.vy = 0; // Keep mater's vertical position static.
    }
  }


  move() {
    this.x += this.vx; // Provides a horizontal velocity to mater.
    this.y += this.vy; // Provides a vertical velocity to mater.

    this.x = constrain(this.x, 0, width); // Constrains Mater to the canvas width.
    this.y = constrain(this.y, 0, width); // Constrains Mater to the canvas width.
  }

}
