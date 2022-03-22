class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: `boot`
    });
  }

  preload() {
    // load assets here...
    this.load.image(`avatar`, `assets/images/avatar.png`);
    this.load.image(`thumbs-down`, `assets/images/thumbs-down.png`);
    this.load.image(`thumbs-up`, `assets/images/thumbs-up.png`);

    this.load.on(`complete`, () => { // Arrow function is a tidy way to use this, as you would in the preload method.
      this.scene.start(`play`);
    });
  }

  create() {

  }

  update() {

  }
}
