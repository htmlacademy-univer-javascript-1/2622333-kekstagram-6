const isEnough = (line, length) => line.length <= length;

console.log(isEnough('Cat loves me', 15));
console.log(isEnough('Truth is a lie', 20));
console.log(isEnough('I am studying', 8));

function isPalindrome(word) {
  const string = word.replaceAll(' ', '').toLowerCase();
  for (let i = 0; i < string.length/2; i++) {
    if (string[i] === string[string.length - i - 1]) {
      return true;
    }
  }
  return false;
}

console.log(isPalindrome('топот'));
console.log(isPalindrome('ДовОд'));
console.log(isPalindrome('Кекс'));
console.log(isPalindrome('Лёша на полке клопа нашёл '));

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

console.log(isNumber('2023 год'));            // 2023
console.log(isNumber('ECMAScript 2022'));     // 2022
console.log(isNumber('1 кефир, 0.5 батона')); // 105
console.log(isNumber('агент 007'));           // 7
console.log(isNumber('а я томат'));
console.log(isNumber(2023));
console.log(isNumber(-1));
console.log(isNumber(1.5));

