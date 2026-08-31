import { Rect } from "../core/rect.js";
import { Vector2 } from "../core/vector.js";
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
    particles,
    color = "red",
  ) {
    super(x, y, width, height, zIndex, color);
    this.velocity = new Vector2(vX, vY);
    this.velocity = this.velocity.normalize();
    this.particles = particles;

    // Properties
    this.rgb = colorToRGB(color);
    this.opacity = 1;
    this.speed = 100;
    this.lifetime = lifetime;
    this.timer = 0;
  }
  update(dt) {
    this.position.x += this.velocity.x * dt * this.speed;
    this.position.y += this.velocity.y * dt * this.speed;

    this.opacity -= this.timer / this.lifetime;
    this.color = `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, ${this.opacity})`;

    this.timer += dt;
    if (this.timer >= this.lifetime) {
      this.particles.unregister(this);
    }
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
  constructor(x, y, width, height, pattern, amount, lifetime, particles) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.secondPerParticles = 1 / amount; // Seconds per particles
    this.pattern = pattern;
    this.lifetime = lifetime;
    this.particles = particles;
    this.timer = 0;
  }
  generateAngle(upperBound, lowerBound) {
    return lowerBound + Math.random() * (upperBound - lowerBound);
  }
  select() {
    let vX, vY;
    if (this.pattern === "spray") {
      const angle = this.generateAngle(315, 225);
      const rad = toRad(angle);
      vX = Math.cos(rad);
      vY = -Math.sin(rad);
    } else {
      console.error("Please select a pattern!");
    }
    return { vX, vY };
  }
  spawn() {
    const { vX, vY } = this.select();
    const particle = new Particle(
      this.x,
      this.y,
      this.width,
      this.height,
      vX,
      vY,
      4,
      this.lifetime,
      this.particles,
    );
    this.particles.register(particle);
  }
  update(dt) {
    this.timer += dt;
    if (this.timer >= this.secondPerParticles) {
      this.timer -= this.secondPerParticles;
      this.spawn();
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
