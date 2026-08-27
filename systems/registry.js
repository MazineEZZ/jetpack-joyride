class EntityRegistry {
  constructor() {
    this.entities = [];
  }
  register(entity) {
    this.entities.push(entity);
  }
  unregister(entity) {
    const i = this.entities.indexOf(entity);
    if (i !== -1) this.entities.splice(i, 1);
  }
  sortByLayers() {
    this.entities.sort((a, b) => a.zIndex - b.zIndex);
  }
  draw(ctx) {
    for (const e of [...this.entities]) e.draw(ctx);
  }
  update(dt) {
    for (const e of [...this.entities]) e.update(dt);
  }
}
export { EntityRegistry };
