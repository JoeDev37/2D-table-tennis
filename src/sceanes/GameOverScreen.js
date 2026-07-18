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
    let titleColor = "#f38ba8";
    const restart = "Press SPACE to restart";

    if (data.leftScore > data.rightScore) {
      titleTText = "You Win!";
      titleColor = "#a6e3a1";
    }
    this.add
      .text(600, 400, titleTText, {
        fontFamily: "'Press Start 2P'",
        fontSize: 40,
        fill: titleColor,
      })
      .setOrigin(0.5, 0.5);

    this.add.text(800, 600, restart, {
      fontFamily: "'Press Start 2P'",
      fontSize: 10,
      fill: "#cdd6f4",
    });

    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start("game");
    });
  }
}
