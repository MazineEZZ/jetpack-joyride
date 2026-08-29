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
    this.coinSize = coinData.size;
    this.zapperWidth = zapperData.width;
    this.zapperHeight = zapperData.height;
    this.edgeHeight = gameSettings.edgeHeight;
    // Factory
    this.selected = 0;
    this.patterns = patterns;
    this.offsetY = this.generateY();
    this.ctr = 0;
    this.isSpawning = false;
    this.distanceBetween = 200;
    this.maxHeight = Math.max(this.coinSize, this.zapperHeight);
    this.entityBuilders = {
      coin: (y) => this.spawnCoin(y),
      zapperV: (y) => this.spawnZapper(y, this.zapperWidth, this.zapperHeight),
      zapperH: (y) =>
        this.spawnZapper(y, this.zapperHeight, this.zapperWidth, true),
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
      this.coinSize,
      this.coinSize,
      3,
      this.entities,
      this.collisions,
      this.events,
      this.scrollSpeed,
    );
  }
  spawnZapper(y, sizeDim1, sizeDim2, isRotated = false) {
    return new Zapper(
      y + this.offsetY,
      sizeDim1,
      sizeDim2,
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
