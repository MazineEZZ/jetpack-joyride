class Inputs {
  constructor(bindings) {
    this.bindings = bindings;
    this.keys = {};
  }
  setUpInputs() {
    document.addEventListener("keydown", (e) => {
      this.keys[e.key] = true;
    });
    document.addEventListener("keyup", (e) => {
      this.keys[e.key] = false;
    });
  }
  isDown(action) {
    return !!this.keys[this.bindings[action]];
  }
}

export { Inputs };
