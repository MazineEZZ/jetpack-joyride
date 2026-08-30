import { gameSettings } from "../data/settings.js";
import { RegistrySystem } from "./registry.js";

class FactoryRegistry extends RegistrySystem {
  constructor() {
    super();
  }
  update(dt, distance) {
    for (const e of [...this.elements]) e.update(dt, distance);
  }
}
export { FactoryRegistry };
