const { readdir, stat } = require('fs/promises');
const { join, parse } = require('path');

async function getFilesInfo(folderPath) {
  const items = await readdir(folderPath);
  if (items.length) {
    for (let item of items) {
      const stats = await stat(join(folderPath, item));
      if (stats.isFile()) {
        const name = parse(item).name;
        const ext = parse(item).ext.slice(1);
        console.log(`${name} - ${ext} - ${stats.size} byte`);
      }
    }
  }
}

getFilesInfo(join(__dirname, 'secret-folder'));