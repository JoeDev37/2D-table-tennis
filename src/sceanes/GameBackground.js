import Phaser from "phaser";

export default class GameBackground extends Phaser.Scene {
  preload() {}

  create() {
    const colors = "0xcdd6f4";

    this.add.line(600, 400, 0, 0, 0, 800, colors, 1).setLineWidth(3, 3);
    this.add.circle(600, 400).setStrokeStyle(3, colors, 1);
  }
}
