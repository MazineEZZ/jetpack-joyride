import { Rect } from "../core/rect.js";

class RocketWarning extends Rect {
  constructor(x, y, width, height, zIndex, color = "red") {
    super(x, y, width, height, zIndex, color);
  }
}

export { RocketWarning };
