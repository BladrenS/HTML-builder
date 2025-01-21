const fs = require('fs');
const path = require('path');
const readline = require('readline');
const filePath = path.join(__dirname, 'output.txt');
const writeStream = fs.createWriteStream(filePath, { flags: 'a' });
const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Hello! Ola! Write you message here! :)');

readLine.on('line', (input) => {
  if (input.trim().toLowerCase() === 'exit') {
    exitTask();
  } else {
    writeStream.write(`${input}\n`);
    console.log('Got it! Write your next message or type "exit" to leave.');
  }
});

readLine.on('close', handleCtrlC);
function handleCtrlC() {
  console.log('That`s all? I`ll be glad to see you again! See ya! :)');
  writeStream.end(() => {
    readLine.close();
  });
}

function exitTask() {
  console.log('That`s all? I`ll be glad to see you again! See ya! :)');
  readLine.close();
  writeStream.end(() => process.exit());
}
