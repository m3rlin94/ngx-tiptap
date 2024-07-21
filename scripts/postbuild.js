const fs = require('node:fs');
const path = require('node:path');
const color = require('picocolors');

const copyFile = async function (srcFilePath, destFilePath) {
  const fileName = path.basename(srcFilePath);
  try {
    const srcPath = path.resolve(process.cwd(), srcFilePath);
    const destPath = path.resolve(process.cwd(), 'dist/ngx-tiptap', destFilePath);
    await fs.promises.copyFile(srcPath, destPath);
    console.log(color.green(`- File Copied: ${fileName}`));
  } catch (err) {
    console.log(color.red(`Error while copying ${fileName}`), err);
  }
};

copyFile('netlify.toml', 'netlify.toml');
copyFile('README.md', 'README.md');
copyFile('LICENSE', 'LICENSE');
copyFile('CHANGELOG.md', 'CHANGELOG.md');
