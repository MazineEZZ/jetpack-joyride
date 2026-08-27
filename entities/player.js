import { separate } from "../systems/collisions.js";
import { gameSettings, physicsSettings } from "../data/settings.js";
import { Rect } from "../core/rect.js";
import { Vector2 } from "../core/vector.js";

class Player extends Rect {
  constructor(
    x,
    y,
    width,
    height,
    hitboxWidth,
    hitboxHeight,
    zIndex,
    collision,
    input,
    color = "red",
  ) {
    super(x, y, hitboxWidth, hitboxHeight, zIndex, color);
    this.gravity = new Vector2(0, physicsSettings.gravity);
    this.velocity = new Vector2(0, 0);
    this.collision = collision;
    this.input = input;
  }
  update(delta) {
    if (this.input.isDown("go_up"))
      this.velocity.y -= gameSettings.thrust * delta;

    this.velocity.y += this.gravity.y * delta;
    this.position.y += this.velocity.y * delta;

    this.keepInBounds({
      width: gameSettings.width,
      height: gameSettings.height,
    });

    // this.animation.update(delta);

    this.collision.check(this);
  }
  keepInBounds(size) {
    for (const axis of ["x", "y"]) {
      const dim = axis === "x" ? "width" : "height";
      if (this.position[axis] <= 0) {
        this.position[axis] = 0;
        if (this.velocity.y <= 0) this.velocity.y = 0;
      }
      if (this.position[axis] + this[dim] >= size[dim]) {
        this.position[axis] = size[dim] - this[dim];
        this.velocity.y = 0;
      }
    }
  }
  onHit(entity) {
    separate(this, entity);
  }
  draw(ctx) {
    //* Hitbox
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    //* Sprite
    // this.animation.position = this.position;
    // this.animation.draw(ctx, this.width, this.height);
  }
}

export { Player };
