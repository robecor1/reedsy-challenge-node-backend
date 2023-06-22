import {Operation} from "./module/Operation";

const s = "1234567";
console.log(s);
console.log('\n')

const op1 = new Operation([
  {skip: 1}, {insert: "(A1)"},
  {skip: 2}, {delete: 1},
]);
const op2 = new Operation([
  {skip: 3}, {insert: "(A2)"},
  {skip: 1}, {insert: "(B2)"},
]);

console.log(op1.apply(s))
console.log(op2.apply(s))
console.log('\n')

const combined1 = Operation.combine(op1, op2);
const combined2 = Operation.combine(op2, op1);

console.log(combined1.apply(s))
console.log(combined2.apply(s))


