const fs = require('fs/promises');
const path = require('path');
const folderPath = path.join(__dirname, 'files-copy');

async function deleteFolder(folderPath) {
  try {
    await fs.access(folderPath);
    await fs.rm(folderPath, { recursive: true, force: true });
  } catch (err) {
    console.log('Done');
  }
}
deleteFolder(folderPath);

async function copy() {
  try {
    const sourceDir = path.join(__dirname, 'files');
    const targetDir = path.join(__dirname, 'files-copy');
    await fs.mkdir(targetDir, { recursive: true });
    const files = await fs.readdir(sourceDir);
    for (const file of files) {
      const sourceFilePath = path.join(sourceDir, file);
      const targetFilePath = path.join(targetDir, file);
      const stats = await fs.stat(sourceFilePath);
      if (stats.isFile()) {
        await fs.copyFile(sourceFilePath, targetFilePath);
      }
    }
  } catch (error) {
    console.error('Something`s wrong! Error:', error);
  }
}
copy();
