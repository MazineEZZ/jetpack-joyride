import { gameSettings } from "../data/settings.js";
import { Coin } from "./coin.js";
import { EntityFactory } from "./entityFactory.js";

class CoinFactory extends EntityFactory {
  constructor(entities, collisions, events) {
    super(entities, collisions, events);
    this.lastDistance = 0;
    this.scrollSpeed = gameSettings.scrollSpeed;
    this.size = 30;
    this.patterns = [{ y1: 0, y2: 10, y3: 20, y4: 30, y5: 40 }];
    this.selected = 0;
    this.ctr = 0;
    this.offsetY = this.generateY();
  }
  select() {}
  generateY() {
    return Math.random() * (gameSettings.height - 200) + 100;
  }
  spawn() {
    const pattern = Object.values(this.patterns[this.selected]);
    if (this.ctr > pattern.length) {
      this.offsetY = this.generateY();
      this.ctr = 0;
    }

    const coin = new Coin(
      pattern[this.ctr] + this.offsetY,
      this.size,
      this.size,
      3,
      this.entities,
      this.collisions,
      this.events,
    );

    this.ctr++;

    this.entities.register(coin);
  }
  update(dt, distance) {
    if (distance - this.lastDistance > 1000 && this.ctr !== 0) {
      this.spawn();
      this.lastDistance += 1000;
    } else if (distance - this.lastDistance > 50) {
      this.spawn();
      this.lastDistance += 50;
    }
  }
}

export { CoinFactory };
