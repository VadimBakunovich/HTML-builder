const fs = require('fs');
const path = require('path');
const { stdin } = process;

console.log('Input text to write to the file:');

const stream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdin.on('data', data => data.toString().trim() == 'exit' ? process.exit() : stream.write(data));

process.on('SIGINT', process.exit);

process.on('exit', () => console.log(`The created file is located here ${path.join(__dirname, 'text.txt')}`));