const { mkdir, readdir, unlink, copyFile } = require('fs/promises');
const { join } = require('path');

(function copyDir() {
  mkdir(join(__dirname, 'files-copy'), { recursive: true })
    .then(() => {
      return readdir(join(__dirname, 'files-copy'))
        .then(
          files => {
            if (files.length) {
              for (let i of files) unlink(join(__dirname, 'files-copy', i));
            }
          }
        );
    })
    .then(() => {
      readdir(join(__dirname, 'files'))
        .then(
          files => {
            if (files.length) {
              for (let i of files) {
                const srcPath = join(__dirname, 'files', i);
                const destPath = join(__dirname, 'files-copy', i);
                copyFile(srcPath, destPath);
              }
            }
          }
        );
    });
})();