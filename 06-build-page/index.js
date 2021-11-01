const { rm, mkdir, readdir, copyFile, readFile, writeFile, appendFile, stat } = require('fs/promises');
const { join, parse } = require('path');

async function createHtml(src, dest) {
  let template = await readFile(dest, { encoding: 'utf8' });
  const files = await readdir(src);
  if (files.length) {
    for (const file of files) {
      const name = parse(join(src, file)).name;
      const ext = parse(join(src, file)).ext;
      if (ext == '.html' && template.includes(`{{${name}}}`)) {
        const data = await readFile(join(src, file), { encoding: 'utf8' });
        template = template.replace(`{{${name}}}`, data);
      }
    }
  }
  writeFile(join(__dirname, 'project-dist' ,'index.html'), template);
}

async function createStyles(src, dest) {
  const files = await readdir(src);
  if (files.length) {
    for (const file of files) {
      const ext = parse(join(src, file)).ext;
      if (ext == '.css') {
        const data = await readFile(join(src, file));
        await appendFile(dest, data);
      }
    }
  }
}

async function copyAssets(src, dest) {
  const stats = await stat(src);
  const isDirectory = stats.isDirectory();
  if (isDirectory) {
    await mkdir(dest, { recursive: true });
    const files = await readdir(src);
    for (const file of files) {
      copyAssets(join(src, file), join(dest, file));
    }
  } else await copyFile(src, dest);
}

async function buildPage() {
  await rm(join(__dirname, 'project-dist'), { recursive: true, force: true });
  await mkdir(join(__dirname, 'project-dist'), { recursive: true });
  createHtml(join(__dirname, 'components'), join(__dirname, 'template.html'));
  createStyles(join(__dirname, 'styles'), join(__dirname, 'project-dist' ,'style.css'));
  copyAssets(join(__dirname, 'assets'), join(__dirname, 'project-dist', 'assets'));
}

buildPage();