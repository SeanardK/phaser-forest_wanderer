import { useEffect, useRef } from "react";
import "./App.css";
import Phaser, { GameObjects } from "phaser";

const isDebug = false;
const screenWidth = 800;
const screenHeight = 300;
const centerVerticalPosition = screenHeight / 2;
const centerHorizontalPosition = screenWidth / 2;
const speed = 100;

class MainScene extends Phaser.Scene {
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  private player!: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super({ key: "MainScene" });
  }

  preload() {
    // Background
    this.load.spritesheet(
      "background",
      "./assets/platformer/GandalfHardcore Background layers.gif",
      {
        frameWidth: 1024,
        frameHeight: 346,
      },
    );

    // Grounds
    this.load.spritesheet("dirt", "/assets/platformer/Floor Tiles1.png", {
      frameWidth: 32,
      frameHeight: 30,
    });

    // Players
    this.load.spritesheet(
      "player",
      "/assets/charactes/Character skin colors/Male Skin2.png",
      {
        frameWidth: 80,
        frameHeight: 64,
      },
    );
  }

  create() {
    this.cursors = this.input.keyboard?.createCursorKeys();

    this.add.tileSprite(
      centerHorizontalPosition,
      centerVerticalPosition,
      1024,
      346,
      "background",
    );

    // Object Declarations
    const platform = this.physics.add.staticGroup();

    // Platform
    const totalTilesNeeded = Math.ceil(screenWidth / 32);
    for (let i = 0; i < totalTilesNeeded; i++) {
      const tileX = i * 32 + 32 / 2;

      platform.create(tileX, screenHeight - 32 / 2, "dirt", 1);
    }

    // Player
    this.player = this.physics.add.sprite(400, screenHeight - 32 * 2, "player");
    this.player.body?.setSize(16, 45);
    this.player.body?.setOffset(32, 20);

    // Collisions
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, platform);

    // Animations
    this.anims.create({
      key: "player-standby",
      frames: this.anims.generateFrameNames("player", { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "player-walk",
      frames: this.anims.generateFrameNumbers("player", { start: 11, end: 17 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  update() {
    if (!this.cursors) return;

    if (this.cursors.left.isDown) {
      this.player.setFlipX(false);
      this.player.setVelocityX(-speed);
      this.player.anims.play("player-walk", true);
    } else if (this.cursors.right.isDown) {
      this.player.setFlipX(true);
      this.player.setVelocity(speed);
      this.player.anims.play("player-walk", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("player-standby");
    }
  }
}

function App() {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: screenWidth,
      height: screenHeight,
      parent: "game-container",
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 200, x: 0 },
          debug: isDebug,
        },
      },
      scene: MainScene,
    };

    gameRef.current = new Phaser.Game(config);

    return () => {
      gameRef.current?.destroy(true);
    };
  }, []);

  return (
    <>
      <section id="center">
        <div id="game-container"></div>
      </section>
    </>
  );
}

export default App;

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    window.location.reload();
  });
}
