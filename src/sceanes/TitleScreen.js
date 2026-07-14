import Phaser from "phaser";
import WebFontFile from "./WebFontFile";

export default class TitleScreen extends Phaser.Scene {
  preload() {
    const titleScreenFonts = new WebFontFile(this.load, "Press Start 2P");
    this.load.addFile(titleScreenFonts);
  }

  create() {
    const title = this.add.text(600, 300, "2D Table Tennis", {
      fontSize: 30,
      fontFamily: "'Press Start 2P'",
    });
    title.setOrigin(0.5, 0.5);

    const text = this.add.text(600, 400, "Press Space to Start!", {
      fontFamily: "'Press Start 2P'",
    });
    text.setOrigin(0.5);

    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start("game");
    });
  }
}
