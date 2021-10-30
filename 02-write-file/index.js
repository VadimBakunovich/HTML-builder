const { createWriteStream } = require('fs');
const { join } = require('path');
const { stdin, exit } = process;

console.log('Input text to write to the file:');

const stream = createWriteStream(join(__dirname, 'text.txt'));

stdin.on('data', data => data.toString().trim() == 'exit' ? exit() : stream.write(data));

process.on('SIGINT', exit);

process.on('exit', () => console.log(`The created file is located here ${join(__dirname, 'text.txt')}`));