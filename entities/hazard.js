import { Rect } from "../core/rect.js";

class Hazard extends Rect {
  constructor(
    x,
    y,
    width,
    height,
    zIndex,
    collisions,
    events,
    color = "green",
  ) {
    super(x, y, width, height, zIndex, color);
    this.collisions = collisions;
    this.events = events;
  }
  update() {
    this.collisions.check(this);
  }
  onHit(other) {
    this.events.emit("playerDied", { hazard: this });
  }
}

export { Hazard };
