import { GameTime } from "./gametime.mjs";

export const Tick = (state, loop, lastTimer) => (ms) => {
  const timer = GameTime(lastTimer.time, ms, lastTimer.tickrate);
  let dead = false;
  const die = err => {
    console.log("Dying");
    dead = true;
    if (err) console.error(err);
  };

  loop(state, timer, die);

  if (!dead) {
    // TODO: extract this into a `next` to be timer & death agnostic
    requestAnimationFrame(Tick(state, loop, timer));
  } else {
    console.log("Closing");
  }
};