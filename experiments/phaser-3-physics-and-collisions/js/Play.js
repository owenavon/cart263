class Play extends Phaser.Scene {

  constructor() {
    super({
      key: `play` // Keyname to refer to this class.
    });
  }

  create() {
    this.walls = this.physics.add.group({ // Creates walls group.
      key: `wall`,
      immovable: true,
      quantity: 100
    });
    this.walls.children.each(function(wall) { // Provides access to all of the walls (children).
      let x = Math.random() * this.sys.canvas.width; // Generates a random number between 0 and the width.
      let y = Math.random() * this.sys.canvas.height; // Generates a random number between 0 and the height.
      wall.setPosition(x, y); // Sets each wall at a random position.
      wall.setTint(0xdd3333); // Tints wall to red via hexadecimal colour.
    }, this); // Use this to pass parameters as an argument.


    this.collectables = this.physics.add.group({ // Creates collectables group.
      key: `wall`,
      quantity: 100
    });
    this.collectables.children.each(function(collectable) { // Provides access to all of the collectable (children).
      let x = Math.random() * this.sys.canvas.width; // Generates a random number between 0 and the width.
      let y = Math.random() * this.sys.canvas.height; // Generates a random number between 0 and the height.
      collectable.setPosition(x, y); // Sets each collectable to a random position.
      collectable.setTint(0x33dd33); // Tints collectables to green via hexadecimal colour.
    }, this); // Use this to pass parameters as an argument.


    this.avatar = this.physics.add.sprite(200, 200, `avatar`); // Save reference by calling this.avatar.

    this.createAnimations(); // Defines the createAnimations method.

    // Physics System
    this.avatar.play(`avatar-idle`) // Play the avatar-moving animation.
    this.avatar.setCollideWorldBounds(true); // Constrains avatar to the canvas.

    this.physics.add.collider(this.avatar, this.walls); // Avatar will collide with the walls group.
    this.physics.add.overlap(this.avatar, this.collectables, this.collectItem, null, this); // this refers to the scene called by this.collectable.

    this.cursors = this.input.keyboard.createCursorKeys(); // Provides method to access keyboard keys.
  }

  collectItem(avatar, collectable) { // Refer to parameters directly, since this is defined in overlap.
    collectable.destroy(); // Removes collectable when overlaped with avatar.
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
