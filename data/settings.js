const gameSettings = Object.freeze({
  width: 1280,
  height: 720,
  ratio: 16 / 9,
  margin: 5,
  grid: 80,
  bgColor: "blue",
});

const inputBindings = Object.freeze({
  move_up: "z",
  move_down: "s",
  move_left: "q",
  move_right: "d",
  pause_game: "p",
});

const playerSettings = Object.freeze({
  speed: 400,
});

export { gameSettings, inputBindings, playerSettings };
