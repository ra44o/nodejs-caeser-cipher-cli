const { getInputStream, getTransformStream, getOutputStream } = require('./js/streams');
const { pipeline } = require('stream');

const start = async () => {
  pipeline(
    await getInputStream(),
    await getTransformStream(),
    await getOutputStream(),
    error => {
      if (error) {
        console.error(`Failed: ${error}`);
      } else {
        console.log('Succeed!');
      }
    }
  );
}

start();
