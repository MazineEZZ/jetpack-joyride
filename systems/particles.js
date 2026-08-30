import { Rect } from "../core/rect.js";
import { Vector2 } from "../core/vector.js";
import { colorToRGB } from "../utils/utils.js";
import { RegistrySystem } from "./registry.js";

class Particle extends Rect {
  constructor(x, y, width, height, zIndex, lifetime, particles, color = "red") {
    super(x, y, width, height, zIndex, color);
    this.velocity = new Vector2(Math.random() * 4, Math.random() * 4);
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

    this.color = `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, ${this.opacity})`;

    this.timer += dt;
    if (this.timer >= this.lifetime) {
      this.particles.unregister(this);
    }
  }
  draw(ctx) {
    super.draw(ctx);
  }
}

class ParticleManager {
  constructor(x, y, width, height, amount, lifetime, particles) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.secondsPerPart = 1 / amount; // Seconds per particles
    this.lifetime = lifetime;
    this.particles = particles;
    this.timer = 0;
  }
  spawn() {
    const particle = new Particle(
      this.x,
      this.y,
      this.width,
      this.height,
      4,
      this.lifetime,
      this.particles,
    );
    this.particles.register(particle);
  }
  update(dt) {
    this.timer += dt;
    if (this.timer >= this.particlesPerSecond) {
      this.timer -= this.particlesPerSecond;
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
