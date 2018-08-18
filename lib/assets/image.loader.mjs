import { loadAssets } from "./asset.loader.mjs";

export const loadImage = (src) => new Promise((resolve, reject) => {
  const image = new Image();
  image.onload = () => resolve(image);
  image.onerror = reject;
  image.src = src;
});

export const loadImageAssets = loadAssets(loadImage);