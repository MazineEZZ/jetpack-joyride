import { gameSettings } from "../data/settings.js";

class UIElement {
  constructor(x, y, zIndex) {
    this.position = { x, y };
    this.zIndex = zIndex;
    this.visible = true;
  }
  draw(ctx) {}
}

class Label extends UIElement {
  constructor(
    x,
    y,
    {
      text = "",
      font = "24px sans-serif",
      color = "white",
      zIndex = 0,
      align = "left",
      baseline = "alphabetic",
    } = {},
  ) {
    super(x, y, zIndex);
    this.text = text;
    this.font = font;
    this.color = color;
    this.align = align;
    this.baseline = baseline;
  }
  setText(text) {
    this.text = text;
  }
  draw(ctx) {
    if (!this.visible) return;
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.textAlign = this.align;
    ctx.textBaseline = this.baseline;
    ctx.fillText(this.text, this.position.x, this.position.y);
  }
}

class UILayer {
  constructor() {
    this.elements = [];
  }
  add(element) {
    this.elements.push(element);
  }
  remove(element) {
    const i = this.elements.indexOf(element);
    if (i !== -1) this.elements.splice(i, 1);
  }
  sortByLayers() {
    this.elements.sort((a, b) => a.zIndex - b.zIndex);
  }
  draw(ctx) {
    this.sortByLayers();
    for (const el of [...this.elements]) {
      el.draw(ctx);
    }
  }
}

export { UILayer, Label };
