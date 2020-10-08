const fs = require('fs');
const program = require('commander');

const CustomTransform = require('./transform');
const { fileCanNotBeOpen, pressCtrlCForExit, shiftShouldBeProvided, actionShouldBeProvided } = require('./messages');
const { actions } = require('./caesar');

program
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .version('1.0.0', '-v, --version', 'output the current version')
  .option('-s, --shift <shift>', 'Shift (integer)')
  .option('-i, --input <input>', 'A path for the input file')
  .option('-a, --action <action>', 'An action for the data')
  .option('-o, --output <output>', 'A path for the output file')
  .option('-d, --debug')
  .parse(process.argv);

const options = program.opts();

if (!options.shift || !options.shift.match('^([2]{1}[0-6]{1}|[0-1]{1}[0-9]{0,1}|[0-9]{1})$')) {
  console.error(shiftShouldBeProvided);
  process.exit(1);
}

if (options.action !== actions.encode && options.action !== actions.decode) {
  console.error(actionShouldBeProvided);
  process.exit(1);
}

const getInputStream = () => new Promise(resolve => {
  if (options.input) {
    fs.access(options.input, fs.constants.R_OK, error => {
      if (error) {
        console.error(fileCanNotBeOpen(options.input));
        process.exit(1);
      }
      resolve(fs.createReadStream(options.input, { encoding: 'utf-8' }));
    })
  } else {
    console.info(pressCtrlCForExit);
    resolve(process.stdin);
  }
});

const getOutputStream = () => new Promise(resolve => {
  if (options.output) {
    fs.access(options.output, fs.constants.W_OK, error => {
      if (error) {
        console.error(fileCanNotBeOpen(options.output));
        process.exit(1);
      }
      resolve(fs.createWriteStream(options.output, { flags: 'a+', encoding: 'utf-8' }));
    });
  } else {
    resolve(process.stdout);
  }
});

const getTransformStream = () => new Promise(resolve => {
  const shift = Number.parseInt(options.shift, 10);

  resolve(new CustomTransform(shift, options.action));
});

module.exports = {
  getInputStream,
  getTransformStream,
  getOutputStream,
};