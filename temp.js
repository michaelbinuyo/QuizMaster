function shuffle(arr) {
  const newArr = [...arr];
  const Arr = [...newArr];
  newArr.forEach((e, i) => {
    const rand = Math.floor(Math.random() * Arr.length);
    newArr[i] = Arr[rand];
    Arr.splice(rand, 1);
  });
  return newArr;
}

module.exports = shuffle;
