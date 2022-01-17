class Animal {
  constructor(x, y , image) {
    this.x = x;
    this.y = y;
    this.image = image;

    this.angle = 0;
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
}
