const { rm, mkdir, readdir, stat, copyFile } = require('fs/promises');
const { join } = require('path');

async function copyRecursive(src, dest) {
  const stats = await stat(src);
  const isDirectory = stats.isDirectory();
  if (isDirectory) {
    await mkdir(dest, { recursive: true });
    const items = await readdir(src);
    for (const item of items) {
      copyRecursive(join(src, item), join(dest, item));
    }
  } else await copyFile(src, dest);
}

async function copyDir(src, dest) {
  await rm(dest, { recursive: true, force: true });
  copyRecursive(src, dest);
}

copyDir(join(__dirname, 'files'), join(__dirname, 'files-copy'));