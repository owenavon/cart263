class Play extends Phaser.Scene {

  constructor() {
    super({
      key: `play` // Keyname to refer to this class.
    });
  }

  create() {
    let style = {
      fontFamily: `sans-serif`,
      fontSize: `40px`,
      color: `#ffffff`
    };
    let gameDescription = `Think of a number... wrong!`
    this.add.text(100, 100, gameDescription, style); // this refer to the play scene. add, helps us create and add into scene.
  }

  update() {

  }

}
