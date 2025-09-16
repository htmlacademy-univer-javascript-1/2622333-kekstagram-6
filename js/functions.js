const isEnough = (line, length) => line.length <= length;

function isPalindrome(word) {
  const string = word.replaceAll(' ', '').toLowerCase();
  for (let i = 0; i < string.length/2; i++) {
    if (string[i] === string[string.length - i - 1]) {
      return true;
    }
  }
  return false;
}

function isNumber (phrase) {
  let result = '';
  const string = phrase.toString().replaceAll(' ', '');
  for (let i = 0; i < string.length; i++) {
    const digit = Number(string[i]);
    if ((result.length === 0) & (digit === 0)) {
      continue;
    } if (!Number.isNaN(digit)) {
      result += digit;
    }
  }
  if (result.length === 0) {
    return NaN;
  }
  return result;
}
