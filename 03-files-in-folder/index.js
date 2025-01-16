const fs = require('fs/promises');
const path = require('path');

async function getInfo() {
  try {
    const folderPath = path.join(__dirname, 'secret-folder');
    const files = await fs.readdir(folderPath, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile()) {
        const filePath = path.join(folderPath, file.name);
        const stats = await fs.stat(filePath);
        const fileSize = stats.size / 1024;
        const fileType = path.extname(file.name).slice(1);
        const fileName = path.basename(file.name, path.extname(file.name));
        console.log(`${fileName} - ${fileType} - ${fileSize.toFixed(4)}kb`);
      }
    }
  } catch (error) {
    console.error('Error! Seems like nothing to read! Error:', error);
  }
}
getInfo();
