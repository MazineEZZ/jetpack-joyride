const gameSettings = Object.freeze({
  width: 1280,
  height: 720,
  ratio: 16 / 9,
  margin: 5,
  grid: 80,
  bgColor: "blue",
});

const inputBindings = Object.freeze({
  go_up: " ",
});

const physicsSettings = Object.freeze({
  gravity: 300,
  thrust: 1000,
});

export { gameSettings, inputBindings, physicsSettings };
