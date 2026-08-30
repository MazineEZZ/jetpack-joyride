function clamp(min, val, max) {
  return Math.min(Math.max(min, val), max);
}

function convertPxToMeters(pxs) {
  return Math.round(pxs / 100);
}

function pad(num, p) {
  return num.toString().padStart(p, "0");
}

function colorToHex(color) {
  const tempEl = document.createElement("div");
  tempEl.style.color = color;

  const code = window.getComputedStyle(tempEl);

  return code;
}

export { convertPxToMeters, pad, colorToHex };
