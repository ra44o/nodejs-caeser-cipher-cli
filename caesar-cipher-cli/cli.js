const program = require('commander');
const fs = require('fs');
const path = require('path');
const { actions, encodeDecode } = require('./js/caesar');

const runAction = (options) => {
  if (options.shift && options.shift >= 0 && options.action && typeof options.action === 'string') {
    if (options.input) {
      fs.open(path.join(__dirname, options.input), fs.constants.F_OK, (err) => {
        if (!err) {
          fs.readFile(path.join(__dirname, options.input), { encoding: 'utf8' }, (err, data) => {
            if (!err) {
              if (options.output) {
                fs.open(path.join(__dirname, options.output), fs.constants.F_OK, async (err) => {
                  if (!err) {
                    fs.appendFile(path.join(__dirname, options.output), encodeDecode(data, parseInt(options.shift, 10), options.action), (err) => {
                      if (err) {
                        console.error(err);
                      }
                    });
                    console.info(`The ${options.action === actions.encode ? 'encoded' : 'decoded'} data saved into: ${path.join(__dirname, options.output)}`);
                  } else {
                    console.error(`The file ${options.output} is not find.`);
                  }
                });
              } else {
                console.log(`${options.action === actions.encode ? 'Encoded' : 'Decoded'} data:`, encodeDecode(data, parseInt(options.shift, 10), options.action));
              }
            }
          });
        } else {
          console.error(`The file ${options.input} is not find.`);
        }
      });
    } else {
      console.log('Enter text here:');
      process.stdin.on('readable', () => {
        const data = process.stdin.read();
        if (data && (data == 'Ctrl+C\n' || data == 'Ctrl+C')) {
          process.stdin.end();
        } else {
          console.log(`${options.action === actions.encode ? 'Encoded' : 'Decoded'} data:`, encodeDecode(data, parseInt(options.shift, 10), options.action, true));
          process.stdin.resume();
        }
      });
    }
  } else if (!options.shift && !options.action) {
    console.error('A shift and an action should be provided.');
  } else if (!options.shift || options.shift < 0) {
    console.error('A shift should be provided, to be a number and not to be negative.');
  } else if (!options.action || options.action !== actions.encode || options.action !== actions.decode) {
    console.error('An action should be provided and equal to "encode" or "decode".');
  }

  if (options.debug) {
    console.log(options.opts());
  }
}

program
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .version('1.0.0', '-v, --vers', 'output the current version')
  .option('-s, --shift <shift>', 'Shift (integer)')
  .option('-i, --input <input>', 'A path for the input file')
  .option('-a, --action <action>', 'An action for the data')
  .option('-o, --output <output>', 'A path for the output file')
  .option('-d, --debug')
  .action(options => runAction(options))
  .parse(process.argv);
