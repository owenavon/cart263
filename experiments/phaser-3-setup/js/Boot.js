class Boot extends Phaser.Scene { // Default phaser 3 construct that manages scenes

  constructor() {
    super({
      key: `boot`
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

    this.scene.start(`play`); // Switch to play scene via keyname.
  }

  update() {

  }

}
