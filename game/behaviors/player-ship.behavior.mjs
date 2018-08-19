// TODO: this is terrible; these should be messages to queue and process
export const ShipCommands = {
  MoveLeft: (ship, state, timer) => {
    ship.direction.x = Math.max(ship.direction.x - 1, -1);
  },
  MoveRight: (ship, state, timer) => {
    ship.direction.x = Math.min(ship.direction.x + 1, +1);
  },
  MoveUp: (ship, state, timer) => {
    ship.direction.y = Math.max(ship.direction.y - 1, -1);
  },
  MoveDown: (ship, state, timer) => {
    ship.direction.y = Math.min(ship.direction.y + 1, +1);
  },
  FirePrimary: (ship, state, timer) => {
    const weapon = ship.weapons.primary;
    if (timer.time - weapon.lastFired >= 1000 / weapon.rateOfFire) {
      // TODO: Entity Factory
      const bullets = weapon.spawn(
        { x: ship.position.x, y: ship.position.y - ship.shape.height / 2 },
        { x: 0, y: -1 },
        ship.id
      );
      state.bullets.push(...bullets);
      weapon.lastFired = timer.time;
      state.soundQueue.push(weapon.sound);
    }
  },
  FireSecondary: (ship, state, timer) => {}
};