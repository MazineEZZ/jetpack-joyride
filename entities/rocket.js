import { Hazard } from "./hazard.js";
import { AnimatedSprite } from "../systems/animation.js";
import { RocketFactory } from "./rocketFactory.js";
import { gameSettings } from "../data/settings.js";
import { RocketWarning } from "./rocketWarning.js";

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
    this.warning = new RocketWarning(
      gameSettings.width - 60,
      this.position.y,
      50,
      50,
      5,
      "red",
    );
    this.entities.register(this.warning);
  }
  update(dt) {
    super.update(dt);
    this.warning.position.y = this.position.y;
    if (this.position.x <= gameSettings.width) {
      this.entities.unregister(this.warning);
    }
  }
}

export { Rocket };
