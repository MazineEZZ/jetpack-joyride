function clamp(min, val, max) {
  return Math.min(Math.max(min, val), max);
}

export { clamp };
