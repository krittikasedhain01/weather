const JSZip = require("jszip");
const fs = require("fs");

const zip = new JSZip();

function* getSync(dir) {
  const files = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(function (file) {
      return !/bin|etc|dev|node_modules|\.git|\.swc|\.next|out/.test(file.name);
    });
  for (const file of files) {
    if (file.isDirectory()) {
      yield* getSync(dir + "/" + file.name);
    } else {
      console.log(dir + "/" + file.name);
      yield dir + "/" + file.name;
    }
  }
}

try {
  const filePaths = getSync(".");
  for (const filePath of filePaths) {
    const fileData = fs.readFileSync(filePath);
    zip.file(filePath, fileData);
  }

  zip
    .generateNodeStream({ streamFiles: true })
    .pipe(fs.createWriteStream("assesment.zip"));
} catch (err) {
  console.error(err);
}
