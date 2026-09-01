import { gameSettings } from "../data/settings.js";
import { RegistrySystem } from "./registry.js";

class FactoryRegistry extends RegistrySystem {
  constructor() {
    super();
  }
  update(dt, distance, scrollSpeed, playerY) {
    for (const e of [...this.elements])
      e.update(dt, distance, scrollSpeed, playerY);
  }
}
export { FactoryRegistry };
