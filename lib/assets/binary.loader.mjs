import { loadAssets } from "./asset.loader.mjs";

export const loadBinary = (src) =>
  fetch(src).then(res => res.ok ? res.arrayBuffer() : Promise.reject(res));

export const loadBinaryAssets = loadAssets(loadBinary);