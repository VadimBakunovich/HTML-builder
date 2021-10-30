const { mkdir, unlink, copyFile } = require('fs/promises');
const { readdir } = require('fs');
const { join } = require('path');

(function copyDir() {
  mkdir(join(__dirname, 'files-copy'), { recursive: true })
    .then(() => {
      readdir(join(__dirname, 'files-copy'),
        (err, files) => {
          if (err) throw err;
          if (files.length) {
            for (let i of files) unlink(join(__dirname, 'files-copy', i));
          }
        }
      );
      readdir(join(__dirname, 'files'),
        (err, files) => {
          if (err) throw err;
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