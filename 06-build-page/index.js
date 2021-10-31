const { rm, mkdir, readdir, copyFile, readFile, writeFile, appendFile, stat } = require('fs/promises');
const { join, parse } = require('path');

async function createHtml() {
  let template = await readFile(join(__dirname, 'template.html'), { encoding: 'utf8' });
  const files = await readdir(join(__dirname, 'components'));
  if (files.length) {
    for (const file of files) {
      const name = parse(join(__dirname, 'secret-folder', file)).name;
      const ext = parse(join(__dirname, 'secret-folder', file)).ext;
      if (ext == '.html' && template.includes(`{{${name}}}`)) {
        const data = await readFile(join(__dirname, 'components', file), { encoding: 'utf8' });
        template = template.replace(`{{${name}}}`, data);
      }
    }
  }
  await writeFile(join(__dirname, 'project-dist' ,'index.html'), template);
}

async function createStyles() {
  const files = await readdir(join(__dirname, 'styles'));
  if (files.length) {
    for (const file of files) {
      const ext = parse(join(__dirname, 'styles', file)).ext;
      if (ext == '.css') {
        const data = await readFile(join(__dirname, 'styles', file));
        await appendFile(join(__dirname, 'project-dist' ,'style.css'), data);
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

rm(join(__dirname, 'project-dist'), { recursive: true, force: true })
  .then(() => mkdir(join(__dirname, 'project-dist'), { recursive: true }))
  .then(() => createHtml())
  .then(() => createStyles())
  .then(() => copyAssets(join(__dirname, 'assets'), join(__dirname, 'project-dist', 'assets')));