import { gameSettings } from "../data/settings.js";
import { AnimatedSprite } from "../systems/animation.js";
import { Hazard } from "./hazard.js";

class Zapper extends Hazard {
  constructor(
    y,
    width,
    height,
    zIndex,
    entities,
    collisions,
    events,
    speed,
    isRotated,
    color = "red",
  ) {
    super(y, width, height, zIndex, entities, collisions, events, speed, color);
    this.animation = new AnimatedSprite(
      "../assets/images/zapper-spritesheet.png",
      this.position.x,
      this.position.y,
      this.width,
      this.height,
      660 / 10,
      162,
      10,
    );
    this.animation.add("zapping", 0, 10);
    this.animation.isRotated = isRotated;
  }
  update(dt) {
    super.update(dt);

    this.animation.update(dt);
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

export { Zapper };
