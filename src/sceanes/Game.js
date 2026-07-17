import Phaser from "phaser";
import WebFontFile from "./WebFontFile";
import GameOver from "./GameOverScreen";

const GameState = {
  Running: "running",
  PlayerWon: "player-won",
  AIWon: "ai-won",
};

export default class Game extends Phaser.Scene {
  init() {
    this.gamestate = GameState.Running;
    this.rightPaddleVelocity = new Phaser.Math.Vector2(0, 0);

    //score system 1
    this.leftScore = 0;
    this.rightScore = 0;

    this.paused = false;
  }

  preload() {
    const fonts = new WebFontFile(this.load, "Press Start 2P");
    this.load.addFile(fonts);
  }

  create() {
    this.scene.run("game-background");

    this.physics.world.setBounds(-100, 0, 1400, 800);

    this.ball = this.add.circle(600, 400, 20, 0xffffff, 1);
    this.physics.add.existing(this.ball);
    this.ball.body.setCircle(20);
    this.ball.body.setBounce(1, 1);

    this.ball.body.setCollideWorldBounds(true, 1, 1);

    this.leftPaddle = this.add.rectangle(30, 400, 50, 130, 0xffffff, 1);
    this.physics.add.existing(this.leftPaddle);
    this.leftPaddle.body.immovable = true;
    this.physics.add.collider(this.ball, this.leftPaddle);
    this.leftPaddle.body.setCollideWorldBounds(true);

    this.rightPaddle = this.add.rectangle(1170, 400, 50, 130, 0xffffff, 1);
    this.physics.add.existing(this.rightPaddle, true);
    this.physics.add.collider(this.ball, this.rightPaddle);

    // scoring system 2
    this.leftScoreLabel = this.add.text(500, 100, "0");
    this.leftScoreLabel.setFontSize(50);
    this.leftScoreLabel.setFontFamily('"Press Start 2P"');
    this.leftScoreLabel.setOrigin(0.5, 0.5);

    this.rightScoreLabel = this.add.text(700, 100, "0");
    this.rightScoreLabel.setFontSize(50);
    this.rightScoreLabel.setFontFamily('"Press Start 2P"');
    this.rightScoreLabel.setOrigin(0.5, 0.5);

    // keyboard input
    this.cursors = this.input.keyboard.createCursorKeys();

    this.time.delayedCall(700, () => {
      this.resetBall();
    });
  }

  update() {
    if (this.paused || this.gamestate !== GameState.Running) {
      return;
    }

    const body = this.leftPaddle.body;

    if (this.cursors.up.isDown) {
      this.leftPaddle.y -= 10;
      body.updateFromGameObject();
    } else if (this.cursors.down.isDown) {
      this.leftPaddle.y += 10;
      body.updateFromGameObject();
    }

    const diff = this.ball.y - this.rightPaddle.y;

    if (Math.abs(diff) < 10) {
      return;
    }

    const aiSpeed = 0.5;
    const maxSpeed = 5;

    if (diff < 0) {
      this.rightPaddleVelocity.y -= aiSpeed;
      if (this.rightPaddleVelocity.y < -maxSpeed) {
        this.rightPaddleVelocity.y = -maxSpeed;
      }
    } else if (diff > 0) {
      this.rightPaddleVelocity.y += aiSpeed;
      if (this.rightPaddleVelocity.y > maxSpeed) {
        this.rightPaddleVelocity.y = maxSpeed;
      }
    }

    this.rightPaddle.y += this.rightPaddleVelocity.y;
    this.rightPaddle.body.updateFromGameObject();

    const x = this.ball.x;
    const leftBounds = -30;
    const rightBounds = 1230;
    if (x >= leftBounds && x <= rightBounds) {
      return;
    }

    if (this.ball.x < leftBounds) {
      // score on left side
      // this.resetBall();
      this.incrementRightScore();
    } else if (this.ball.x > rightBounds) {
      // score on right side
      // this.resetBall();
      this.incrementLeftScore();
    }

    const maxScore = 1;

    if (this.leftScore === maxScore) {
      // player won
      console.log("Player won!");
      this.gamestate = GameState.PlayerWon;
    } else if (this.rightScore === maxScore) {
      // AI won
      console.log("AI won!");
      this.gamestate = GameState.AIWon;
    }

    if (this.gamestate === GameState.Running) {
      this.resetBall();
    } else {
      this.ball.active = false;
      this.physics.world.remove(this.ball.body);

      // show game over/win screen
      this.scene.start("game-over", {
        leftScore: this.leftScore,
        rightScore: this.rightScore,
      });
    }
  }

  incrementLeftScore() {
    this.leftScore += 1;
    this.leftScoreLabel.setText(this.leftScore);
  }

  incrementRightScore() {
    this.rightScore += 1;
    this.rightScoreLabel.setText(this.rightScore);
  }

  resetBall() {
    this.ball.setPosition(600, 400);

    const angle = Phaser.Math.Between(0, 360);
    const vec = this.physics.velocityFromAngle(angle, 400);

    this.ball.body.setVelocity(vec.x, vec.y);
  }
}
