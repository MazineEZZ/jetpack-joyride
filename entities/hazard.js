import { physicsSettings } from "../data/settings.js";
import { ScrollableEntity } from "./scrollableEntity.js";

class Hazard extends ScrollableEntity {
  constructor(
    y,
    width,
    height,
    zIndex,
    entities,
    collisions,
    events,
    color = "green",
  ) {
    super(y, width, height, zIndex, entities, collisions, color);
    this.events = events;
  }
  onHit(other) {
    this.events.emit("playerDied", { hazard: this });
  }
}

export { Hazard };
