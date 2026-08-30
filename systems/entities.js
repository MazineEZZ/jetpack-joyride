import { RegistrySystem } from "./registry.js";

class EntityRegistry extends RegistrySystem {
  constructor() {
    super();
  }
  sortByLayers() {
    this.elements.sort((a, b) => a.zIndex - b.zIndex);
  }
  draw(ctx) {
    for (const e of [...this.elements]) e.draw(ctx);
  }
  update(dt) {
    for (const e of [...this.elements]) e.update(dt);
  }
}
export { EntityRegistry };
