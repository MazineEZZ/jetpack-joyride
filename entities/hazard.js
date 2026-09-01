import { physicsSettings } from "../data/settings.js";
import { ScrollableEntity } from "../core/scrollableEntity.js";
import { AnimatedSprite } from "../systems/animation.js";

class Hazard extends ScrollableEntity {
  constructor(
    y,
    width,
    height,
    hitboxWidth,
    hitboxHeight,
    zIndex,
    speed,
    entities,
    collisions,
    events,
    isRotated,
    src,
    spriteWidth,
    spriteHeight,
    color = "red",
  ) {
    super(
      y,
      hitboxWidth,
      hitboxHeight,
      zIndex,
      entities,
      collisions,
      speed,
      color,
    );
    this.events = events;
    this.hitboxWidth = hitboxWidth;
    this.hitboxHeight = hitboxHeight;
    this.hasAnimation = src !== "";
    if (this.hasAnimation) {
      this.animation = new AnimatedSprite(
        src,
        this.position.x,
        this.position.y,
        width,
        height,
        spriteWidth,
        spriteHeight,
      );
      this.animation.isRotated = isRotated;
    }
  }
  onHit(other) {
    this.events.emit("playerDied", { hazard: this });
  }
  update(dt) {
    super.update(dt);
    if (this.hasAnimation) this.animation.update(dt);
  }
  draw(ctx) {
    //* Hitbox
    if (!this.hasAnimation) {
      ctx.fillStyle = this.color;
      ctx.fillRect(
        this.position.x,
        this.position.y,
        this.hitboxWidth,
        this.hitboxHeight,
      );
    }
    //* Sprite
    if (this.hasAnimation) {
      this.animation.position = this.position;
      this.animation.draw(ctx, this.hitboxWidth, this.hitboxHeight);
    }
  }
}

export { Hazard };
