const fs = require('fs').promises;
const path = require('path');
const projectDist = path.join(__dirname, 'project-dist');
const templateFile = path.join(__dirname, 'template.html');
const componentsFolder = path.join(__dirname, 'components');
const stylesFolder = path.join(__dirname, 'styles');
const assetsFolder = path.join(__dirname, 'assets');
const outputHtmlFile = path.join(projectDist, 'index.html');
const outputCssFile = path.join(projectDist, 'style.css');
const outputAssetsFolder = path.join(projectDist, 'assets');

async function createFolder() {
  try {
    await fs.mkdir(projectDist, { recursive: true });
  } catch (error) {
    console.error('Ащибка!! А-та-та!', error);
  }
}

async function createHtml() {
  try {
    let template = await fs.readFile(templateFile, 'utf-8');
    const components = await fs.readdir(componentsFolder, {
      withFileTypes: true,
    });
    for (const component of components) {
      if (component.isFile() && path.extname(component.name) === '.html') {
        const componentContent = await fs.readFile(
          path.join(componentsFolder, component.name),
          'utf-8',
        );
        const tagName = `{{${path.basename(component.name, '.html')}}}`;
        template = template.replace(new RegExp(tagName, 'g'), componentContent);
      }
    }
    await fs.writeFile(outputHtmlFile, template);
  } catch (error) {
    console.error('Еррор!', error);
  }
}

async function summStyles() {
  try {
    const files = await fs.readdir(stylesFolder, { withFileTypes: true });
    const styles = [];
    for (const file of files) {
      if (file.isFile() && path.extname(file.name) === '.css') {
        const content = await fs.readFile(
          path.join(stylesFolder, file.name),
          'utf-8',
        );
        styles.push(content);
      }
    }

    await fs.writeFile(outputCssFile, styles.join('\n'));
  } catch (error) {
    console.error('Другой еррор!', error);
  }
}

async function copyAssets(src, dest) {
  try {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        await copyAssets(srcPath, destPath);
      } else if (entry.isFile()) {
        await fs.copyFile(srcPath, destPath);
      }
    }
  } catch (error) {
    console.error('Да сколько тут ошибок!?', error);
  }
}

async function createPage() {
  try {
    await createFolder();
    await createHtml();
    await summStyles();
    await copyAssets(assetsFolder, outputAssetsFolder);
  } catch (error) {
    console.error(
      'Опять ничего не получается! И так тоже не получается! Ну и пожалуйста, блять! Ну и пошло всё в п... (мем)',
      error,
    );
  }
}

createPage();
