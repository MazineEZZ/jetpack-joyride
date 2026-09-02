import { separate } from "../systems/collisions.js";
import { gameSettings, physicsSettings } from "../data/settings.js";
import { Rect } from "../core/rect.js";
import { Vector2 } from "../core/vector.js";
import { AnimatedSprite } from "../systems/animation.js";
import { ParticleManager } from "../systems/particles.js";
import { playerData } from "../data/entityData.js";

class Player extends Rect {
  constructor(
    x,
    y,
    width,
    height,
    hitboxWidth,
    hitboxHeight,
    zIndex,
    type,
    collision,
    input,
    events,
    particles,
    color = "red",
  ) {
    super(x, y, hitboxWidth, hitboxHeight, zIndex, type, color);
    this.gravity = new Vector2(0, physicsSettings.gravity);
    this.thrust = physicsSettings.thrust;
    this.velocity = new Vector2(0, 0);
    this.collision = collision;
    this.input = input;
    this.events = events;
    this.wasThrusting = false;
    this.particleManager = new ParticleManager(
      this.position.x,
      this.position.y,
      10,
      20,
      "spray",
      200,
      200,
      2,
      particles,
      "fire",
    );
    this.animation = new AnimatedSprite(
      "../assets/sprites/barry.png",
      this.position.x,
      this.position.y,
      width,
      height,
      108 / 4,
      36,
      15,
    );
    this.animation.add("fly", 1, 1);
    this.animation.add("run", 0, 3);
    this.wasOnAit = false;
    this.isDead = false;
  }
  update(delta) {
    if (this.isDead) {
      const fallSpeed = 300;
      if (this.onGround()) return;
      this.position.x += fallSpeed * delta;
      this.position.y += fallSpeed * delta;
    }
    const isThrusting = this.input.isDown("go_up");

    if (isThrusting) {
      this.velocity.y -= this.thrust * delta;
      this.animation.select("fly");
      this.particleManager.update(
        delta,
        this.position.x,
        this.position.y + this.height - 20,
      );
    } else if (this.onGround()) {
      this.animation.select("run");
      this.events.emit("playerRunning");
    }

    if (this.wasOnAir && this.onGround()) {
      this.events.emit("playerLanded");
    }

    // Audio
    if (isThrusting && this.onGround()) {
      this.events.emit("jetpackStarted");
    } else if (isThrusting && !this.onGround() && !this.wasThrusting) {
      this.events.emit("jetpackOn");
    } else if (!isThrusting && this.wasThrusting) {
      this.events.emit("jetpackOff");
    }
    this.wasThrusting = isThrusting;
    this.wasOnAir = !this.onGround();

    this.velocity.y += this.gravity.y * delta;
    this.position.y += this.velocity.y * delta;

    this.keepInBounds({
      width: gameSettings.width,
      height: gameSettings.height - gameSettings.edgeHeight,
    });

    this.animation.update(delta);

    if (!this.isDead) this.collision.check(this);
  }
  onGround() {
    return (
      this.position.y + this.height >=
      gameSettings.height - gameSettings.edgeHeight
    );
  }
  keepInBounds(size) {
    for (const axis of ["x", "y"]) {
      const dim = axis === "x" ? "width" : "height";
      if (this.position[axis] <= gameSettings.edgeHeight) {
        this.position[axis] = gameSettings.edgeHeight;
        if (this.velocity.y <= 0) this.velocity.y = 0;
      }
      if (this.position[axis] + this[dim] >= size[dim]) {
        this.position[axis] = size[dim] - this[dim];
        this.velocity.y = 0;
      }
    }
  }
  onHit(entity) {
    this.collision.unregister(this);
    this.isDead = true;
    this.events.emit("playerDied", { hazard: this });
    console.log(entity.type);
  }
  draw(ctx) {
    //* Hitbox
    // ctx.fillStyle = this.color;
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    //* Sprite
    this.animation.position = this.position;
    this.animation.draw(ctx, this.width, this.height);
  }
}

export { Player };
