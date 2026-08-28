import { gameSettings } from "../data/settings.js";

class FactoryRegistry {
  constructor() {
    this.factories = [];
    this.distance = 0; // The distance crossed so far
  }
  register(factory) {
    this.factories.push(factory);
  }
  unregister(factory) {
    const i = this.factories.indexOf(factory);
    if (i !== -1) this.factories.splice(i, 1);
  }
  update(dt) {
    this.distance += gameSettings.scrollSpeed * dt;
    for (const f of [...this.factories]) f.update(dt, this.distance);
  }
}
export { FactoryRegistry };
