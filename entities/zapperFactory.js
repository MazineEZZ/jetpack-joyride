import { gameSettings } from "../data/settings.js";
import { Zapper } from "./zapper.js";
import { EntityFactory } from "./entityFactory.js";

class ZapperFactory extends EntityFactory {
  constructor(entities, collisions, events) {
    super(entities, collisions, events);
    this.scrollSpeed = gameSettings.scrollSpeed;
    this.lastDistance = 0;
    this.distanceBetween = Math.max(1000, Math.min(Math.random() * 2000));
  }
  generateY() {
    return Math.random() * (gameSettings.height - 200) + 100;
  }
  spawn() {
    const offsetY = this.generateY();
    const zapper = new Zapper(
      offsetY,
      40,
      200,
      5,
      this.entities,
      this.collisions,
      this.events,
      this.scrollSpeed,
    );

    this.entities.register(zapper);
  }
  update(dt, distance) {
    if (distance - this.lastDistance > this.distanceBetween) {
      this.spawn();
      this.lastDistance += this.distanceBetween;
    }
  }
}

export { ZapperFactory };
