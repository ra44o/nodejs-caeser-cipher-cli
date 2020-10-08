const { Transform } = require('stream');
const { encodeDecodeAsync } = require('./caesar');

class CustomTransform extends Transform {
  constructor(shift, action) {
    super();
    this.shift = shift;
    this.action = action;
  }

  _transform(chunk, encoding, done) {
    try {
      this.push(encodeDecodeAsync(chunk, this.shift, this.action), encoding);
      done();
    } catch (error) {
      done(error);
    }
  }
}

module.exports = CustomTransform;
