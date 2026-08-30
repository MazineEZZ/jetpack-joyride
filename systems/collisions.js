import { RegistrySystem } from "./registry.js";

class CollisionSystem extends RegistrySystem {
  constructor() {
    super();
  }
  check(subject) {
    for (const other of this.elements) {
      if (subject === other) continue;
      if (isColliding(subject, other)) {
        subject.onHit(other);
      }
    }
  }
}

function isColliding(a, b) {
  return (
    a.position.x < b.position.x + b.width &&
    a.position.x + a.width > b.position.x &&
    a.position.y < b.position.y + b.height &&
    a.position.y + a.height > b.position.y
  );
}

function separate(moving, obstacle) {
  const dx1 = obstacle.position.x + obstacle.width - moving.position.x;
  const dx2 = moving.position.x + moving.width - obstacle.position.x;
  const dy1 = obstacle.position.y + obstacle.height - moving.position.y;
  const dy2 = moving.position.y + moving.height - obstacle.position.y;

  const overlapX = Math.min(dx1, dx2);
  const overlapY = Math.min(dy1, dy2);

  if (overlapX < overlapY) {
    moving.position.x += dx1 < dx2 ? overlapX : -overlapX;
  } else {
    moving.position.y += dy1 < dy2 ? overlapY : -overlapY;
  }
}

export { CollisionSystem, separate, isColliding };
