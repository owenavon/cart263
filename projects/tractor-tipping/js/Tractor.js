class Tractor { // Creates a class that is called from script.js.
  constructor(x, y, tractorImage) { // Calls x, y, and image from script.js.
    this.x = x; // Defines intial tractor x postion in script.js.
    this.y = y; // Defines intial tractor y postion in script.js.
    this.image = tractorImage; // Defines image variable in script.js.
    this.angle = 0; // Assigns an intial angle of 0, so the image starts out as square.
    this.maxAngle = 96; // Assigns a maxAngle so that the tractor tips onto it's side.
    this.width = 0; // Assigns an intial width of 0.
    this.height = 0; // Assigns an intial height of 0.
    this.rotationSpeed = 0.1; // Assigns a rotation speed.
  }

  update() {
    this.display();
    // this.top();
    this.overlapMater(mater);
  }

  display() {
    push(); // Isolates code from using global properties.
    imageMode(CENTER); // Formats image from the center outwards.
    translate(this.x, this.y); // Transalte the image postion.
    rotate(this.angle); // Allows the animal to rotate.
    image(this.image, this.width, this.height); // Orgin point has been moved to where we want to draw due to translate.
    pop(); // Isolates code from using global properties.
  }


  tip() {
      // this.angle += this.rotationSpeed; // Allows the sausageDog to rotate.
      this.angle = constrain(this.angle, this.maxAngle, 0); // Tips the tractor 90 degrees.
  }


  touchMaterState() { // Function that calls the touchTractor state in script.js.
    state = `touchTractor`; // Runs the touchTractor state.
  }


  overlapMater(mater) { // Provides tractor as an argument to connect mater class to tractor class. Locates the center point of both mater and tractor.
    if (this.x > mater.x - mater.image.width / 2 && // If tractors's x position is greater than maters's x position, minus tmaters's width / 2.
        this.x < mater.x + mater.image.width / 2 && // If tractors's x position is less than maters's x position, plus tmaters's width / 2.
        this.y > mater.y - mater.image.height / 2 && // If tractors's y position is greater than maters's y position, minus maters's width / 2.
        this.y < mater.y + mater.image.height / 2) { // If tractors's y position is less than maters's y position, plus maters's width / 2.
          this.touchMaterState(); // Then, call the touchTractor function.
    }
  }


}
