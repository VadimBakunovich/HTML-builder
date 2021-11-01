const { readdir, stat } = require('fs/promises');
const { join, parse } = require('path');

async function getFilesInfo(folderPath) {
  const items = await readdir(folderPath);
  if (items.length) {
    for (let i of items) {
      const stats = await stat(join(folderPath, i));
      if (stats.isFile()) {
        const name = parse(join(folderPath, i)).name;
        const ext = parse(join(folderPath, i)).ext.slice(1);
        console.log(`${name} - ${ext} - ${stats.size} byte`);
      }
    }
  }
}

getFilesInfo(join(__dirname, 'secret-folder'));