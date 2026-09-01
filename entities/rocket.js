import { Hazard } from "./hazard.js";
import { AnimatedSprite } from "../systems/animation.js";

class Zapper extends Hazard {
  constructor(
    y,
    width,
    height,
    hitboxWidth,
    hitboxHeight,
    zIndex,
    speed,
    entities,
    collisions,
    events,
    isRotated,
    src = "",
    color = "red",
  ) {
    super(
      y,
      width,
      height,
      hitboxWidth,
      hitboxHeight,
      zIndex,
      speed,
      entities,
      collisions,
      events,
      isRotated,
      src,
      color,
    );
    if (this.hasAnimation) {
      this.animation.add("rocketing", 0, 10);
    }
  }
}

export { Zapper };
