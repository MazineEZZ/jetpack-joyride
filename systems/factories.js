import { gameSettings } from "../data/settings.js";

class FactoryRegistry {
  constructor() {
    this.factories = [];
  }
  register(factory) {
    this.factories.push(factory);
  }
  unregister(factory) {
    const i = this.factories.indexOf(factory);
    if (i !== -1) this.factories.splice(i, 1);
  }
  update(dt, distance) {
    for (const f of [...this.factories]) f.update(dt, distance);
  }
}
export { FactoryRegistry };
