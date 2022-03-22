class Play extends Phaser.Scene {
  constructor() {
    super({
      key: `play`
    });
  }

  create() {
    // Create the avatar
    this.avatar = this.physics.add.sprite(400, 300, `avatar`);
    this.avatar.setCollideWorldBounds(true);

    this.sadness = this.physics.add.sprite(0, 0, `thumbs-down`);
    Phaser.Actions.RandomRectangle([this.sadness], this.physics.world.bounds); // Sets the thumbs down at a random position within the canvas array (rectangle).

    this.happiness = this.physics.add.group({
      key: `thumbs-up`,
      quantity: 120,
      bounceX: 0.5,
      bounceY: 0.5,
      collideWorldBounds: true, // Keys the group elements within the canvas.
      dragX: 50, // declaration by 50px / second on the x-axis.
      dragY: 50 // declaration by 50px / second on the y-axis.
    })
    Phaser.Actions.RandomRectangle(this.happiness.getChildren(), this.physics.world.bounds); // Sets the thumbs up at a random position within the canvas array (rectangle).

    this.physics.add.overlap(this.avatar, this.sadness, this.getSad, null, this); // Creates overlap.
    this.physics.add.collider(this.avatar, this.happiness); // Allows all of the thumbs up (happiness group) to interact with one another. (Bump and push each other).
    this.physics.add.collider(this.sadness, this.happiness); // Allows all of the thumbs up to also bump the thumbs down
    this.physics.add.collider(this.happiness, this.happiness); // Allows the happiness group to bump into one another. Rather than slide through each other.

    this.cursors = this.input.keyboard.createCursorKeys(); // Initiates the the keyboard input.
  }

  getSad(avatar, sadness) {
    this.sadness.setPosition(x, y); // Moves thumb to a new random location upon overlap.
    Phaser.Actions.RandomRectangle([sadness], this.physics.world.bounds); // Sets the thumbs down at a random position within the canvas array (rectangle).
  }

  update() {
    this.handleInput(); // Defines the handleInput method.
  }

  handleInput() {
    if (this.cursors.left.isDown) { // If the user is pressing the left key...
      this.avatar.setAngularVelocity(-150); // Moves avatar to the left.
    }
    else if (this.cursors.right.isDown) { // If the user is pressing the right key...
      this.avatar.setAngularVelocity(150); // Moves avatar to the right.
    }
    else {
      this.avatar.setAngularVelocity(0);
    }
    if (this.cursors.up.isDown) { // If the user is pressing the up key...
        this.physics.velocityFromRotation(this.avatar.rotation, 200, this.avatar.body.acceleration); // Moves avatar upwards, with acceleration effect.
    }
    else {
      this.avatar.setAcceleration(0);
    }
  }

}
