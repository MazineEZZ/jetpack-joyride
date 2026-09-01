import { Rect } from "../core/rect.js";
import { AnimatedSprite } from "../systems/animation.js";

class RocketWarning extends Rect {
  constructor(
    x,
    y,
    width,
    height,
    zIndex,
    src,
    spriteWidth,
    spriteHeight,
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
    );
    this.animation.add("incoming", 1, 1);
    this.animation.add("final-warning", 0, 1);
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

export { RocketWarning };
