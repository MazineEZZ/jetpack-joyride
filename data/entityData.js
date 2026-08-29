const playerData = {
  x: 80,
  y: 80,
  width: 100,
  height: 120,
  hitboxWidth: 60,
  hitboxHeight: 90,
  zIndex: 5,
  color: "green",
};

const coinData = {
  size: S,
  color: "yellow",
};

const patterns = [
  {
    name: "sine_wave",
    spacing: 52,
    steps: [
      { coin: [0], zapper: [-250, 150] },
      { coin: [-35] },
      { coin: [-70] },
      { coin: [-95] },
      { coin: [-105] },
      { coin: [-95] },
      { coin: [-70] },
      { coin: [-35] },
      { coin: [0] },
      { coin: [35] },
      { coin: [70] },
      { coin: [95] },
      { coin: [105] },
      { coin: [95] },
      { coin: [70] },
      { coin: [35] },
      { coin: [0] },
    ],
  },
];

export { playerData, coinData, patterns };
