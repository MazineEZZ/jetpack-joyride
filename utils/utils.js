function clamp(min, val, max) {
  return Math.min(Math.max(min, val), max);
}

function convertPxToMeters(pxs) {
  return Math.round(pxs / 100);
}

function pad(num, p) {
  return num.toString().padStart(p, "0");
}

function colorToRGB(color) {
  const tempEl = document.createElement("div");
  tempEl.style.color = color;
  document.body.appendChild(tempEl);

  const colorCode = window.getComputedStyle(tempEl).color;
  document.body.removeChild(tempEl);

  const zero = 0;
  const rgbValues = colorCode.match(/\d+/g);
  if (!rgbValues) return { zero, zero, zero };

  const r = parseInt(rgbValues[0]);
  const g = parseInt(rgbValues[1]);
  const b = parseInt(rgbValues[2]);

  return { r, g, b };
}

export { convertPxToMeters, pad, colorToRGB };
