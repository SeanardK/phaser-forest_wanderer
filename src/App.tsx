import { useEffect, useRef } from "react";
import "./App.css";
import Phaser from "phaser";

const isDebug = false;
const screenWidth = 800;
const screenHeight = 300;
const centerVerticalPosition = screenHeight / 2;
const centerHorizontalPosition = screenWidth / 2;
const speed = 100;

class MainScene extends Phaser.Scene {
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  private player!: Phaser.Physics.Arcade.Sprite;
  private playerPants!: Phaser.GameObjects.Sprite;
  private playerShirt!: Phaser.GameObjects.Sprite;
  private playerHair!: Phaser.GameObjects.Sprite;

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
    this.load.spritesheet(
      "player-pants",
      "/assets/charactes/Male Clothing/Blue Pants.png",
      {
        frameWidth: 80,
        frameHeight: 64,
      },
    );
    this.load.spritesheet(
      "player-shirt",
      "/assets/charactes/Male Clothing/Blue Shirt v2.png",
      {
        frameWidth: 80,
        frameHeight: 64,
      },
    );
    this.load.spritesheet(
      "player-hair",
      "/assets/charactes/Male Hair/Male Hair2.png",
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
    this.playerPants = this.add.sprite(
      400,
      screenHeight - 32 * 2,
      "player-pants",
    );
    this.playerShirt = this.add.sprite(
      400,
      screenHeight - 32 * 2,
      "player-shirt",
    );
    this.playerHair = this.add.sprite(
      400,
      screenHeight - 32 * 2,
      "player-hair",
    );

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
      frames: this.anims.generateFrameNumbers("player", { start: 10, end: 17 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "player-pants-standby",
      frames: this.anims.generateFrameNumbers("player-pants", {
        start: 0,
        end: 4,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "player-pants-walk",
      frames: this.anims.generateFrameNumbers("player-pants", {
        start: 10,
        end: 17,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "player-shirt-standby",
      frames: this.anims.generateFrameNumbers("player-shirt", {
        start: 0,
        end: 4,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "player-shirt-walk",
      frames: this.anims.generateFrameNumbers("player-shirt", {
        start: 10,
        end: 17,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "player-hair-standby",
      frames: this.anims.generateFrameNumbers("player-hair", {
        start: 0,
        end: 4,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "player-hair-walk",
      frames: this.anims.generateFrameNumbers("player-hair", {
        start: 10,
        end: 17,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  update() {
    if (!this.cursors) return;

    if (this.cursors.left.isDown) {
      this.player.setFlipX(false);
      this.playerPants.setFlipX(false);
      this.playerShirt.setFlipX(false);
      this.playerHair.setFlipX(false);

      this.player.setVelocityX(-speed);
      this.playerPants.setPosition(this.player.x - 2, this.player.y);
      this.playerShirt.setPosition(this.player.x, this.player.y);
      this.playerHair.setPosition(this.player.x, this.player.y);

      this.player.anims.play("player-walk", true);
      this.playerPants.anims.play("player-pants-walk", true);
      this.playerShirt.anims.play("player-shirt-walk", true);
      this.playerHair.anims.play("player-hair-walk", true);
    } else if (this.cursors.right.isDown) {
      this.player.setFlipX(true);
      this.playerPants.setFlipX(true);
      this.playerShirt.setFlipX(true);
      this.playerHair.setFlipX(true);

      this.player.setVelocityX(speed);
      this.playerPants.setPosition(this.player.x + 2, this.player.y);
      this.playerShirt.setPosition(this.player.x, this.player.y);
      this.playerHair.setPosition(this.player.x, this.player.y);

      this.player.anims.play("player-walk", true);
      this.playerPants.anims.play("player-pants-walk", true);
      this.playerShirt.anims.play("player-shirt-walk", true);
      this.playerHair.anims.play("player-hair-walk", true);
    } else {
      this.player.setVelocityX(0);

      this.playerPants.setPosition(this.player.x, this.player.y);
      this.playerShirt.setPosition(this.player.x, this.player.y);
      this.playerHair.setPosition(this.player.x, this.player.y);

      this.player.anims.play("player-standby");
      this.playerPants.anims.play("player-pants-standby");
      this.playerShirt.anims.play("player-shirt-standby", true);
      this.playerHair.anims.play("player-hair-standby");
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
