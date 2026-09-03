import { Rect } from "../core/rect.js";
import { AnimatedSprite } from "../systems/animation.js";

class Explosion extends Rect {
  constructor(
    x,
    y,
    width,
    height,
    zIndex,
    src,
    spriteWidth,
    spriteHeight,
    entities,
    color = "red",
  ) {
    super(x, y, width, height, zIndex, color);
    this.animation = new AnimatedSprite(
      src,
      this.position.x,
      this.position.y,
      this.width,
      this.height,
      spriteHeight,
      spriteWidth,
      20,
    );
    this.entities = entities;
    this.animation.add("explosion", 0, 10);
  }
  update(dt) {
    super.update(dt);
    this.animation.update(dt);
    if (this.animation.isDone) this.entities.unregister(this);
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

export { Explosion };
