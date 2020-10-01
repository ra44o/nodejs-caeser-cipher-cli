const upperCaseStartChar = 65;
const upperCaseEndChar = 90;
const lowerCaseStartChar = 97;
const lowerCaseEndChar = 122;
const alphabetLength = 26;

const actions = {
  encode: 'encode',
  decode: 'decode',
};

const isUpperCaseChar = (charCode) => {
  return charCode >= upperCaseStartChar && charCode <= upperCaseEndChar;
}

const isLowerCaseChar = (charCode) => {
  return charCode >= lowerCaseStartChar && charCode <= lowerCaseEndChar;
}

const caesarEncode = (text, shift) => {
  return text.split('').map(char => {
    const charCode = char.charCodeAt();
    if (isUpperCaseChar(charCode) || isLowerCaseChar(charCode)) {
      // encode
      if (isUpperCaseChar(charCode)) {
        // uppercase
        return String.fromCharCode((charCode - upperCaseStartChar + shift) % alphabetLength + upperCaseStartChar);
      }
      // lowercase
      return String.fromCharCode((charCode - lowerCaseStartChar + shift) % alphabetLength + lowerCaseStartChar);
    }
    return char;
  }).join('');
};

const caesarDecode = (text, shift) => {
  return text.split('').map(char => {
    const charCode = char.charCodeAt();
    if (isUpperCaseChar(charCode) || isLowerCaseChar(charCode)) {
      // decode
      if (isUpperCaseChar(charCode)) {
        // uppercase
        if (charCode > upperCaseStartChar - shift && charCode < upperCaseStartChar + shift) {
          return String.fromCharCode((charCode - upperCaseStartChar - shift) % alphabetLength + upperCaseStartChar + alphabetLength);
        }
        return String.fromCharCode((charCode - upperCaseStartChar - shift) % alphabetLength + upperCaseStartChar);
      } else {
        // lowercase
        if (charCode > lowerCaseStartChar - shift && charCode < lowerCaseStartChar + shift) {
          return String.fromCharCode((charCode - lowerCaseStartChar - shift) % alphabetLength + lowerCaseStartChar + alphabetLength);
        }
        return String.fromCharCode((charCode - lowerCaseStartChar - shift) % alphabetLength + lowerCaseStartChar);
      }
    }
    return char;
  }).join('');
}

function str2ab(str) {
  const buf = Buffer.from(str, str.length);
  const bufView = new Uint8Array(buf);
  for (var i=0, strLen=str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return bufView;
}

function encodeDecode(data, shift, action, isBuffer = false) {
  isBuffer ? data = String.fromCharCode.apply(null, new Uint8Array(data)) : null;
  if (action) {
    if (action === actions.encode) {
      return caesarEncode(data, shift);
    } else {
      return caesarDecode(data, shift);
    }
  } else {
    throw 'An \"Act\" parameter should be provided.';
  }
}

function encodeDecodeAsync(data, shift, action) {
  const text = String.fromCharCode.apply(null, new Uint8Array(data));
  if (action) {
    if (action === actions.encode) {
      return str2ab(caesarEncode(text, shift));
    } else {
      return str2ab(caesarDecode(text, shift));
    }
  } else {
    console.error('An \"Act\" parameter should be provided.');
    return;
  }
}

module.exports = {
  actions,
  encodeDecode,
  encodeDecodeAsync,
};
