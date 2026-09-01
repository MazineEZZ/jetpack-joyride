import { Hazard } from "./hazard.js";
import { AnimatedSprite } from "../systems/animation.js";
import { RocketFactory } from "./rocketFactory.js";
import { gameSettings } from "../data/settings.js";
import { RocketWarning } from "./rocketWarning.js";
import { rocketWarningData } from "../data/entityData.js";

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
    const warningData = rocketWarningData;
    this.warning = new RocketWarning(
      gameSettings.width - warningData.width - 20,
      this.position.y,
      warningData.width,
      warningData.height,
      warningData.zIndex,
      warningData.src,
      warningData.spriteWidth,
      warningData.spriteHeight,
    );
    this.warning.animation.select("incoming");
    this.entities.register(this.warning);
    this.warnState = false;
    this.checkWarn = true;
  }
  update(dt) {
    super.update(dt);
    this.warning.position.y = this.position.y;
    if (this.checkWarn)
      this.warnState = this.position.x <= gameSettings.width + 300;
    if (this.warnState) {
      this.warning.animation.select("final-warning");
      this.events.emit("rocketWarning");
      this.checkWarn = false;
      this.warnState = false;
    }
    if (this.position.x <= gameSettings.width) {
      this.events.emit("rocketLaunched");
      this.entities.unregister(this.warning);
    }
  }
}

export { Rocket };
