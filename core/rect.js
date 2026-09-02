import { Vector2 } from "../core/vector.js";

class Rect {
  constructor(x, y, width, height, zIndex, type, color = "white") {
    this.position = new Vector2(x, y);
    this.width = width;
    this.height = height;
    this.zIndex = zIndex;
    this.type = type;
    this.color = color;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update(dt) {}
  onHit() {}
}

export { Rect };
