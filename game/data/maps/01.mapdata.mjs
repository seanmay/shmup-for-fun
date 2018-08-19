export default {
  name: "Beginnings",
  soundtrack: "soundtrack.IronHorse",

  speed: 200,

  dimensions: {
    camera_elevation: 10000,
    player_elevation:  12000,

    width: 200
  },

  assets: {
    sounds: [],
    sprites: [],
    maps: ["map-01-0", "map-01-1"],
    music: ["soundtrack.IronHorse"]
  },

  layers: [
    { elevation: 100, asset: "map-01-0" },
    { elevation: 9000, asset: "map-01-1" },
    { elevation: 11000, asset: "map-01-1" },
    { elevation: 13000, asset: "map-01-1" }
  ],

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