import { gameSettings } from "../data/settings.js";
import { Sprite } from "../systems/animation.js";

class Background extends Sprite {
  constructor(src, x, y, width, height) {
    super(src, x, y, width, height);
  }
}

class ScrollingBackground extends Background {
  constructor(src, x, y, width, height) {
    super(src, x, y, width, height);
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height,
    );
    ctx.drawImage(
      this.image,
      this.position.x + this.width,
      this.position.y,
      this.width,
      this.height,
    );
  }
  update(dt, scrollSpeed) {
    this.position.x -= scrollSpeed * dt;

    if (this.position.x <= -this.width) this.position.x += this.width;
  }
}

export { Background, ScrollingBackground };
