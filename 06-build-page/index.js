const { rm, mkdir, readdir, copyFile, readFile, writeFile, appendFile, stat } = require('fs/promises');
const { join, parse } = require('path');

async function createHtml(compPath, templPath, dest) {
  let template = await readFile(templPath, { encoding: 'utf8' });
  const items = await readdir(compPath);
  if (items.length) {
    for (const item of items) {
      const stats = await stat(join(compPath, item));
      if (stats.isFile()) {
        const name = parse(item).name;
        const ext = parse(item).ext;
        if (ext == '.html' && template.includes(`{{${name}}}`)) {
          const data = await readFile(join(compPath, item), { encoding: 'utf8' });
          template = template.replace(`{{${name}}}`, data);
        }
      }
    }
  }
  writeFile(dest, template);
}

async function createStyles(src, dest) {
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

async function copyAssets(src, dest) {
  const stats = await stat(src);
  const isDirectory = stats.isDirectory();
  if (isDirectory) {
    await mkdir(dest, { recursive: true });
    const items = await readdir(src);
    for (const item of items) {
      copyAssets(join(src, item), join(dest, item));
    }
  } else await copyFile(src, dest);
}

async function buildPage() {
  await rm(join(__dirname, 'project-dist'), { recursive: true, force: true });
  await mkdir(join(__dirname, 'project-dist'), { recursive: true });
  createHtml(join(__dirname, 'components'), join(__dirname, 'template.html'), join(__dirname, 'project-dist' ,'index.html'));
  createStyles(join(__dirname, 'styles'), join(__dirname, 'project-dist' ,'style.css'));
  copyAssets(join(__dirname, 'assets'), join(__dirname, 'project-dist', 'assets'));
}

buildPage();