const { readdir } = require('fs/promises');
const { stat } = require('fs');
const { join, parse } = require('path');

readdir(join(__dirname, 'secret-folder'))
  .then(
    res => {
      for (let i of res) {
        stat(join(__dirname, 'secret-folder', i), (err, stats) => {
          if (err) throw err;
          if (stats.isFile()) {
            const name = parse(join(__dirname, 'secret-folder', i)).name;
            const ext = parse(join(__dirname, 'secret-folder', i)).ext.slice(1);
            const size = (stats.size / 1024).toFixed(3);
            console.log(`${name} - ${ext} - ${size}kb`);
          }
        });
      }
    },
    err => console.log(err)
  );