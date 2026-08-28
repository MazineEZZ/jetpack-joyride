import { gameSettings } from "../data/settings.js";
import { Hazard } from "./hazard.js";

class Zapper extends Hazard {
  constructor(
    y,
    width,
    height,
    zIndex,
    entities,
    collisions,
    events,
    speed,
    color = "red",
  ) {
    super(y, width, height, zIndex, entities, collisions, events, speed, color);
  }
}

export { Zapper };
