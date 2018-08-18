export const loadAsset = (load) => (name, src) =>
  load(src).then(data => ({ name, data }));

const spread = (f) => (args) => f(...args);

export const loadAssets = (load) => (assetMap) => {
  const assets = Object.entries(assetMap).map(spread(loadAsset(load)));
  const loading = Promise.all(assets);

  return loading.then(assets => assets.reduce((obj, asset) => {
    obj[asset.name] = asset;
    return obj;
  }, {}));
};