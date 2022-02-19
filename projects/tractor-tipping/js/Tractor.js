class Tractor { // Creates a class that is called from script.js.
  constructor(x, y, image) { // Calls x, y, and image from script.js.
    this.x = x; // Defines intial tractor x postion in script.js.
    this.y = y; // Defines intial tractor y postion in script.js.
    this.image = image; // Defines image variable in script.js.
    this.angle = 0; // Assigns an intial angle of 0, so the image starts out as square.
    this.maxAngle = 96; // Assigns a maxAngle so that the tractor tips onto it's side.
    this.width = 0; // Assigns an intial width of 0.
    this.height = 0; // Assigns an intial height of 0.
    this.rotationSpeed = 0.1; // Assigns a rotation speed.
  }

  display() {
    push(); // Isolates code from using global properties.
    imageMode(CENTER); // Formats image from the center outwards.
    translate(this.x, this.y); // Transalte the image postion.
    rotate(this.angle); // Allows the animal to rotate.
    image(this.image, 0, 0); // Orgin point has been moved to where we want to draw due to translate.
    pop(); // Isolates code from using global properties.
  }


  tip() {
      // this.angle += this.rotationSpeed; // Allows the sausageDog to rotate.
      this.angle = constrain(this.angle, this.maxAngle, 0); // Tips the tractor 90 degrees.
  }
}
