import { inputBindings } from "../data/settings.js";

class Inputs {
  constructor(bindings, canvas) {
    this.bindings = bindings;
    this.canvas = canvas;
    this.keys = {};
  }
  setUpInputs() {
    document.addEventListener("keydown", (e) => {
      this.keys[e.key] = true;
    });
    document.addEventListener("keyup", (e) => {
      this.keys[e.key] = false;
    });
    this.canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.keys[inputBindings.go_up_mobile] = true;
    });
    this.canvas.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.keys[inputBindings.go_up_mobile] = false;
    });
  }
  isDown(action) {
    return !!this.keys[this.bindings[action]];
  }
}

export { Inputs };
