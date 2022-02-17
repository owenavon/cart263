class Tractor {
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

    this.found = false; // Assigns a boolean value.
    this.rotationSpeed = 0.1; // Assigns a rotation speed.
  }

  display() {
    push(); // Isolates code from using global properties.
    imageMode(CENTER); // Fromats image from the center outwards.
    translate(this.x, this.y); // Transalte the image postion.
    rotate(this.angle); // Allows the animal to rotate.
    image(this.image, 0, 0); // Orgin point has been moved to where we want to draw due to translate.
    pop(); // Isolates code from using global properties.
  }


  // tip() {
  //   if (this.found) { // If the sausagedog is clicked on then...
  //     this.angle += this.rotationSpeed; // Allows the sausageDog to rotate.
  //     // this.angle = constrain(this.angle, 90, 0); // Constrains the tractor to rotate to 90 degrees.
  //   }
  // }

}
