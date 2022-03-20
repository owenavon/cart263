class Play extends Phaser.Scene {

  constructor() {
    super({
      key: `play` // Keyname to refer to this class.
    });
  }

  create() {
    this.wall = this.add.image(100, 100, `wall`); // Add's image using the key that was defined in the preloader. Assigned into a property.
    this.wall.setTint(0xdd3333); // Tints wall with hexadecimal colour.

    this.avatar = this.add.sprite(200, 200, `avatar`); // Save reference by calling this.avatar.

    this.createAnimations(); // Defines the createAnimations method.
    this.avatar.play(`avatar-idle`) // Play the avatar-idle animation.
  }

  update() {

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
