import { Rect } from "../core/rect.js";

class Barrier extends Rect {
  constructor(x, y, width, height, zIndex = 2, color = "white") {
    super(x, y, width, height, zIndex, color);
  }
  update() {}
}

export { Barrier };
