/* eslint-disable no-unused-vars */
function getLength(string, length) {
  return string.length <= length;
}

function isPalindrome(string) {
  const normalizedString = string.toLowerCase().replaceAll(' ', '');
  const reversedString = normalizedString.split('').reverse().join('');
  return reversedString === normalizedString;
}

function isNumber(phrase) {
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
  return result.length === 0 ? NaN : result;
}
