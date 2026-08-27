import { Game } from "./core/game.js";
import { render } from "./dom/render.js";

render();
const canvas = document.getElementById("main-canvas");
const game = new Game(canvas);
game.start();
