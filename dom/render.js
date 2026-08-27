import { gameSettings } from "../data/settings.js";

function createDOM({
  kind = "div",
  type = "",
  id = "",
  classArr = [],
  text = "",
  alt = "",
  src = "",
  same = false,
  // CSS
  width = "",
  height = "",
  bgColor = "",
} = {}) {
  const element = document.createElement(kind);

  if (id) element.id = id;
  if (same && id) element.classList.add(id);
  if (type) element.type = type;
  if (alt) element.alt = alt;
  if (src) element.src = src;
  if (text) element.textContent = text;
  classArr.forEach((cls) => element.classList.add(cls));

  // CSS
  if (width) element.style.width = width + "px";
  if (height) element.style.height = height + "px";
  if (bgColor) element.style.backgroundColor = bgColor;

  return element;
}

function renderGame() {
  const gameContainer = createDOM({
    id: "game-container",
    same: true,
  });

  const canvas = createDOM({
    kind: "canvas",
    id: "main-canvas",
  });

  gameContainer.appendChild(canvas);

  return gameContainer;
}

function render() {
  const gameContainer = renderGame();

  document.body.appendChild(gameContainer);
}

export { render };
