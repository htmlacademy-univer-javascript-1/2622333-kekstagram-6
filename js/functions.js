function isEnough(line, length) {
  if (line.length <= length) {
    return true;
  }
  return false;
}

console.log(isEnough('Cat loves me', 15));
console.log(isEnough('Truth is a lie', 20));
console.log(isEnough('I am studying', 8));

function isPalindrome(word) {
  word = word.replace(' ', '').toLowerCase();
  for (let i = 0; i < word.length/2; i++) {
    if (word.at(i) === word.at(-i-1)) {
      return true;
    }
  }
  return false;
}

console.log(isPalindrome('топот'));
console.log(isPalindrome('ДовОд'));
console.log(isPalindrome('Кекс'));
console.log(isPalindrome('Лёша на полке клопа нашёл '));
