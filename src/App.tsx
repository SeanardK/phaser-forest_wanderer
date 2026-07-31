import { useEffect, useRef } from "react";
import "./App.css";
import Phaser from "phaser";

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }

  preload() {}

  create() {}

  update() {}
}

function App() {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: "game-container",
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 200, x: 0 },
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
