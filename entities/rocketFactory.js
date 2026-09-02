import { rocketData } from "../data/entityData.js";
import { gameSettings } from "../data/settings.js";
import { EntityFactory } from "./entityFactory.js";
import { Rocket } from "./rocket.js";
import { RocketWarning } from "./rocketWarning.js";

class RocketFactory extends EntityFactory {
  constructor(entities, collisions, events, particles) {
    super(entities, collisions, events);
    this.particles = particles;
    this.rockets = [];
    this.rocketData = rocketData;
    this.lastDistance = 0;
    this.distanceBetween = this.generateDistanceBetween();
  }
  spawnRocket(y) {
    return new Rocket(
      y,
      this.rocketData.width,
      this.rocketData.height,
      this.rocketData.hitboxWidth,
      this.rocketData.hitboxHeight,
      this.rocketData.zIndex,
      this.rocketData.type,
      this.rocketData.speed,
      this.entities,
      this.collisions,
      this.events,
      this.particles,
      false,
      this.rocketData.src,
      this.rocketData.spriteWidth,
      this.rocketData.spriteHeight,
    );
  }
  generateDistanceBetween() {
    return 5000 + Math.random() * (10000 - 5000);
  }
  spawn(playerY) {
    const rocket = this.spawnRocket(playerY);
    rocket.position.x += 3000;
    this.rockets.push(rocket);
    this.entities.register(rocket);
    this.entities.sortByLayers();
    this.collisions.register(rocket);

    this.distanceBetween = this.generateDistanceBetween();
  }
  update(dt, distance, scrollSpeed, playerY) {
    this.rockets.forEach((rocket) => {
      if (rocket.position.x > gameSettings.width) {
        rocket.position.y = playerY;
        rocket.speed = this.rocketData.speed * 1.5;
      }
    });
    if (distance - this.lastDistance > this.distanceBetween) {
      this.spawn(playerY);
      this.lastDistance += this.distanceBetween;
    }
  }
}

export { RocketFactory };
