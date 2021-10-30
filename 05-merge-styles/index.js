const { writeFile, readdir, readFile } = require('fs/promises');
const { appendFile } = require('fs');
const { join, parse } = require('path');

writeFile(join(__dirname, 'project-dist' ,'bundle.css'), '');

readdir(join(__dirname, 'styles'))
  .then(
    files => {
      for (let i of files) {
        const ext = parse(join(__dirname, 'styles', i)).ext;
        if (ext == '.css') {
          readFile(join(__dirname, 'styles', i))
            .then (data => appendFile(join(__dirname, 'project-dist' ,'bundle.css'), data, er => er));
        }
      }
    }
  );