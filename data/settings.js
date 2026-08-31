const gameSettings = Object.freeze({
  width: 1280,
  height: 720,
  ratio: 16 / 9,
  margin: 5,
  grid: 80,
  edgeHeight: 80,
  bgColor: "blue",
  scrollSpeed: 500,
});

const inputBindings = Object.freeze({
  go_up: " ",
  pause_game: "Escape",
});

const physicsSettings = Object.freeze({
  gravity: 1440, // Using the position over time formula where Vi = 0 & X0 = 0 gives us a = 2 * d / t^2
  thrust: 1440 * 2.1,
  timeToFall: 1, // Per seconds
  speed: 600,
  offset: 20,
});

export { gameSettings, inputBindings, physicsSettings };
