const Bullet = (position, direction, ownerId) => ({
  position,
  direction,
  speed: 600,
  owner: ownerId,
  shape: {
    type: "circle",
    radius: 1.5
  }
});

const BulletPair = (position, direction, ownerId) => [
  Bullet({ ...position, x: position.x - 2, y: position.y + 12 }, direction, ownerId),
  Bullet({ ...position, x: position.x + 2, y: position.y + 12 }, direction, ownerId)
];

export const Ship = (position = { x: 0, y: 0 }) => ({
  id: "Player_Ship_Bob",
  collision: {},
  speed: 300,
  position,
  direction: { x: 0, y: 0 },
  shape: {
    type: "rect",
    width: 20,
    height: 50,
  },
  sprite: {
    asset: "ship",
    width: 21,
    height: 27
  },
  // TODO: extract out to separate weapon types,
  // and figure out a per-ship mounting system (bones and nodes)
  weapons: {
    primary: {
      spawn: BulletPair,
      rateOfFire: 5,
      lastFired: 0,
      damage: 5,
      sound: "pew",
    }
  },
  // TODO: extract out to a keymap system for settings menu
  controls: {
    ["Strafe_Left"]: { input: "KeyA", command: "MoveLeft" },
    ["Strafe_Right"]: { input: "KeyD", command: "MoveRight" },
    ["Accelerate"]: { input: "KeyW", command: "MoveUp" },
    ["Decelerate"]: { input: "KeyS", command: "MoveDown" },
    ["Primary_Fire"]: { input: "Space", command: "FirePrimary" },
    ["Secondary_Fire"]: { input: "ShiftLeft", command: "FireSecondary" }
  }
});
