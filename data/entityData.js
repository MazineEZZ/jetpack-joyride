import { gameSettings } from "./settings.js";

const playerData = {
  x: 400,
  y: gameSettings.height - gameSettings.edgeHeight,
  width: 80,
  height: 110,
  hitboxWidth: 60,
  hitboxHeight: 90,
  zIndex: 5,
  color: "green",
};

const S = 40;

const coinData = {
  size: S,
  color: "yellow",
};

const zapperData = {
  width: 66 * 1.5,
  height: 162 * 1.5,
  color: "red",
};

const stepDist = 54;

// I generated this using AI due to time limitations
const patterns = [
  // ==========================================
  // zapperHS ONLY (Reflexes & Positioning)
  // ==========================================

  // 1. The Lone zapperV (Just 1 zapperV)
  // A simple, single obstacle to keep the player awake.
  {
    name: "lone_zapperH",
    spacing: 200,
    steps: [{ zapperV: [0] }],
  },

  // 2. The Simple Gate (Just 2 zapperHs)
  // A top and bottom zapperV forming a 140px safe gap.
  {
    name: "double_gate",
    spacing: 200,
    steps: [{ zapperV: [-200, 140] }],
  },

  // 3. zapperV Stairs (3 zapperHs)
  // Wide horizontal spacing forces the player to gently glide downward.
  {
    name: "zapperH_stairs",
    spacing: 250,
    steps: [{ zapperV: [-100] }, { zapperV: [50] }, { zapperV: [200] }],
  },

  // ==========================================
  // COINS ONLY (Rewards & Flight Training)
  // ==========================================

  // 4. Dense Coin Block (A fat 4x6 grid of pure joy)
  {
    name: "dense_coin_block",
    spacing: stepDist,
    steps: Array(6).fill({ coin: [0, stepDist, stepDist * 2, stepDist * 3] }),
  },

  // 5. The Hollow Hexagon Ring
  {
    name: "coin_hexagon",
    spacing: stepDist,
    steps: [
      { coin: [54, 108] },
      { coin: [0, 162] },
      { coin: [-54, 216] },
      { coin: [-54, 216] },
      { coin: [0, 162] },
      { coin: [54, 108] },
    ],
  },

  // 6. Smooth Sine Wave (Single line)
  {
    name: "coin_wave",
    spacing: 50,
    steps: [
      { coin: [0] },
      { coin: [-45] },
      { coin: [-80] },
      { coin: [-100] },
      { coin: [-80] },
      { coin: [-45] },
      { coin: [0] },
      { coin: [45] },
      { coin: [80] },
      { coin: [100] },
      { coin: [80] },
      { coin: [45] },
      { coin: [0] },
    ],
  },

  // 7. Diagonal Ascend (Single line)
  {
    name: "diagonal_coins",
    spacing: stepDist,
    steps: [
      { coin: [150] },
      { coin: [100] },
      { coin: [50] },
      { coin: [0] },
      { coin: [-50] },
      { coin: [-100] },
      { coin: [-150] },
    ],
  },

  // 8. X Marks The Spot (Two intersecting lines)
  {
    name: "x_marks_the_spot",
    spacing: stepDist,
    steps: [
      { coin: [-108, 108] },
      { coin: [-54, 54] },
      { coin: [0] },
      { coin: [-54, 54] },
      { coin: [-108, 108] },
    ],
  },

  // ==========================================
  // MIXED (Risk vs. Reward)
  // ==========================================

  // 9. The Guided Tunnel
  // A straight 140px tunnel of zapperHs with a perfectly centered line of coins (y = 50) guiding you.
  {
    name: "zapperH_tunnel",
    spacing: 120,
    steps: Array(5).fill({ coin: [50], zapperV: [-200, 140] }),
  },

  // 10. The Choke Point
  // Forces the player through a tight zapperV gate, immediately rewarding them with a massive wall of coins.
  {
    name: "the_choke_point",
    spacing: stepDist + 20,
    steps: [
      { zapperV: [-200, 160] }, // The Gate
      { coin: [-100, -46, 8, 62, 116, 170, 224] }, // The Reward Wall
      { coin: [-100, -46, 8, 62, 116, 170, 224] },
      { coin: [-100, -46, 8, 62, 116, 170, 224] },
    ],
  },
  {
    name: "laser_corridor",
    spacing: 220,
    steps: [
      { zapperH: [0, 180], coin: [90] },
      { zapperH: [0, 180], coin: [90] },
      { zapperH: [0, 180], coin: [90] },
    ],
  },

  // 12. The Slalom (Zig-Zag)
  // Forces the player to weave up, then down, then up.
  // Spacing is 250 to give the player plenty of time to change altitude.
  {
    name: "horizontal_slalom",
    spacing: 250,
    steps: [
      { zapperH: [0], coin: [100, 150] }, // Ceiling (coins below)
      { zapperH: [160], coin: [20, 70] }, // Floor (coins above)
      { zapperH: [0], coin: [100, 150] }, // Ceiling
      { zapperH: [160], coin: [20, 70] }, // Floor
    ],
  },

  // 13. The Coin Shelf
  // A horizontal zapper acts as a deadly platform, but 4 sweet coins rest right on top of it.
  // The spacing is 50, so 4 steps perfectly span the ~200px width of the single zapperH!
  {
    name: "the_coin_shelf",
    spacing: 50,
    steps: [
      { zapperH: [120], coin: [60] }, // Spawns the zapper AND the first coin
      { coin: [60] }, // Just a coin
      { coin: [60] }, // Just a coin
      { coin: [60] }, // Just a coin
    ],
  },

  // 14. The Bait & Switch (Dead End)
  // Starts like a normal corridor with coins, but a vertical zapper blocks the exit!
  // The player has to grab the coins and dive OUT of the tunnel before the end.
  {
    name: "bait_and_switch",
    spacing: 100,
    steps: [
      { zapperH: [0, 180], coin: [90] },
      { coin: [90] },
      { zapperV: [0] }, // 200px tall vertical zapper blocking the exit!
    ],
  },

  // 15. The "T-Bone" Cross
  // A horizontal zapper intersecting perfectly in the middle of a vertical one.
  // Forces the player to make a wide maneuver around the edges.
  {
    name: "t_bone_cross",
    spacing: 200,
    steps: [
      { zapperV: [0], zapperH: [80] }, // If V is 200px tall, an H at 80 forms a perfect '+' cross.
    ],
  },
];

export { playerData, coinData, zapperData, patterns };
