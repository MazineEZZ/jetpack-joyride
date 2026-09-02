import { Rect } from "./rect.js";
import { gameSettings, physicsSettings } from "../data/settings.js";

class ScrollableEntity extends Rect {
  constructor(
    y,
    width,
    height,
    zIndex,
    type,
    entities,
    collision,
    speed,
    color = "yellow",
  ) {
    super(0, y, width, height, zIndex, type, color);
    this.speed = speed;
    this.offset = physicsSettings.offset;
    this.position.x = gameSettings.width + this.width + this.offset;
    this.entities = entities;
    this.collision = collision;
  }
  update(dt) {
    this.position.x -= this.speed * dt;

    if (this.position.x + this.width + this.offset <= 0) this.onDestroy();

    this.collision.check(this);
  }
  onDestroy() {
    this.entities.unregister(this);
    this.collision.unregister(this);
  }
  onHit(other) {
    if (other.type === "player") {
      this.collision.unregister(this);
    }
  }
}

export { ScrollableEntity };
