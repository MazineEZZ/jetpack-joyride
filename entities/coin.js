import { ScrollableEntity } from "./scrollableEntity.js";
import { physicsSettings } from "../data/settings.js";

class Coin extends ScrollableEntity {
  constructor(
    y,
    width,
    height,
    zIndex,
    entities,
    collision,
    events,
    speed,
    color = "yellow",
  ) {
    super(y, width, height, zIndex, entities, collision, speed, color);
    this.events = events;
  }
  onHit(other) {
    this.entities.unregister(this);
    this.events.emit("coinCollected", { coin: this });
  }
}

export { Coin };
