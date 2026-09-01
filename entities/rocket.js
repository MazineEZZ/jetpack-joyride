import { Hazard } from "./hazard.js";
import { AnimatedSprite } from "../systems/animation.js";

class Rocket extends Hazard {
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
    spriteWidth,
    spriteHeight,
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
      spriteWidth,
      spriteHeight,
      color,
    );
    if (this.hasAnimation) {
      this.animation.add("rocketing", 0, 5);
    }
  }
}

export { Rocket };
