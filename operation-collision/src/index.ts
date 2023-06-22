import {Operation} from "./module/Operation";

// const s = "abcdefg";
// const op1 = new Operation([{ skip: 1 }, { insert: "FOO" }]);
// const op2 = new Operation([{ skip: 3 }, { insert: "BAR" }]);
//
//
// const combined1 = Operation.combine(op1, op2);
// const combined2 = Operation.combine(op2, op1);
//
// console.log(combined1.apply(s))
// console.log(combined1)
// console.log(combined2.apply(s))
// console.log(combined2)


const s = "1234567";

// 1F23456O7
const op1 = new Operation([
  {skip: 1}, {insert: "(A1)"},
  {skip: 3}, {insert: "(B1)"},
]);
// 123B45A67
const op2 = new Operation([
  {skip: 3}, {insert: "(A2)"},
  {skip: 3}, {insert: "(B2)"},
]);
// 1F23B45A6O7

// console.log(op1.apply(s))
// console.log(op2.apply(s))

const combined1 = Operation.combine(op1, op2);
const combined2 = Operation.combine(op2, op1);

console.log(combined1.apply(s))
// console.log(combined1)
console.log(combined2.apply(s))
// console.log(combined2)


