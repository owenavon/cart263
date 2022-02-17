class Mater {
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.vx = 0;
    this.vy = 0;
    this.speed = 3;
    this.angle = 0;
    this.alive = true;
    this.width = 0;
    this.height = 0;
  }


  display() {
    push(); // Isolates code from using global properties.
    imageMode(CENTER); // Fromats image from the center outwards.
    translate(this.x, this.y); // Transalte the image postion.
    image(this.image, 0, 0); // Orgin point has been moved to where we want to draw due to translate.
    pop(); // Isolates code from using global properties.
  }


  overlap(tractor) {
    if (this.x > tractor.x - tractor.image.width / 2 &&
        this.x < tractor.x + tractor.image.width / 2 &&
        this.y > tractor.y - tractor.image.height / 2 &&
        this.y < tractor.y + tractor.image.height / 2) {
      this.alive = false;

    }
    console.log(this.x, this.y, this.width, this.height, tractor.x, tractor.y);
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
