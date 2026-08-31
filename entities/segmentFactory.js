import { EntityFactory } from "./entityFactory.js";
import { gameSettings } from "../data/settings.js";
import { coinData, zapperData, patterns } from "../data/entityData.js";
import { Coin } from "./coin.js";
import { Zapper } from "./zapper.js";

class SegmentFactory extends EntityFactory {
  constructor(entities, collisions, events) {
    super(entities, collisions, events);
    this.lastDistance = 0;
    this.scrollSpeed = gameSettings.scrollSpeed;
    this.coinData = coinData;
    this.zapperData = zapperData;
    this.edgeHeight = gameSettings.edgeHeight;
    // Factory
    this.maxHeight = Math.max(this.coinData.size, this.zapperData.height);
    this.selected = 0;
    this.patterns = patterns;
    this.offsetY = this.generateY();
    this.ctr = 0;
    this.isSpawning = false;
    this.distanceBetween = 600;
    this.entityBuilders = {
      coin: (y) => this.spawnCoin(y),
      zapperV: (y) => this.spawnZapper(y),
      zapperH: (y) => this.spawnZapper(y, true),
    };
  }
  generateDistance() {
    return Math.max(1000, Math.min(Math.random() * 1500));
  }
  selectPattern() {
    return Math.round(Math.random() * (this.patterns.length - 1));
  }
  getPatternExtent(pattern) {
    let min = Infinity,
      max = -Infinity;
    for (const step of pattern.steps) {
      for (const type of Object.keys(step)) {
        for (const y of step[type]) {
          min = Math.min(min, y);
          max = Math.max(max, y);
        }
      }
    }
    return { min, max };
  }
  generateY() {
    const pattern = this.patterns[this.selected];
    const { min, max } = this.getPatternExtent(pattern);
    const padding = 20 + this.edgeHeight;
    const lowerBound = -min + padding;
    const upperBound = gameSettings.height - max - padding - this.maxHeight;
    return lowerBound + Math.random() * (upperBound - lowerBound);
  }
  spawnCoin(y) {
    return new Coin(
      y + this.offsetY,
      this.coinData.size,
      this.coinData.size,
      3,
      this.entities,
      this.collisions,
      this.events,
      this.scrollSpeed,
    );
  }
  spawnZapper(y, isRotated = false) {
    return new Zapper(
      y + this.offsetY,
      this.zapperData.width,
      this.zapperData.height,
      this.zapperData.hitboxWidth,
      this.zapperData.hitboxHeight,
      5,
      this.entities,
      this.collisions,
      this.events,
      this.scrollSpeed,
      isRotated,
    );
  }
  spawn() {
    const pattern = this.patterns[this.selected];
    const step = pattern.steps[this.ctr];

    for (const type of Object.keys(step)) {
      for (const y of step[type]) {
        const entity = this.entityBuilders[type](y);
        console.log(this.offsetY);

        this.entities.register(entity);
      }
    }
    this.entities.sortByLayers();

    this.ctr++;
    this.isSpawning = true;
    if (this.ctr > pattern.steps.length - 1) {
      this.isSpawning = false;
      this.selected = this.selectPattern();
      this.offsetY = this.generateY();
      this.distanceBetween = this.generateDistance();
      this.ctr = 0;
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
