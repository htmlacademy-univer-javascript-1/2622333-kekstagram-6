/* eslint-disable no-unused-vars */
//4
function timeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

function isMeetingOnWorkTime(workStart, workEnd, meetingStart, meetingDuration) {
  const workStartMinutes = timeToMinutes(workStart);
  const workEndMinutes = timeToMinutes(workEnd);
  const meetingStartMinutes = timeToMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return meetingStartMinutes >= workStartMinutes &&
          meetingEndMinutes <= workEndMinutes;
}

// //1
// function getLength(string, length) {
//   return string.length <= length;
// }

// //2
// function isPalindrome(string) {
//   const normalizedString = string.toLowerCase().replaceAll(' ', '');
//   const reversedString = normalizedString.split('').reverse().join('');
//   return reversedString === normalizedString;
// }

// //3
// function isNumber(phrase) {
//   let result = '';
//   const string = phrase.toString().replaceAll(' ', '');
//   for (let i = 0; i < string.length; i++) {
//     const digit = Number(string[i]);
//     if ((result.length === 0) & (digit === 0)) {
//       continue;
//     } if (!Number.isNaN(digit)) {
//       result += digit;
//     }
//   }
//   return result.length === 0 ? NaN : result;
// }


