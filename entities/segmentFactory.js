import { EntityFactory } from "./entityFactory.js";
import { gameSettings } from "../data/settings.js";
import { coinData, patterns } from "../data/entityData.js";
import { Coin } from "./coin.js";
import { Zapper } from "./zapper.js";

class SegmentFactory extends EntityFactory {
  constructor(entities, collisions, events) {
    // Note to self, coins must always be above the number of zappers
    super(entities, collisions, events);
    this.lastDistance = 0;
    this.scrollSpeed = gameSettings.scrollSpeed;
    this.size = coinData.size;
    this.patterns = patterns;
    this.selected = 0;
    this.ctr = 0;
    this.offsetY = this.generateY();
    this.distanceBetween = Math.max(1000, Math.min(Math.random() * 2000));
  }
  selectPattern() {
    return Math.round(Math.random() * (this.patterns.length - 1));
  }
  generateY() {
    return Math.random() * (gameSettings.height - 200) + 100;
  }
  spawnEntity(type, yOffset) {
    if (type === "coin") {
      return new Coin(
        yOffset + this.offsetY,
        this.size,
        this.size,
        3,
        this.entities,
        this.collisions,
        this.events,
        this.scrollSpeed,
      );
    } else if (type === "zapper") {
      return new Zapper(
        yOffset + this.offsetY,
        40,
        200,
        5,
        this.entities,
        this.collisions,
        this.events,
        this.scrollSpeed,
      );
    }
  }
  spawn() {
    const pattern = this.patterns[this.selected];
    const step = pattern.steps[this.ctr];

    for (const type of Object.keys(step)) {
      for (const y of step[type]) {
        const entity = this.spawnEntity(type, y);

        this.entities.register(entity);
        this.entities.sortByLayers();
      }
    }

    this.ctr++;
    if (this.ctr > pattern.steps.length - 1) {
      this.offsetY = this.generateY();
      this.selected = this.selectPattern();
      this.ctr = 0;
    }

    if (this.ctr === 0) {
      this.isSpawning = false;
    } else {
      this.isSpawning = true;
    }
  }
  update(dt, distance) {
    if (
      distance - this.lastDistance > this.distanceBetween &&
      !this.isSpawning
    ) {
      this.spawn();
      this.lastDistance += this.distanceBetween;
    } else if (
      distance - this.lastDistance > this.patterns[this.selected].spacing &&
      this.isSpawning
    ) {
      this.spawn();
      this.lastDistance += this.patterns[this.selected].spacing;
    }
  }
}

export { SegmentFactory };
