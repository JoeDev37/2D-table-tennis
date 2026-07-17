import Phaser, { Physics } from "phaser";

import TitleScreen from "./sceanes/TitleScreen";
import Game from "./sceanes/Game";
import GameBackground from "./sceanes/GameBackground";
import GameOver from "./sceanes/GameOverScreen";

const config = {
  width: 1200,
  height: 800,
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
};

const game = new Phaser.Game(config);

game.scene.add("titleScreen", TitleScreen);
game.scene.add("game", Game);
game.scene.add("game-background", GameBackground);
game.scene.add("game-over", GameOver);

game.scene.start("titleScreen");
// game.scene.start("game");
