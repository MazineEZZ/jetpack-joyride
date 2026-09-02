import { gameSettings } from "./settings.js";

const playerData = {
  type: "player",
  x: 400,
  y: gameSettings.height - gameSettings.edgeHeight,
  width: 80,
  height: 110,
  hitboxWidth: 50,
  hitboxHeight: 90,
  zIndex: 5,
  color: "green",
};

const spritesDir = "../assets/sprites/";

const S = 40;
const coinData = {
  type: "coin",
  size: S,
  hitboxSize: S,
  zIndex: 3,
  src: spritesDir + "coin.png",
  color: "yellow",
};

const zapperData = {
  type: "zapper",
  width: 66 * 1.5,
  height: 162 * 1.5,
  hitboxWidth: 50 * 1.5,
  hitboxHeight: 150 * 1.5,
  zIndex: 3,
  src: spritesDir + "zapper.png",
  spriteWidth: 660 / 10,
  spriteHeight: 162,
  color: "red",
};

const f = 1.2;
const rocketData = {
  type: "rocket",
  width: 132 * f,
  height: 45 * f,
  hitboxWidth: 132 * f,
  hitboxHeight: 45 * f,
  zIndex: 4,
  speed: 1200, // 1200
  src: spritesDir + "rocket.png",
  spriteWidth: 660 / 5,
  spriteHeight: 45,
  color: "red",
};

const rocketWarningData = {
  width: 198 / 2.5,
  height: 188 / 2.5,
  zIndex: 5,
  src: spritesDir + "rocket-warning.png",
  spriteWidth: 198,
  spriteHeight: 376 / 2,
};

const stepDist = 54;

const patterns = [
  // 1. The Solid Diamond
  // A fat, dense diamond shape that is incredibly satisfying to plow straight through.
  {
    name: "solid_diamond",
    spacing: stepDist,
    steps: [
      { coin: [0] },
      { coin: [-stepDist, 0, stepDist] },
      { coin: [-stepDist * 2, -stepDist, 0, stepDist, stepDist * 2] },
      { coin: [-stepDist, 0, stepDist] },
      { coin: [0] },
    ],
  },

  // 2. The DNA Helix
  // Two sine waves intersecting each other. Beautiful to look at, tricky to collect all of them.
  {
    name: "dna_helix",
    spacing: 50,
    steps: [
      { coin: [-100, 100] },
      { coin: [-50, 50] },
      { coin: [0] }, // Intersection point
      { coin: [-50, 50] },
      { coin: [-100, 100] },
      { coin: [-50, 50] },
      { coin: [0] }, // Intersection point
      { coin: [-50, 50] },
      { coin: [-100, 100] },
    ],
  },

  // 3. The Big Smile (U-Turn)
  // Forces the player to drop down low and immediately thrust back up.
  {
    name: "big_smile",
    spacing: 45,
    steps: [
      { coin: [-120] },
      { coin: [-80] },
      { coin: [-40] },
      { coin: [0] },
      { coin: [30] },
      { coin: [50] },
      { coin: [50] },
      { coin: [50] },
      { coin: [30] },
      { coin: [0] },
      { coin: [-40] },
      { coin: [-80] },
      { coin: [-120] },
    ],
  },

  // 4. The Checkerboard
  // A 5-column wide block where every alternating coin is missing, creating a checker pattern.
  {
    name: "checkerboard",
    spacing: stepDist,
    steps: [
      { coin: [-stepDist * 2, 0, stepDist * 2] },
      { coin: [-stepDist, stepDist] },
      { coin: [-stepDist * 2, 0, stepDist * 2] },
      { coin: [-stepDist, stepDist] },
      { coin: [-stepDist * 2, 0, stepDist * 2] },
    ],
  },

  // 5. The Triple Dash
  // Three separate horizontal lines of coins with gaps between them.
  // Forces the player to pick a lane (top, middle, or bottom).
  {
    name: "triple_dash",
    spacing: stepDist,
    steps: [
      { coin: [-120, 0, 120] },
      { coin: [-120, 0, 120] },
      { coin: [-120, 0, 120] },
      { coin: [-120, 0, 120] },
      { coin: [-120, 0, 120] },
    ],
  },

  // 6. The Pyramid (Forward-facing)
  // A triangle pointing to the right. The player hits the flat wall of coins first, then it tapers off.
  {
    name: "pyramid_right",
    spacing: stepDist,
    steps: [
      { coin: [-stepDist * 2, -stepDist, 0, stepDist, stepDist * 2] }, // Fat wall
      { coin: [-stepDist, 0, stepDist] },
      { coin: [0] }, // Tip of the pyramid
    ],
  },
  {
    name: "guiding_light",
    spacing: 200,
    steps: [{ zapperV: [-243, 180], coin: [70] }],
  },

  // 2. The Dive
  // A trail of coins leads the player downward, forcing them to duck under a ceiling zapper.
  {
    name: "the_dive",
    spacing: 60,
    steps: [
      { coin: [0] },
      { coin: [40] },
      { coin: [80] },
      { zapperH: [-80], coin: [120] }, // Zapper ceiling, coin below
      { coin: [120] },
      { coin: [120] },
    ],
  },

  // 3. The Coin Bridge
  // A straight line of coins hovering directly over a wide floor zapper.
  // The spacing of 60 means 4 coins will perfectly span the ~243px width of the horizontal zapper.
  {
    name: "coin_bridge",
    spacing: 60,
    steps: [
      { zapperH: [150], coin: [80] },
      { coin: [80] },
      { coin: [80] },
      { coin: [80] },
    ],
  },

  // ==========================================
  // ZAPPERS ONLY (Simple Hazards)
  // ==========================================

  // 6. The Lone Horizontal
  // Just a single wide zapper sitting in space. Player can easily go over or under it.
  {
    name: "lone_horizontal",
    spacing: 200,
    steps: [{ zapperH: [0] }],
  },
];

export {
  playerData,
  coinData,
  zapperData,
  rocketData,
  rocketWarningData,
  patterns,
};
