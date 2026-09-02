import { Rect } from "../core/rect.js";
import { Vector2 } from "../core/vector.js";
import { gameSettings } from "../data/settings.js";
import { colorToRGB, toRad, toDegrees } from "../utils/utils.js";
import { RegistrySystem } from "./registry.js";

class Particle extends Rect {
  constructor(
    x,
    y,
    width,
    height,
    vX,
    vY,
    zIndex,
    lifetime,
    palette,
    particles,
    speed,
    color = "red",
  ) {
    super(x, y, width, height, zIndex, "particle", color);
    this.velocity = new Vector2(vX, vY);
    this.velocity = this.velocity.normalize();
    this.particles = particles;

    // Properties
    this.rgb = colorToRGB(color);
    this.opacity = 1;
    this.speed = speed;
    this.lifetime = lifetime;
    this.palette = palette;
    this.timer = 0;
    this.fadePower = 1000;
  }
  update(dt) {
    this.position.x += this.velocity.x * dt * this.speed;
    this.position.y += this.velocity.y * dt * this.speed;

    this.opacity -= this.timer / this.lifetime;
    if (this.palette === "fire") this.rgb.g += this.fadePower * dt;
    this.color = `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, ${this.opacity})`;

    this.timer += dt;
    if (this.timer >= this.lifetime || this.isInGround()) {
      this.particles.unregister(this);
    }
  }
  isInGround() {
    return this.position.y >= gameSettings.height - gameSettings.edgeHeight;
  }
  draw(ctx) {
    const angle = Math.atan2(this.velocity.x, -this.velocity.y);
    const centerX = this.position.x + this.width / 2;
    const centerY = this.position.y + this.height / 2;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }
}

class ParticleManager {
  constructor(
    x,
    y,
    width,
    height,
    pattern,
    speed,
    amount,
    lifetime,
    particles,
    palette,
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.palette = palette;
    this.secondPerParticles = 1 / amount; // Seconds per particles
    this.pattern = pattern;
    this.lifetime = lifetime;
    this.particles = particles;
    this.speed = speed;
    this.timer = 0;
    this.palette = palette;
    this.palettes = {
      fire: "#f70000",
      smoke: "#998c83",
    };
  }
  generateRandom(upperBound, lowerBound) {
    return lowerBound + Math.random() * (upperBound - lowerBound);
  }
  selectColor() {
    return this.palettes[this.palette];
  }
  getVectorCoords(upperAngle, lowerAngle) {
    const angle = this.generateRandom(upperAngle, lowerAngle);
    const rad = toRad(angle);
    return { vX: Math.cos(rad), vY: -Math.sin(rad) };
  }
  generateScale(width, height) {
    width = this.generateRandom(width, 10);
    height = this.generateRandom(height, 10);
    return { width, height };
  }
  selectPatternProper() {
    let properties = {};
    if (this.pattern === "spray") {
      const width = this.width;
      const height = this.height;
      Object.assign(properties, this.getVectorCoords(315, 225), {
        width,
        height,
      });
    } else if (this.pattern === "smoke") {
      Object.assign(
        properties,
        this.getVectorCoords(10, -10),
        this.generateScale(this.width, this.height),
      );
    } else {
      console.error("Please select a pattern!");
    }
    return properties;
  }
  spawn(x, y) {
    const { vX, vY, width, height } = this.selectPatternProper();
    const color = this.selectColor();
    const particle = new Particle(
      x,
      y,
      width,
      height,
      vX,
      vY,
      4,
      this.lifetime,
      this.palette,
      this.particles,
      this.speed,
      color,
    );
    this.particles.register(particle);
  }
  update(dt, x, y) {
    this.timer += dt;
    if (this.timer >= this.secondPerParticles) {
      this.timer -= this.secondPerParticles;
      this.spawn(x, y);
    }
  }
}

class ParticleSystem extends RegistrySystem {
  constructor() {
    super();
  }
  sortByLayers() {
    this.elements.sort((a, b) => a.zIndex - b.zIndex);
  }
  draw(ctx) {
    for (const e of [...this.elements]) e.draw(ctx);
  }
  update(dt) {
    for (const e of [...this.elements]) e.update(dt);
  }
}

export { ParticleManager, ParticleSystem };
