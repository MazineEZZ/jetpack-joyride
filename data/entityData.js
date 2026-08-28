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
// Coin
const S = 40;
const gap = 14;
const stepDist = S + gap;

const coinData = {
  size: S,
  color: "yellow",
  patterns: [
    // 1. Classic Sine Wave (smooth rhythmic wave)
    {
      name: "sine_wave",
      spacing: 52,
      steps: [
        [0],
        [-35],
        [-70],
        [-95],
        [-105],
        [-95],
        [-70],
        [-35],
        [0],
        [35],
        [70],
        [95],
        [105],
        [95],
        [70],
        [35],
        [0],
      ],
    },

    // 2. Parabolic Arc (smooth parabolic jump/thrust curve)
    {
      name: "thrust_arc",
      spacing: 54,
      steps: [[110], [60], [25], [5], [0], [5], [25], [60], [110]],
    },

    // 3. Dense 3x7 Coin Matrix (54px vertical & horizontal pitch)
    {
      name: "dense_matrix",
      spacing: stepDist,
      steps: Array(7).fill([0, stepDist, stepDist * 2]),
    },

    // 4. Hollow Diamond / Obstacle Ring (leaves clean room inside for a hazard)
    {
      name: "diamond_ring",
      spacing: 54,
      steps: [
        [0],
        [-54, 54],
        [-108, 108],
        [-162, 162],
        [-108, 108],
        [-54, 54],
        [0],
      ],
    },

    // 5. Dual Parallel Rails (two clear horizontal streams)
    {
      name: "parallel_rails",
      spacing: 60,
      steps: [
        [-54, 54],
        [-54, 54],
        [-54, 54],
        [-54, 54],
        [-54, 54],
        [-54, 54],
        [-54, 54],
        [-54, 54],
      ],
    },

    // 6. Diagonal Ascending Staircase
    {
      name: "staircase_up",
      spacing: 52,
      steps: [[140], [105], [70], [35], [0], [-35], [-70], [-105], [-140]],
    },

    // 7. Chevron / Right-Pointing Arrow
    {
      name: "arrow_right",
      spacing: 50,
      steps: [[-108, 108], [-54, 54], [-108, -54, 0, 54, 108], [0], [0]],
    },
  ],
};

export { playerData, coinData };
