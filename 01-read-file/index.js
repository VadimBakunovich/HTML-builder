const { createReadStream } = require('fs');
const { join } = require('path');

const stream = createReadStream(join(__dirname, 'text.txt'), 'utf8');

stream.on('data', data => console.log(data.trim()));