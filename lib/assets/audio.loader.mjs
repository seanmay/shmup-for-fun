import { loadBinary } from "./binary.loader.mjs";
import { loadAssets } from "./asset.loader.mjs";

export const loadAudio = context => src =>
  loadBinary(src).then(buffer => context.decodeAudioData(buffer));

export const loadAudioAssets = (assets, context) => loadAssets(loadAudio(context))(assets);