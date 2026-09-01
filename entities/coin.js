import { ScrollableEntity } from "../core/scrollableEntity.js";
import { physicsSettings } from "../data/settings.js";
import { AnimatedSprite } from "../systems/animation.js";

class Coin extends ScrollableEntity {
  constructor(
    y,
    width,
    height,
    zIndex,
    entities,
    collision,
    events,
    speed,
    src = "",
    color = "yellow",
  ) {
    super(y, width, height, zIndex, entities, collision, speed, color);
    this.events = events;
    this.hasAnimation = src !== "";
    if (this.hasAnimation) {
      this.animation = new AnimatedSprite(
        src,
        this.position.x,
        this.position.y,
        this.width,
        this.height,
        48 / 4,
        12,
        10,
      );
      this.animation.add("spin", 0, 3);
    }
  }
  onHit(other) {
    this.entities.unregister(this);
    this.events.emit("coinCollected", { coin: this });
  }
  update(dt) {
    super.update(dt);

    this.animation.update(dt);
  }
  draw(ctx) {
    //* Hitbox
    // ctx.fillStyle = this.color;
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    //* Sprite
    this.animation.position = this.position;
    this.animation.draw(ctx, this.width, this.height);
  }
}

export { Coin };
