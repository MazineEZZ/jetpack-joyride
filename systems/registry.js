class RegistrySystem {
  constructor() {
    this.elements = [];
  }
  register(element) {
    this.elements.push(element);
  }
  unregister(element) {
    const i = this.elements.indexOf(element);
    if (i !== -1) this.elements.splice(i, 1);
  }
}
export { RegistrySystem };
