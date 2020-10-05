const { pipeline } = require('stream');
const fs = require('fs');
const path = require('path');

const { getShift, getAction } = require('./validate-arguments');
const { CustomTransform } = require('./transform');

const transformStream = new CustomTransform(getShift(), getAction());

const data = (inputFilePath, outputFilePath) => {
  let inputStream;
  let outputStream;
  if (inputFilePath) {
    const filePath = path.resolve(__dirname, '..', inputFilePath)
    inputStream = fs.createReadStream(filePath, { encoding: 'utf8' });
  } else {
    inputStream = process.stdin;
  }

  if (outputFilePath) {
    const filePath = path.resolve(__dirname, '..', outputFilePath)
    outputStream = function() { 
      console.log(`The result of the action will be written into: ${filePath}\n`);
      return fs.createWriteStream(filePath, { flags: 'a+', encoding: 'utf8' });
    };
  } else {
    outputStream = function() {
      return process.stdout;
    };
  }

  pipeline(
    inputStream,
    transformStream,
    outputStream(),
    error => {
      if (error) {
        console.error(`Failed: ${error}`);
      } else {
        console.log('Succeed');
      }
    }
  );
}

module.exports = {
  data,
};