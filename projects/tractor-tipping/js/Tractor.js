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


  // RESET TRACTOR POSITION UPON STATE CHANGE
  reset(x, y, tractorImage) {
    this.x = x;
    this.y = y;
    this.image = tractorImage; // Defines image variable in script.js.
    this.angle = 0;
    this.maxAngle = 96; // Assigns a maxAngle so that the tractor tips onto it's side.
    this.width = 0; // Assigns an intial width of 0.
    this.height = 0; // Assigns an intial height of 0.
    this.rotationSpeed = 3; // Assigns a rotation speed.
  }


  // DISPLAY TRACTOR
  display() {
    push(); // Isolates code from using global properties.
    imageMode(CENTER); // Formats image from the center outwards.
    translate(this.x, this.y); // Transalte the image postion.
    rotate(this.angle); // Allows the animal to rotate.
    image(this.image, this.width, this.height); // Orgin point has been moved to where we want to draw due to translate.
    pop(); // Isolates code from using global properties.
  }


  // TIP TRACTOR
  tip() {
    this.angle = constrain(this.angle, this.maxAngle, 0); // Tips the tractor 90 degrees.
  }

  // CONSTRAIN TRACTOR
  constrain() {
    this.x = constrain(this.x, 160, 1130); // Constrains Tractor to the canvas width.
    this.y = constrain(this.y, 80, 640); // Constrains Tractor to the canvas width.
  }


  // CALCULATE DISTANCE BETWEEN TRACTOR AND MATER
  distanceToMater(mater) { // Function that determines the distance between mater and tractor, and thus decides to allow microphone input or not.
    this.d = dist(this.x, this.y, mater.x, mater.y) // Assigns mater's and tractors a and y position to d.

    if (this.d > 301) { // Says, if the the distance between mater and tractor is more then 301, turn the microphone input ability off.
      console.log(`Mic off`);
      microphone.stop(); // Does not alow microphone input.
    }

    else if (this.d < 300) { // Says, if the distance between mater and tractor is less then 300, turn the microphone input ability on.
      console.log(`Mic on`); // Does allow microphone input.
      microphone.start();
    }
  }


  // CALCULATE OVERLAP BETWEEN TRACTOR AND MATER
  overlapMater(mater) { // Provides tractor as an argument to connect mater class to tractor class. Locates the center point of both mater and tractor.
    if (this.x > mater.x - mater.image.width / 2 && // If tractors's x position is greater than maters's x position, minus tmaters's width / 2.
        this.x < mater.x + mater.image.width / 2 && // If tractors's x position is less than maters's x position, plus tmaters's width / 2.
        this.y > mater.y - mater.image.height / 2 && // If tractors's y position is greater than maters's y position, minus maters's width / 2.
        this.y < mater.y + mater.image.height / 2) { // If tractors's y position is less than maters's y position, plus maters's width / 2.
        this.materTouch(); // Then, call the touchTractor function.
    }
  }


  // FUNCTIONS THAT ARE CALLED WHEN TRACTOR AND MATER OVERLAP
  materTouch() { // Function that calls the touchTractor state in script.js.
    state = `frankChase`; // Runs the touchTractor state.
    generateFrank(); // Calls the generateFrank function in script.js.
    talkingFrankScene(); // Calls the talkingFrankScene.
    playCombineSound(); // Calls the playCombineSound function.
  }


}
