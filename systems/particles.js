import { Rect } from "../core/rect.js";
import { Vector2 } from "../core/vector.js";
import { colorToHex } from "../utils/utils.js";

class Particle extends Rect {
  constructor(x, y, width, height, zIndex, color) {
    super(x, y, width, height, zIndex, color);
    this.velocity = new Vector2(2, 2);

    console.log(colorToHex(color));
  }
  update(dt) {
    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;
  }
  draw(ctx) {
    super.draw(ctx);
  }
}

class ParticleSystem {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  spawn() {
    const particle = new Particle(30, 30, 20, 20, 4, "red");
  }
}

export { Particle, ParticleSystem };
