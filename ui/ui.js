import { gameSettings } from "../data/settings.js";

class UIElement {
  constructor(x, y, zIndex) {
    this.position = { x, y };
    this.zIndex = zIndex;
    this.visible = true;
  }
  draw(ctx) {}
}

class Panel extends UIElement {
  constructor(x, y, zIndex, width, height, color) {
    super(x, y, zIndex);
    this.width = width;
    this.height = height;
    this.color = color;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

class Label extends UIElement {
  constructor(
    x,
    y,
    {
      text = "",
      color = "white",
      zIndex = 0,
      borderColor = "black",
      borderSize = 4,
      align = "left",
      baseline = "alphabetic",
      fontSize = "30px",
      fontName = "sans-serif",
      fontSrc = "",
    } = {},
  ) {
    super(x, y, zIndex);
    this.text = text;
    this.color = color;
    this.borderColor = borderColor;
    this.borderSize = borderSize;
    this.align = align;
    this.baseline = baseline;

    this.fontSize = fontSize;
    this.fontName = fontName;

    if (fontSrc !== "") {
      this.font = `${this.fontSize} sans-serif`;
      this.loadFont(fontSrc);
    } else {
      this.font = `${fontSize} ${fontName}`;
    }
  }
  loadFont(fontSrc) {
    const customFont = new FontFace(this.fontName, `url(${fontSrc})`);

    customFont
      .load()
      .then((loadedFont) => {
        document.fonts.add(loadedFont);
        this.font = `${this.fontSize} ${this.fontName}`;
      })
      .catch((err) => ("Font failed to load: ", error));
  }
  setText(text) {
    this.text = text;
  }
  draw(ctx) {
    if (!this.visible) return;
    ctx.font = this.font;
    ctx.textAlign = this.align;
    ctx.textBaseline = this.baseline;
    // Border
    ctx.strokeStyle = this.borderColor;
    ctx.lineWidth = this.borderSize;
    ctx.lineJoin = "round";
    ctx.strokeText(this.text, this.position.x, this.position.y);
    // Font
    ctx.fillStyle = this.color;
    ctx.fillText(this.text, this.position.x, this.position.y);
  }
}

class ImageUI extends UIElement {
  constructor(src, x, y, width, height, zIndex) {
    super(x, y, zIndex);
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = src;
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height,
    );
  }
}

class Button extends UIElement {
  constructor(x, y, width, height, zIndex, color = "black") {
    super(x, y, zIndex);
    this.width = width;
    this.height = height;
    this.color = color;
  }
  update(mouse) {
    if (isHovering(this, mouse)) {
      this.color = "white";
    } else {
      this.color = "red";
    }
    console.log(this.color);
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

function isHovering(element, mouse) {
  return (
    element.position.x < mouse.position.x &&
    mouse.position.x < element.position.x + element.width &&
    element.position.y < mouse.position.y &&
    mouse.position.y < element.position.y + element.height
  );
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
  update(mouse) {
    for (const el of [...this.elements]) {
      if (typeof el.update === "function") {
        el.update(mouse);
      }
    }
  }
  draw(ctx) {
    this.sortByLayers();
    for (const el of [...this.elements]) {
      el.draw(ctx);
    }
  }
}

export { UILayer, Label, Panel, ImageUI, Button };
