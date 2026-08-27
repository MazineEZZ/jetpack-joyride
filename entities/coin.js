import { Rect } from "../core/rect.js";

class Coin extends Rect {
  constructor(
    x,
    y,
    width,
    height,
    zIndex,
    collision,
    entities,
    events,
    color = "yellow",
  ) {
    super(x, y, width, height, zIndex, color);
    this.collision = collision;
    this.entities = entities;
    this.events = events;
  }
  update() {
    this.collision.check(this);
  }
  onHit(other) {
    this.entities.unregister(this);
    this.events.emit("coinCollected", { coin: this });
  }
}

export { Coin };
