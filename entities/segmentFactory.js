import { EntityFactory } from "./entityFactory.js";
import { gameSettings } from "../data/settings.js";
import { coinData, zapperData, patterns } from "../data/entityData.js";
import { Coin } from "./coin.js";
import { Zapper } from "./zapper.js";

class SegmentFactory extends EntityFactory {
  constructor(entities, collisions, events) {
    super(entities, collisions, events);
    this.coinData = coinData;
    this.zapperData = zapperData;
    this.edgeHeight = gameSettings.edgeHeight;
    // Factory
    this.lastDistance = 0;
    this.distanceBetween = 600;
    this.selected = 0;
    this.patterns = patterns;
    this.offsetY = this.generateY();
    this.ctr = 0;
    this.isSpawning = false;
    this.entityBuilders = {
      coin: (y) => this.spawnCoin(y),
      zapperV: (y) => this.spawnZapper(y),
      zapperH: (y) => this.spawnZapper(y, true),
    };
  }
  generateDistance() {
    const min = 1000,
      max = 2200;
    const t = (Math.random() + Math.random()) / 2;
    return min + t * (max - min);
  }
  selectPattern() {
    return Math.round(Math.random() * (this.patterns.length - 1));
  }
  getPatternExtent(pattern) {
    let min = Infinity,
      max = -Infinity;
    let patternMaxHeight = 0;

    for (const step of pattern.steps) {
      for (const type of Object.keys(step)) {
        let entityHeight = 0;
        if (type === "coin") entityHeight = this.coinData.size;
        if (type === "zapperV") entityHeight = this.zapperData.height;
        if (type === "zapperH") entityHeight = this.zapperData.width;

        patternMaxHeight = Math.max(patternMaxHeight, entityHeight);

        for (const y of step[type]) {
          min = Math.min(min, y);
          max = Math.max(max, y);
        }
      }
    }
    return { min, max, patternMaxHeight };
  }
  generateY() {
    const pattern = this.patterns[this.selected];
    const { min, max, patternMaxHeight } = this.getPatternExtent(pattern);
    const padding = 20 + this.edgeHeight;
    const lowerBound = -min + padding;
    const upperBound = gameSettings.height - max - padding - patternMaxHeight;
    return lowerBound + Math.random() * (upperBound - lowerBound);
  }
  spawnCoin(y) {
    return new Coin(
      y + this.offsetY,
      this.coinData.size,
      this.coinData.size,
      this.coinData.zIndex,
      this.coinData.type,
      this.entities,
      this.collisions,
      this.events,
      this.scrollSpeed,
      this.coinData.src,
    );
  }
  spawnZapper(y, isRotated = false) {
    const hw = isRotated
      ? this.zapperData.hitboxHeight
      : this.zapperData.hitboxWidth;
    const hh = isRotated
      ? this.zapperData.hitboxWidth
      : this.zapperData.hitboxHeight;

    const zapper = new Zapper(
      y + this.offsetY,
      this.zapperData.width,
      this.zapperData.height,
      hw,
      hh,
      this.zapperData.zIndex,
      this.zapperData.type,
      this.scrollSpeed,
      this.entities,
      this.collisions,
      this.events,
      isRotated,
      this.zapperData.src,
      this.zapperData.spriteWidth,
      this.zapperData.spriteHeight,
    );
    this.collisions.register(zapper);
    return zapper;
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
  update(dt, distance, scrollSpeed) {
    this.scrollSpeed = scrollSpeed;
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
