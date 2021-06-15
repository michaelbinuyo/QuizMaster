const arr = require("./src/Quiz.json");
function arrUnique(arr) {
  var cleaned = [];
  arr.forEach(function (itm) {
    var unique = true;
    cleaned.forEach(function (itm2) {
      if (itm.questionText === itm2.questionText) unique = false;
    });
    if (unique) cleaned.push(itm);
  });
  return cleaned;
}
var standardsList = arrUnique(arr);

// var clean = arr.filter(
//   (arr, index, self) =>
//     index ===
//     self.findIndex(
//       (t) => t.questionText === arr.questionText && t.correct === arr.correct
//     )
// );

console.log(standardsList.length, arr.length);
