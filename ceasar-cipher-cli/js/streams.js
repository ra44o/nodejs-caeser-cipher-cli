const { pipeline } = require('stream');
const fs = require('fs');
const path = require('path');

const { getShift, getAction } = require('./validate-arguments');
const { CustomTransform } = require('./transform');

const transformStream = new CustomTransform(getShift(), getAction());

const data = (inputFilePath, outputFilePath) => {
  let input;
  let output;
  if (inputFilePath) {
    const p = path.join(__dirname, '..', inputFilePath)
    // console.log(1, p);
    input = fs.createReadStream(p, { encoding: 'utf8' });
  } else {
    input = process.stdin;
  }

  if (outputFilePath) {
    output = fs.createWriteStream(path.join(__dirname, outputFilePath), { flags: 'a+', encoding: 'utf8' });
  } else {
    output = process.stdout;
  }

  pipeline(
    input,
    transformStream,
    output,
    error => {
      if (error) {
        console.error(`Failed: ${error}`);
      } else {
        console.log('Succeed');
        process.exit(1);
      }
    }
  );
}

module.exports = {
  data,
};