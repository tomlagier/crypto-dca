//Includes and runs all files in a directory
const { readdirSync } = require('fs');
const { join, resolve } = require('path');

const root = resolve(join(__dirname, '../'));

module.exports = dir => {
  const files = readdirSync(`${root}/${dir}`)
  files.forEach(file =>
    require(join(root, dir, file))
  );
}