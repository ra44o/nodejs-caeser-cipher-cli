const fileCanNotBeOpen = (filePath) => `The file "${filePath}" can not be open.`;
const shiftShouldBeProvided = 'A shift should be provided, to be an integer between 0 and 26.';
const actionShouldBeProvided = 'An action should be provided and equal to "encode" or "decode".';
const pressCtrlCForExit = 'Press Ctrl+C for exit.';

module.exports = {
  fileCanNotBeOpen,
  shiftShouldBeProvided,
  actionShouldBeProvided,
  pressCtrlCForExit,
};
