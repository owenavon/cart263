class Frank {
  constructor(x, y, frankImage) {
    this.x = x;
    this.y = y;
    this.image = frankImage;
    this.vx = 0;
    this.vy = 0;
    this.speed = 1;
  }

  // DISPLAY FRANK
  display() {
    push(); // Isolates code from using global properties.
    imageMode(CENTER); // Formats image from the center outwards.
    translate(this.x, this.y); // Transalte the image postion.
    image(this.image, 100, 0); // Orgin point has been moved to where we want to draw due to translate.
    pop(); // Isolates code from using global properties.
  }

  // CALCULATE DISTANCE BETWEEN FRANK AND MATER
  overlapMater(mater) { // Provides tractor as an argument to connect mater class to tractor class. Locates the center point of both mater and tractor.
    if (this.x > mater.x - mater.image.width / 2 && // If frank's x position is greater than mater's x position, minus mater's width / 2.
        this.x < mater.x + mater.image.width / 2 && // If frank's x position is less than mater's x position, plus mater's width / 2.
        this.y > mater.y - mater.image.height / 2 && // If frank's y position is greater than mater's y position, minus mater's width / 2.
        this.y < mater.y + mater.image.height / 2) { // If frank's y position is less than mater's y position, plus mater's width / 2.
          this.touchMater(); // Then, call the touchMaterState function.
    }
  }

  // FUNCTIONS THAT ARE CALLED WHEN FRANK AND MATER OVERLAP
  touchMater() { // Function that calls the touchMaterState in script.js.
    state = `loser`; // Runs the loser state.
    generateDelayWaitLoser();
    generateLoserDelay(); // Calls the generateLoserDelay function is script.js
  }

  // PROVIDE FRANK VELOCITY AND FOLLOW MATER ABILITY
  move(mater) {
    this.x += this.vx; // Provides horizontal velocity to Frank.
    this.vx = this.speed; // Provides a moving speed for Frank.

    this.y += this.vy; // Provides vertical velocity to Frank.
    this.vy = this.speed; // Provides a moving speed for Frank.

    this.dx = this.x - mater.x; // Defines the x position difference between frank and mater.
    this.dy = this.y - mater.y; // Defines the y position difference between frank and mater.

    if (this.dx < 0) { // Mater is the right of frank.
      this.vx = this.speed; // Frank pursues Mater to the right.
    }
    else if (this.dx > 0) { // Mater is to the left of frank.
      this.vx = -this.speed; // Frank pursues Mater to the left.
    }

    if (this.dy < 0) { // Mater is below Frank.
      this.vy = this.speed; // Frank pursues below towards mater.
    }

    if (this.y > height) { // If Frank makes it off the screen without touching Mater, then...
      this.gameWinner(); // Call the gameWinner function.
    }
  }

  // FUNCTIONS THAT ARE CALLED WHEN FRANK EXCEEDS THE CANVAS HEIGHT
  gameWinner() {
    state = `winner`; // Runs the winner state.
    talkingMaterWinner(); // Calls the talkingMaterWinner function in script.js
    generateWinnerDelay(); // Calls the generateWinnerDelay function is script.js
  }

}
