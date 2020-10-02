const start = () => {
  const program = require('commander');
  const fs = require('fs');
  const path = require('path');
  const { actions } = require('./caesar');

  const values = {};

  program
    .storeOptionsAsProperties(false)
    .passCommandToAction(false)
    .version('1.0.0', '-v, --version', 'output the current version')
    .option('-s, --shift <shift>', 'Shift (integer)')
    .option('-i, --input <input>', 'A path for the input file')
    .option('-a, --action <action>', 'An action for the data')
    .option('-o, --output <output>', 'A path for the output file')
    .option('-d, --debug')
    .action((options) => {
      values.shift = parseInt(options.shift, 10);
      values.input = options.input;
      values.output = options.output;
      values.action = options.action;

      if (!options.shift || values.shift < 0) {
        console.error('A shift should be provided, to be a number and not to be negative.');
        process.exit(1);
      }

      if (values.action !== actions.encode && values.action !== actions.decode) {
        console.error('An action should be provided and equal to "encode" or "decode".');
        process.exit(1);
      }

      if (values.input) {
        try {
          const filePath = path.join(__dirname, '..', values.input);
          fs.open(filePath, fs.constants.F_OK, (err) => {
            if (err) {
              console.error(`The file "${filePath}" can not be open.`);
              process.exit(1);
            }
          });
        } catch (error) {
          console.log(error)
          console.error(`The file "${values.input}" is not find.`);
          process.exit(1);
        }
      }

      if (values.output) {
        try {
          const filePath = path.join(__dirname, '..', values.output);
          fs.open(filePath, fs.constants.F_OK, (err) => {
            if (err) {
              console.error(`The file "${values.output}" can not be open.`);
              process.exit(1);
            }
          });
        } catch (error) {
          console.error(`The file "${values.output}" is not find.`);
          process.exit(1);
        }
      }
    })
    .parse(process.argv);

  return values;
}

const values = start();

const getInput = () => {
  return values.input;
}

const getOutput = () => {
  return values.output;
}

const getShift = () => {
  return values.shift;
}

const getAction = () => {
  return values.action;
}

module.exports = {
  getInput,
  getOutput,
  getShift,
  getAction,
};