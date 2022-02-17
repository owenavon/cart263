class Tractor extends Mater {
  constructor(x, y, image) {
    super(x, y, image); // Connects SausageDog to Animal, so that x, y, and image do not need to be defined again.

    this.found = false; // Assigns a boolean value.
    this.rotationSpeed = 0.1; // Assigns a rotation speed.
  }

  update() {
    super.update(); // Updates from Mater class.
  }

  tip() {
    if (this.found) { // If the sausagedog is clicked on then...
      this.angle += this.rotationSpeed; // Allows the sausageDog to rotate.
      // this.angle = constrain(this.angle, 90, 0); // Constrains the tractor to rotate to 90 degrees.
    }
  }

}
