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
  hitboxWidth: 55 * 1.5,
  hitboxHeight: 155 * 1.5,
  color: "red",
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

  // 4. Thread the Needle Tunnel
  // A short, wide horizontal tunnel. Coins are placed exactly in the 180px safe zone.
  {
    name: "thread_the_needle",
    spacing: 240, // Wide horizontal spacing for high speeds
    steps: [
      { zapperH: [-100, 200], coin: [70] },
      { zapperH: [-100, 200], coin: [70] },
    ],
  },

  // ==========================================
  // ZAPPERS ONLY (Simple Hazards)
  // ==========================================

  // 5. High-Low Slalom
  // Forces a simple altitude change. Spacing is massive (350) so at high speeds it feels like a gentle wave.
  {
    name: "high_low_slalom",
    spacing: 350,
    steps: [{ zapperV: [-150] }, { zapperV: [150] }, { zapperV: [-150] }],
  },

  // 6. The Lone Horizontal
  // Just a single wide zapper sitting in space. Player can easily go over or under it.
  {
    name: "lone_horizontal",
    spacing: 200,
    steps: [{ zapperH: [0] }],
  },

  // 7. The Double Gate
  // Two consecutive vertical gates. No coins to distract the player, just a pure survival check.
  {
    name: "double_gate",
    spacing: 350, // Massive spacing to prevent feeling boxed in
    steps: [{ zapperV: [-243, 180] }, { zapperV: [-243, 180] }],
  },
];

export { playerData, coinData, zapperData, patterns };
