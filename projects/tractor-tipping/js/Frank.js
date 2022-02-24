class Frank {
  constructor(x, y, frankImage) {
    this.x = x;
    this.y = y;
    this.image = frankImage;
    this.vx = 0;
    this.vy = 0;
    this.speed = 1;
  }


  display() {
    push(); // Isolates code from using global properties.
    imageMode(CENTER); // Formats image from the center outwards.
    translate(this.x, this.y); // Transalte the image postion.
    image(this.image, 100, 0); // Orgin point has been moved to where we want to draw due to translate.
    pop(); // Isolates code from using global properties.
  }


  overlapMater(mater) { // Provides tractor as an argument to connect mater class to tractor class. Locates the center point of both mater and tractor.
    if (this.x > mater.x - mater.image.width / 2 && // If frank's x position is greater than mater's x position, minus mater's width / 2.
        this.x < mater.x + mater.image.width / 2 && // If frank's x position is less than mater's x position, plus mater's width / 2.
        this.y > mater.y - mater.image.height / 2 && // If frank's y position is greater than mater's y position, minus mater's width / 2.
        this.y < mater.y + mater.image.height / 2) { // If frank's y position is less than mater's y position, plus mater's width / 2.
          this.touchMater(); // Then, call the touchMaterState function.
    }
  }


  touchMater() { // Function that calls the touchMaterState in script.js.
    state = `loser`; // Runs the loser state.
    talkingMaterLoser(); // Calls the talkingMaterLoser function in script.js
  }


  move() {
    this.y += this.vy; // Provides vertical velocity to Frank.
    this.vy = this.speed; // Provides a moving speed for Frank.

    if (this.y > height) { // If Frank makes it off the screen without touching Mater, then...
      this.gameWinner(); // Call the gamerWinner function.
    }
  }


  gameWinner() {
    state = `winner`; // Runs the winner state.
    talkingMaterWinner(); // Calls the talkingMaterWinner function in script.js
  }

}
