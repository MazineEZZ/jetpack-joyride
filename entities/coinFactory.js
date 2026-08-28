import { coinData } from "../data/entityData.js";
import { gameSettings } from "../data/settings.js";
import { Coin } from "./coin.js";
import { EntityFactory } from "./entityFactory.js";

class CoinFactory extends EntityFactory {
  constructor(entities, collisions, events) {
    super(entities, collisions, events);
    this.lastDistance = 0;
    this.scrollSpeed = gameSettings.scrollSpeed;
    this.size = coinData.size;
    this.patterns = coinData.patterns;
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
  spawn() {
    const pattern = this.patterns[this.selected];
    const step = pattern.steps[this.ctr];

    for (const yOffset of step) {
      const coin = new Coin(
        yOffset + this.offsetY,
        this.size,
        this.size,
        3,
        this.entities,
        this.collisions,
        this.events,
        this.scrollSpeed,
      );

      this.entities.register(coin);
      this.entities.sortByLayers();
    }

    this.ctr++;
    if (this.ctr > pattern.steps.length - 1) {
      this.offsetY = this.generateY();
      this.selected = this.selectPattern();
      this.ctr = 0;
    }
  }
  update(dt, distance) {
    if (distance - this.lastDistance > this.distanceBetween && this.ctr === 0) {
      this.spawn();
      this.lastDistance += this.distanceBetween;
    } else if (
      distance - this.lastDistance > this.patterns[this.selected].spacing &&
      this.ctr !== 0
    ) {
      this.spawn();
      this.lastDistance += this.patterns[this.selected].spacing;
    }
  }
}

export { CoinFactory };
