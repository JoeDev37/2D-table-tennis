import Phaser from "phaser";
import WebFontFile from "./WebFontFile";

export default class GameOver extends Phaser.Scene {
  constructor() {
    super("game-over");
  }

  preload() {
    const fonts = new WebFontFile(this.load, "Press Start 2P");
    this.load.addFile(fonts);
  }

  create(data) {
    let titleTText = "Game Over";
    if (data.leftScore > data.rightScore) {
      titleTText = "You Win!";
    }
    this.add
      .text(600, 400, titleTText, {
        fontFamily: "'Press Start 2P'",
        fontSize: 40,
        fill: "#ffffff",
      })
      .setOrigin(0.5, 0.5);
  }
}
