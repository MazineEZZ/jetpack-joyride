# Game Template

## Overview

A template for my future game, it encompasses four structural hierachies:

### Core

- **Game**: The engine itself.
- **Rect**: A class that produces rectangles
- **Vector**: A class that handles vectors for all moving entities

PS: One thing worth mentioning, `spawn()` should be refactored since currently it's not generalized, and rather game-specific

### Systems

- **Entity Registry System**: An entity registry system that keeps track of all game entities.
- **Collision System**: A collision system that checks if two objects are overlapping. It also has a separate function of which resolves collisions.
- **Animation System**: an animation system that uses sprite sheets. It supports adding/removing animations, flipping, and animation frames.
- **Audio System**: A simple audio system which utilizes JS's built-in Audio() class.
- **Event Pub/Sub System**: A signal-like system to decouple game components.
- **UI System**: A UI Layer System that keeps track of UI elements.
- **Input System**: A simple Input System that takes bindings and checks whether they have been pressed or not.

### Data

- **Levels**: A simple level creator. It's game-specific.
- **Settings**: It has game constants.

### Entities

All entities use Constructor Injection for their system dependencies (collisions, entity registry, input, events), this is made to avoid shared global state and keeps each entity's dependencies explicit and testable. Only inject what a given entity actually needs. Not every entity requires all four.

- **Player**: Example entity wiring input + collisions into an entity. Movement logic here is a specific example (4-directional), replace with your game's actual movement model.
- **Coin**: Pickup entity. Self-unregisters on hit, and emits an event.
- **Hazard**: Damage-on-touch entity. Emits an event on hit.
- **Barrier**: Static solid, no injected systems. It's used to bound/block movement.

PS: These are example patterns, expect to add, remove, or rewrite entities per project.

## Things to note

This template was made specifically for my future games, it follows systems that I've personally created and tested. If usage is something on your mind, please expect to do some refactoring.
