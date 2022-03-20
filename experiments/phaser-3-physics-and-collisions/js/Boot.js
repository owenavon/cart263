class Boot extends Phaser.Scene { // Default phaser 3 construct that manages scenes

  constructor() {
    super({
      key: `boot`
    });
  }

  preload() { // preload is only needed in Boot class, as it is where we load everything in our game.
    this.load.image(`wall`, `assets/images/wall.png`);

    this.load.spritesheet(`avatar`, `assets/images/avatar.png`, {
      frameWidth: 32,
      frameWidth: 32,
      endFrame: 6 // Last frame
    });

    this.load.on(`complete`, () => {
      this.scene.start(`play`); // Switch to play scene once files are loaded. Can use "this" becuase of the arrow function.
    });
  }

  create() {
    let style = {
      fontFamily: `sans-serif`,
      fontSize: `40px`,
      color: `#ffffff`
    };
    let loadingString = `Loading...`
    this.add.text(100, 100, loadingString, style); // this refer to the play scene. add, helps us create and add into scene.


  }

  update() {

  }

}
