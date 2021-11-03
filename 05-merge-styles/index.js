const { writeFile, readdir, stat, readFile, appendFile } = require('fs/promises');
const { join, parse } = require('path');

async function mergeStyles(src, dest) {
  await writeFile(dest, '');
  const items = await readdir(src);
  if (items.length) {
    for (const item of items) {
      const stats = await stat(join(src, item));
      if (stats.isFile()) {
        const ext = parse(item).ext;
        if (ext == '.css') {
          const data = await readFile(join(src, item));
          await appendFile(dest, data);
        }
      }
    }
  }
}

mergeStyles(join(__dirname, 'styles'), join(__dirname, 'project-dist' ,'bundle.css'));