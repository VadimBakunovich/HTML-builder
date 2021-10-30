const { readdir, stat } = require('fs/promises');
const { join, parse } = require('path');

readdir(join(__dirname, 'secret-folder'))
  .then(
    files => {
      for (let i of files) {
        stat(join(__dirname, 'secret-folder', i))
          .then(
            stats => {
              if (stats.isFile()) {
                const name = parse(join(__dirname, 'secret-folder', i)).name;
                const ext = parse(join(__dirname, 'secret-folder', i)).ext.slice(1);
                const size = (stats.size / 1024).toFixed(3);
                console.log(`${name} - ${ext} - ${size}kb`);
              }
            }
          );
      }
    }
  );