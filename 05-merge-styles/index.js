const fs = require('fs/promises');
const path = require('path');
const stylesFolder = path.join(__dirname, 'styles');
const outputFolder = path.join(__dirname, 'project-dist');
const outputFile = path.join(outputFolder, 'bundle.css');

async function summStyles() {
  try {
    await fs.writeFile(outputFile, '', 'utf-8');
    const files = await fs.readdir(stylesFolder, { withFileTypes: true });
    for (const file of files) {
      const filePath = path.join(stylesFolder, file.name);
      if (path.extname(file.name) === '.css' && file.isFile()) {
        const content = await fs.readFile(filePath, 'utf-8');
        await fs.appendFile(outputFile, content + '\n', 'utf-8');
      }
    }
  } catch (error) {
    console.error('Woops, something went wrong! Error:', error);
  }
}

summStyles();
