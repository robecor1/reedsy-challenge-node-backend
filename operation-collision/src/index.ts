import {Operation} from "./module/Operation";

const s = "abcdefg";
const op1 = new Operation([{ skip: 1 }, { insert: "FOO" }]);
const op2 = new Operation([{ skip: 3 }, { insert: "BAR" }]);
const op3 = new Operation([{ skip: 2 }, { delete: 2 }]);

console.log(op1.apply(s))
console.log(op2.apply(s))
console.log(op3.apply(s))

const combined1 = Operation.combine(op1, op2);
const combined2 = op1.combine(op2)
console.log(combined1.apply(s))
