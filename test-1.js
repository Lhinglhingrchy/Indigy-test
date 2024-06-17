for (let i = 1; i <= 9; i++) {
  let tree = "";
  for (let j = 0; j < 9 - i; j++) {
    tree = tree + " ";
  }
  for (let k = 1; k <= i; k++) {
    tree = tree + i + " ";
  }
  console.log(tree);
}

// function display(n) {
//   for (let i = 1; i <= n; i++) {
//     let tree = "";
//     for (let j = 0; j < n - i; j++) {
//       tree = tree + " ";
//     }
//     for (let k = 1; k <= i; k++) {
//       tree = tree + i + " ";
//     }
//     console.log(tree);
//   }
// }
// display(9);
