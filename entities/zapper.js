import { Hazard } from "./hazard.js";

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
      this.animation.add("zapping", 0, 10);
    }
  }
}

export { Zapper };
