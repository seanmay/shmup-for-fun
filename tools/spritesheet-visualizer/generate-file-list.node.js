const fs = require("fs").promises;

const basepath = "../../assets/sprites/Remastered Tyrian Graphics";
fs.readdir(basepath)
  .then(dir => dir.filter(path => path.split(".").pop() === "png"))
  .then(files => files.map(path => ({ name: path, url: `${basepath}/${path}`})))
  .then(files => fs.writeFile(`spritesheets.json`, JSON.stringify(files), 'utf8'))
  .catch(err => console.log(err));