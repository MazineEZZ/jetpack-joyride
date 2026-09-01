import { rocketData } from "../data/entityData.js";
import { EntityFactory } from "./entityFactory.js";
import { Hazard } from "./hazard.js";

class RocketFactory extends EntityFactory {
  constructor(entities, collisions, events) {
    super(entities, collisions, events);
    this.rocketData = rocketData;
    this.lastDistance = 0;
    this.distanceBetween = 1200;
  }
  spawnRocket(y) {
    return new Hazard(
      y,
      this.rocketData.width,
      this.rocketData.height,
      this.rocketData.hitboxWidth,
      this.rocketData.hitboxHeight,
      this.rocketData.zIndex,
      this.rocketData.speed,
      this.entities,
      this.collisions,
      this.events,
      false,
      this.rocketData.src,
    );
  }
  spawn() {
    const rocket = this.spawnRocket(30);
    this.entities.register(rocket);
  }
  update(dt, distance, scrollSpeed) {
    if (
      distance - this.lastDistance > this.distanceBetween &&
      !this.isSpawning
    ) {
      this.spawn();
      this.lastDistance += this.distanceBetween;
    }
  }
}

export { RocketFactory };
