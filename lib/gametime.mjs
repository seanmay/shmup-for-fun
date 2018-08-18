export const GameTime = (previous, current, tickrate) => {
  const delta = current - previous;
  const ticks = Math.floor(delta / tickrate);
  const elapsed = ticks * tickrate;
  const keyframe = previous + elapsed;
  const tween = 1 - elapsed / delta;

  return {
    tickrate,
    ticks,
    time: keyframe,
    naturalTime: current,
    tween
  };
};
