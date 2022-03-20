"user strict";

let config = {
  type: Phaser.AUTO, // How the game will display. Auto chooses the best between canvas and WebGl rnder system.
  width: 800,
  height: 600,
  physics: {
    default: `arcade` // Default physics engine is arcade.
  },
  scene: [Boot, Play] // Array that contains the different scences that can be avaliable.
};
let game = new Phaser.Game(config);
