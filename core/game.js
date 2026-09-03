import { gameSettings, inputBindings } from "../data/settings.js";
import { EntityRegistry } from "../systems/entities.js";
import { CollisionSystem } from "../systems/collisions.js";
import { FactoryRegistry } from "../systems/factories.js";
import { Inputs } from "../systems/inputs.js";
import { EventBus } from "../systems/events.js";
import { AudioSystem } from "../systems/audio.js";
import { UILayer, Label, Panel, ImageUI, Button } from "../ui/ui.js";
import { Player } from "../entities/player.js";
import { playerData } from "../data/entityData.js";
import { SegmentFactory } from "../entities/segmentFactory.js";
import { Background, ScrollingBackground } from "./background.js";
import { convertPxToMeters, pad } from "../utils/utils.js";
import { ParticleSystem } from "../systems/particles.js";
import { RocketFactory } from "../entities/rocketFactory.js";

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
    this.collisions = new CollisionSystem();
    this.entities = new EntityRegistry();
    this.audio = new AudioSystem();
    this.input = new Inputs(inputBindings);
    this.events = new EventBus();
    this.factories = new FactoryRegistry();
    this.particles = new ParticleSystem();
    this.ui = new UILayer();
    this.lastTime = null;
    this.animationFrameId = null;
    this.isPaused = false;
    this.clientMouse = {
      position: { x: -10, y: -10 },
      lastClickPos: { x: -10, y: -10 },
    };

    // Game States ["menu", "playing", "paused", "gameOver"]

    // Initial Setup
    this.canvas.width = gameSettings.width;
    this.canvas.height = gameSettings.height;

    this.background = new ScrollingBackground(
      "../assets/images/background.png",
      0,
      0,
      this.canvas.width,
      this.canvas.height,
    );
    this.input.setUpInputs();
    this.resizeCanvas();

    this.setUpEventListeners();
  }
  getScaledMousePos(e) {
    return {
      x: e.offsetX * (this.canvas.width / this.canvas.clientWidth),
      y: e.offsetY * (this.canvas.height / this.canvas.clientHeight),
    };
  }
  setUpEventListeners() {
    this.canvas.addEventListener("mousedown", (e) => {
      this.clientMouse.lastClickPos = this.getScaledMousePos(e);
    });
    this.canvas.addEventListener("mousemove", (e) => {
      this.clientMouse.position = this.getScaledMousePos(e);
    });
    window.addEventListener("keydown", (e) => {
      if (!this.input.isDown("pause_game")) return;
      if (this.currState === "playing") {
        this.events.emit("gamePaused");
      } else if (this.currState === "paused") {
        this.events.emit("gameUnpaused");
      }
    });
    window.addEventListener("resize", () => {
      this.resizeCanvas();
      this.draw();
    });
    document.addEventListener("visibilitychange", () => {
      if (
        document.visibilityState === "hidden" &&
        this.currState === "playing"
      ) {
        this.events.emit("gamePaused");
      }
    });
  }
  resizeCanvas() {
    const ratio = gameSettings.ratio;
    let w, h;
    const margin = gameSettings.margin;

    const availableWidth = window.innerWidth - margin * 2;
    const availableHeight = window.innerHeight - margin * 2;

    if (availableWidth / availableHeight > ratio) {
      h = availableHeight;
      w = h * ratio;
    } else {
      w = availableWidth;
      h = w / ratio;
    }

    this.canvas.style.width = w + "px";
    this.canvas.style.height = h + "px";
    this.canvas.style.margin = margin + "px";
  }
  debugGrid() {
    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = 6;

    for (let i = 0; i < gameSettings.width; i += gameSettings.grid) {
      this.ctx.beginPath();
      this.ctx.moveTo(i, 0);
      this.ctx.lineTo(i, gameSettings.height);
      this.ctx.stroke();
    }
    for (let i = 0; i < gameSettings.height; i += gameSettings.grid) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, i);
      this.ctx.lineTo(gameSettings.width, i);
      this.ctx.stroke();
    }
  }
  loadEntities() {
    this.player = new Player(
      playerData.x,
      playerData.y,
      playerData.width,
      playerData.height,
      playerData.hitboxWidth,
      playerData.hitboxHeight,
      playerData.zIndex,
      playerData.type,
      playerData.spriteWidth,
      playerData.spriteHeight,
      this.collisions,
      this.input,
      this.events,
      this.particles,
      playerData.color,
    );
    this.collisions.register(this.player);
    this.entities.register(this.player);
    this.entities.sortByLayers();

    // Factories
    const segmentFactory = new SegmentFactory(
      this.entities,
      this.collisions,
      this.events,
    );

    const rocketFactory = new RocketFactory(
      this.entities,
      this.collisions,
      this.events,
      this.particles,
    );

    this.factories.register(segmentFactory);
    this.factories.register(rocketFactory);
  }
  loadUI() {
    const fontName = "jjFont";
    const fontSrc = "../assets/fonts/jjFont.ttf";
    const fontSize = "30px";
    this.scoreLabel = new Label(20, 105, {
      text: "Coins: 000",
      color: "#f5bd4d",
      borderColor: "black",
      borderSize: 4,
      fontName: fontName,
      fontSrc: fontSrc,
    });
    this.distanceCtrLabel = new Label(20, 65, {
      text: "0000 M",
      borderColor: "black",
      borderSize: 4,
      fontName: fontName,
      fontSrc: fontSrc,
    });
    this.messageLabel = new Label(
      gameSettings.width / 2,
      gameSettings.height / 2,
      {
        align: "center",
        baseline: "middle",
        fontSize: "50px",
        fontName: fontName,
        fontSrc: fontSrc,
      },
    );
    this.ui.add(this.scoreLabel);
    this.ui.add(this.distanceCtrLabel);
  }
  loadMenu() {
    const fontName = "jjFont";
    const fontSrc = "../assets/fonts/jjFont.ttf";
    const fontSize = "30px";

    const menuWidth = 550;
    const menuHeight = 294;
    const menuTitle = new ImageUI(
      "../assets/images/title.png",
      this.canvas.width / 2 - menuWidth / 2,
      100,
      menuWidth,
      menuHeight,
      3,
    );

    const btnHeight = 50;
    const startGameBtnWidth = 200;
    const startGameBtnX = this.canvas.width / 2 - startGameBtnWidth / 2;
    const startGameBtnY = 450;

    const startGameBtn = new Button(
      startGameBtnX,
      startGameBtnY,
      startGameBtnWidth,
      btnHeight,
      3,
      this.events,
      "#5e627e",
      "#4a5571",
    );

    const startGameLabel = new Label(
      startGameBtnX + startGameBtnWidth / 2,
      startGameBtnY + btnHeight / 2,
      {
        text: "Start Game",
        align: "center",
        baseline: "middle",
        fontSize: "24px",
        zIndex: 4,
        fontName: fontName,
        fontSrc: fontSrc,
      },
    );

    this.ui.add(menuTitle);
    this.ui.add(startGameBtn);
    this.ui.add(startGameLabel);
    this.ui.sortByLayers();
  }
  init() {
    // Game properties
    this.score = 0;
    this.distance = 0;
    this.scrollSpeed = gameSettings.scrollSpeed;
    this.difficulty = 5;
    this.speedDecrement = 0;
    this.currState = "menu";
    this.loadMenu();

    // Music
    this.audio.playMusic();

    // Events
    this.events.on("coinCollected", (coin) => {
      this.score++;
      this.audio.playCollect();
      this.scoreLabel.setText(`Coins: ${pad(this.score, 3)}`);
    });
    this.events.on("gameStarted", () => {
      this.currState = "playing";
      this.loadEntities();
      this.ui.elements.length = 0;
      this.loadUI();
    });
    this.events.on("playerDied", () => {
      this.messageLabel.setText("You lost!");
      this.ui.add(this.messageLabel);
      this.currState = "gameOver";
      setTimeout(() => this.restart(), 2000);
    });
    this.events.on("playerElectrocuted", () => {
      this.audio.playPlayerElectrocuted();
    });
    this.events.on("playerExploded", () => {
      this.audio.playPlayerExploded();
    });
    this.events.on("rocketWarning", () => {
      this.audio.playRocketWarning();
    });
    this.events.on("rocketLaunched", () => {
      this.audio.playRocketLaunch();
    });
    this.events.on("playerRunning", () => {
      this.audio.playRunning();
    });
    this.events.on("playerLanded", () => {
      this.audio.playLand();
    });
    this.events.on("jetpackOn", () => {
      this.audio.playJetpackOn();
    });
    this.events.on("jetpackOff", () => {
      this.audio.playJetpackOff();
    });
    this.events.on("jetpackStarted", () => {
      this.audio.playJetpackStarted();
    });
    this.events.on("gamePaused", () => {
      this.messageLabel.setText("Game paused");
      this.ui.add(this.messageLabel);
      this.audio.pauseMusic();
      this.draw();
      this.stop();
      this.currState = "paused";
    });
    this.events.on("gameUnpaused", () => {
      this.gameLoop();
      this.audio.playMusic();
      this.ui.remove(this.messageLabel);
      this.currState = "playing";
    });
  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Background
    this.background.draw(this.ctx);
    // Entities
    this.entities.draw(this.ctx);
    // Particles
    this.particles.draw(this.ctx);
    // UI
    this.ui.draw(this.ctx);
    // this.debugGrid();
  }
  decreaseSpeed(dt) {
    if (this.speedDecrement === 0) this.speedDecrement = this.scrollSpeed / 2;
    if (this.scrollSpeed >= 0) this.scrollSpeed -= this.speedDecrement * dt;
  }
  update(dt) {
    if (this.currState === "menu") {
      this.ui.update(this.clientMouse);
      return;
    }
    // Game Update
    if (this.currState === "gameOver") this.decreaseSpeed(dt);
    this.scrollSpeed += this.difficulty * dt;
    // Background
    this.background.update(dt, this.scrollSpeed);
    // Distance
    this.distance += this.scrollSpeed * dt;
    this.metersCrossed = convertPxToMeters(this.distance);
    this.distanceCtrLabel.setText(`${pad(this.metersCrossed, 4)} M`);
    // Factories
    this.factories.update(
      dt,
      this.distance,
      this.scrollSpeed,
      this.player.position.y,
    );
    // Particles
    this.particles.update(dt);
    // Entities
    this.entities.update(dt);
  }
  gameLoop() {
    const loop = (timestamp) => {
      if (this.lastTime === null) this.lastTime = timestamp;
      const dt = (timestamp - this.lastTime) / 1000;
      this.lastTime = timestamp;

      this.update(dt);
      this.draw();
      this.animationFrameId = requestAnimationFrame(loop);
    };
    this.animationFrameId = requestAnimationFrame(loop);
  }
  start() {
    this.init();
    this.gameLoop();
  }
  stop() {
    cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = null;
    this.lastTime = null;
  }
  restart() {
    this.stop();
    this.audio.pauseMusic();
    this.scrollSpeed = gameSettings.scrollSpeed;
    this.audio.pauseSounds();
    this.audio = new AudioSystem();
    this.entities = new EntityRegistry();
    this.collisions = new CollisionSystem();
    this.events = new EventBus();
    this.ui = new UILayer();
    this.particles = new ParticleSystem();
    this.factories = new FactoryRegistry();
    this.start();
  }
}

export { Game };
