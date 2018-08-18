import { GameTime } from "./lib/gametime.mjs";
import { Tick } from "./lib/tick.mjs";

import { DOMKeyboard } from "./lib/input/dom-keyboard.input.mjs";
import { DOMControllers } from "./lib/input/dom-controller.input.mjs";
import { loadImageAssets } from "./lib/assets/image.loader.mjs";
import { loadAudioAssets } from "./lib/assets/audio.loader.mjs";

import { Ship } from "./game/entities/player-ship.mjs";

// TODO: this is terrible; these should be messages to queue and process
const ShipCommands = {
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

const update = (game, timer, keyboard) => {
  const ship = game.ship;
  ship.direction.x = 0;
  ship.direction.y = 0;

  for (const [name, control] of Object.entries(ship.controls)) {
    if (keyboard.isKeyPressed(control.input)) {
      ShipCommands[control.command](ship, game, timer);
    }
  }

  // TODO: start breaking this into ECS entities; this update is 100% generic
  ship.position.x += ship.direction.x * (ship.speed / 1000) * timer.tickrate;
  ship.position.y += ship.direction.y * (ship.speed / 1000) * timer.tickrate;

  game.bullets.forEach(bullet => {
    bullet.position.x +=
      bullet.direction.x * (bullet.speed / 1000) * timer.tickrate;
    bullet.position.y +=
      bullet.direction.y * (bullet.speed / 1000) * timer.tickrate;
  });
};

const spriteAssets = {
  ship: "./assets/sprites/ship.png"
};

const textureAssets = {};

const soundAssets = {
  pew: "./assets/sounds/pew.mp3"
};

const soundtrackAssets = {
  "soundtrack.IronHorse": "./assets/soundtrack/Iron Horse.mp3"
};

const render = (video, audio, game, timer) => {
  video.save();
  video.fillStyle = "cornflowerblue";
  video.fillRect(0, 0, video.canvas.width, video.canvas.height);
  video.restore();

  const screenScale = video.canvas.width / game.map.dimensions.width;


  game.bullets.forEach(bullet => {
    const { x, y } = bullet.position;
    const { radius } = bullet.shape;
    const vx = x * screenScale;
    const vy = (y - game.ship.sprite.height/2) * screenScale + video.canvas.height;
    video.save();
    video.beginPath();
    video.moveTo(x * screenScale, vy);
    video.arc(x * screenScale, vy, radius * screenScale, 0, Math.PI * 2);
    video.fill();
    video.restore();
  });

  video.drawImage(
    game.assets.sprites[game.ship.sprite.asset].data,
    (game.ship.position.x - game.ship.sprite.width / 2) * screenScale,
    (game.ship.position.y - game.ship.sprite.height / 2) * screenScale + video.canvas.height - game.ship.sprite.height * screenScale,
    game.ship.sprite.width * screenScale,
    game.ship.sprite.height * screenScale
  );

  game.soundQueue.forEach(asset => {
    // TODO: Audio Player with channel pooling?
    const source = audio.createBufferSource();
    const sound = game.assets.sounds[asset];
    source.buffer = sound.data;
    source.connect(audio.destination);
    source.start(0);
    console.log(source);
  });
  game.soundQueue = [];
};

const Loop = ({ keyboard, video, audio }) => (state, timer, end) => {
  if (keyboard.isKeyPressed("Escape")) {
    keyboard.disconnect(window);
    end();
  } else {
    update(state, timer, keyboard);
    render(video, audio, state, timer);
  }
};

export const Game = () => {
  // NOTE: NOPE!
  const canvas = document.querySelector("canvas");
  canvas.width = 512;
  canvas.height = 512;

  const video = canvas.getContext("2d");
  video.imageSmoothingEnabled = false;
  const audio = new AudioContext();
  // :NOTE

  const keyboard = DOMKeyboard();
  const controllers = DOMControllers();
  keyboard.connect(window);
  controllers.connect(window);

  const FPS = 100;
  const Tickrate = 1000 / FPS;

  const maps = { "01": "./game/data/maps/01.mapdata.mjs" };

  const loadLevel = async (
    id,
    spriteAssets,
    textureAssets,
    soundAssets,
    soundtrackAssets
  ) => {
    const mapdata = (await import(maps[id])).default;
    const [sprites, textures, sounds, soundtrack] = await Promise.all([
      loadImageAssets(spriteAssets),
      loadImageAssets(textureAssets),
      loadAudioAssets(soundAssets, audio),
      loadAudioAssets(soundtrackAssets, audio)
    ]);
    const spawn = mapdata.entities.find(
      entity => entity.type === "PLAYER_SPAWN"
    );
    const ship = Ship({ ...spawn.position });
    console.log(ship);
    const bullets = [];
    const soundQueue = [mapdata.soundtrack];
    const state = {
      ship,
      bullets,
      soundQueue,
      map: mapdata,
      assets: {
        sprites,
        textures,
        sounds: {
          ...sounds,
          ...soundtrack
        }
      }
    };

    return state;
  };
  loadLevel(
    "01",
    spriteAssets,
    textureAssets,
    soundAssets,
    soundtrackAssets
  ).then(state => {
    const now = performance.now();
    const timer = GameTime(now, now, Tickrate);
    const loop = Loop({ keyboard, video, audio });
    const tick = Tick(state, loop, timer);
    requestAnimationFrame(tick);
  });
};
