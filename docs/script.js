const path = require('path');
const fs = require('fs');

const getImportPath = (filePath) => {
  const dirCount = filePath.split(path.sep).length;
  let relativePath = '';
  if (dirCount === 1) {
    relativePath += './';  // for the root directory
  } else {
    for (let i = 1; i < dirCount; i++) { // start from 2 to consider /docs as root
      relativePath += '../';
    }
  }
  relativePath += 'components/IframeComponent';
  return `import IframeComponent from '${relativePath}';\n\n`;
};


const addComponent = (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const importStatement = getImportPath(filePath);
  const newFileContent = importStatement + fileContent + '\n<IframeComponent />\n';
  fs.writeFileSync(filePath, newFileContent, 'utf8');
};

const searchDir = (dirPath) => {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      searchDir(filePath);
    } else if (path.extname(filePath) === '.md' || path.extname(filePath) === '.mdx') {
      addComponent(filePath);
    }
  });
};

const rootPath = './';
searchDir(rootPath);
