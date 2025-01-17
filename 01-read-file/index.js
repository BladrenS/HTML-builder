const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(filePath, { encoding: 'utf-8' });

readStream.on('data', (part) => {
  process.stdout.write(part);
});
