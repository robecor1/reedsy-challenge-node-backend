import {Operation} from "./module/Operation";

console.log('Hello World!')

const s = "abcdefg";
const op1 = new Operation([{ skip: 1 }, { insert: "FOO" }]);
const op2 = new Operation([{ skip: 3 }, { insert: "BAR" }]);

console.log(op1.apply(s))
console.log(op2.apply(s))
