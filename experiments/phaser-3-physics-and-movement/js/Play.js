class Play extends Phaser.Scene {

  constructor() {
    super({
      key: `play` // Keyname to refer to this class.
    });
  }

  create() {
    this.wall = this.physics.add.image(100, 100, `wall`); // Add's image using the key that was defined in the preloader. Assigned into a property.
    this.wall.setTint(0xdd3333); // Tints wall with hexadecimal colour.

    this.avatar = this.physics.add.sprite(200, 200, `avatar`); // Save reference by calling this.avatar.

    this.createAnimations(); // Defines the createAnimations method.

    // Physics System
    this.avatar.play(`avatar-idle`) // Play the avatar-moving animation.
    this.avatar.setCollideWorldBounds(true); // Constrains avatar to the canvas.

    this.cursors = this.input.keyboard.createCursorKeys(); // Provides method to access keyboard keys.
  }

  update() {
    this.avatar.setVelocity(0); // Sets the avatar velocity to nothing.

    if (this.cursors.left.isDown) { // If the user is pressing the left key...
      this.avatar.setVelocityX(-300); // Moves avatar to the left.
    }
    else if (this.cursors.right.isDown) { // If the user is pressing the right key...
      this.avatar.setVelocityX(300); // Moves avatar to the right.
    }

    if (this.cursors.up.isDown) { // If the user is pressing the up key...
      this.avatar.setVelocityY(-300); // Moves avatar upwards.
    }
    else if (this.cursors.down.isDown) { // If the user is pressing the down key...
      this.avatar.setVelocityY(300); // Moves avatar downwards.
    }

    if (this.avatar.body.velocity.x !== 0 || this.avatar.body.velocity.y !== 0) { // body represnts the avatar in the world of the physics engine. If there is movement on y or x, then...
      this.avatar.play(`avatar-moving`, true); // True means if the animation is already playing, don't recall it from frame 0 everytime it is drawn.
    }
    else { // Otherwise, avatar is not moving and...
      this.avatar.play(`avatar-idle`, true) // Play avatar idle animation.
    }
  }

  createAnimations() {
    this.anims.create({
      key: `avatar-moving`, // Specific keyname for this sprite.
      frames: this.anims.generateFrameNumbers(`avatar`, { // Helper function that specifies the frames of the animations we want.
        start: 0,
        end: 6
      }),
      frameRate: 24,
      repeat: -1 // Loops infinitely
    });

    this.anims.create({
      key: `avatar-idle`, // Specific keyname for this sprite.
      frames: this.anims.generateFrameNumbers(`avatar`, { // Helper function that specifies the frames of the animations we want.
        start: 0,
        end: 0
      }),
      frameRate: 24,
      repeat: 0
    });
  }
}
