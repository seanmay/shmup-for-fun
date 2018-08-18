export default {
  name: "Beginnings",
  soundtrack: "soundtrack.IronHorse",

  dimensions: {
    width: 200,
    height: 10000,
  },

  assets: {
    sounds: [],
    sprites: [],
    music: ["soundtrack.IronHorse"]
  },

  // TODO: LEVEL EDITOR
  entities: [
    { type: "PLAYER_SPAWN", position: { x: 100, y: 0 } },
    // TODO: "Do a barrel roll"
    { type: "TALKING_HEAD", scene: "scenes.some-example", position: { x: 200, y: 200 } },
    { type: "TRIGGER", event: "ENEMY_GATEWAY", position: { y: 5000 } },
    // TODO: boss fights
    { type: "TRIGGER", event: "BOSS_GATEWAY", position: { y: 9999 } },
  ]
};