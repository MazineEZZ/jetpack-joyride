import { gameSettings } from "../data/settings.js";
import { Coin } from "./coin.js";
import { EntityFactory } from "./entityFactory.js";

class CoinFactory extends EntityFactory {
  constructor(entities, collisions, events) {
    super(entities, collisions, events);
    this.distanceCtr = 0;
    this.scrollSpeed = gameSettings.scrollSpeed;
  }
  spawn() {
    const y = Math.random() * (gameSettings.height - 200) + 100;

    const coin = new Coin(
      y,
      30,
      30,
      3,
      this.entities,
      this.collisions,
      this.events,
    );

    this.entities.register(coin);
  }
  update(dt) {
    // I want to spawn upon reaching a distance of 500
    this.distanceCtr += this.scrollSpeed * dt;
    if (this.distanceCtr > 1000) {
      this.spawn();
      this.distanceCtr = 0;
    }
  }
}

export { CoinFactory };
