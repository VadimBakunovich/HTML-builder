const { writeFile, readdir, stat, readFile, appendFile } = require('fs/promises');
const { join, parse } = require('path');

async function mergeStyles(src, dest) {
  await writeFile(dest, '');
  const items = await readdir(src);
  if (items.length) {
    for (let item of items) {
      const stats = await stat(join(src, item));
      const ext = parse(join(src, item)).ext;
      if (stats.isFile() && ext == '.css') {
        const data = await readFile(join(src, item));
        await appendFile(dest, data);
      }
    }
  }
}

mergeStyles(join(__dirname, 'styles'), join(__dirname, 'project-dist' ,'bundle.css'));