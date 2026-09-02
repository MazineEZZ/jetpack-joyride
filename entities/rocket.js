import { Hazard } from "./hazard.js";
import { AnimatedSprite } from "../systems/animation.js";
import { RocketFactory } from "./rocketFactory.js";
import { gameSettings } from "../data/settings.js";
import { RocketWarning } from "./rocketWarning.js";
import { rocketWarningData } from "../data/entityData.js";
import { ParticleManager } from "../systems/particles.js";

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
    particles,
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
    this.smokeSize = 40;
    this.particleXOffset = this.width;
    this.particleYOffset = this.height / 2 - this.smokeSize / 2;
    this.particleManager = new ParticleManager(
      this.position.x + this.particleXOffset,
      this.position.y + this.particleYOffset,
      this.smokeSize,
      this.smokeSize,
      "smoke",
      200,
      100,
      3,
      particles,
      "smoke",
    );
    this.warning.animation.select("incoming");
    this.entities.register(this.warning);
    this.isWarned = false;
    this.isFired = false;
  }
  update(dt) {
    super.update(dt);
    this.warning.position.y = this.position.y;
    if (
      this.position.x <= gameSettings.width + this.speed / 3 &&
      !this.isWarned
    ) {
      this.isWarned = true;
      this.warning.animation.select("final-warning");
      this.events.emit("rocketWarning");
      this.checkWarn = false;
      this.warnState = false;
    }
    if (this.position.x <= gameSettings.width && !this.isFired) {
      this.isFired = true;
      this.events.emit("rocketLaunched");
      this.entities.unregister(this.warning);
    }
    if (this.isFired) {
      this.particleManager.update(
        dt,
        this.position.x + this.particleXOffset,
        this.position.y + this.particleYOffset,
      );
    }
  }
}

export { Rocket };
