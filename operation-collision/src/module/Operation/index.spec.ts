import {Operation} from "./index";

describe('Operation module', () => {
  test('Insert command', () => {
    const TEST_STRING = '12345'
    const INSERT_STRING = 'test'
    const EXPECTED_OUTCOME = '123test45'

    const operation = new Operation([
      {
        skip: 3
      },
      {
        insert: INSERT_STRING
      }
    ])

    expect(operation.apply(TEST_STRING)).toEqual(EXPECTED_OUTCOME)
  })

  test('Delete command', () => {
    const TEST_STRING = '12345'
    const DELETE_COUNT = 2
    const EXPECTED_OUTCOME = '145'

    const operation = new Operation([
      {
        skip: 1
      },
      {
        delete: DELETE_COUNT
      }
    ])

    expect(operation.apply(TEST_STRING)).toEqual(EXPECTED_OUTCOME)
  })

  test('Delete and insert command', () => {
    const TEST_STRING = '12345'
    const DELETE_COUNT = 1
    const INSERT_STRING = 'test'
    const EXPECTED_OUTCOME = '123test5'

    const operation1 = new Operation([
      {
        skip: 3
      },
      {
        delete: DELETE_COUNT
      },
      {
        insert: INSERT_STRING
      }
    ])

    const operation2 = new Operation([
      {
        skip: 3
      },
      {
        delete: DELETE_COUNT
      },
      {
        skip: 0
      },
      {
        insert: INSERT_STRING
      }
    ])

    expect(operation1.apply(TEST_STRING)).toEqual(EXPECTED_OUTCOME)
    expect(operation1.apply(TEST_STRING)).toEqual(operation2.apply(TEST_STRING))
  })

  test('Combination test', () => {
    const TEST_STRING = '1234567'
    const EXPECTED_OUTCOME = '1(A1)23(A2)(B2)567'

    const op1 = new Operation([
      {skip: 1}, {insert: "(A1)"},
      {skip: 2}, {delete: 1},
    ]);
    const op2 = new Operation([
      {skip: 3}, {insert: "(A2)"},
      {skip: 1}, {insert: "(B2)"},
    ]);

    const staticCombination = Operation.combine(op1, op2)
    const nativeCombination = op1.combine(op2)


    expect(staticCombination.apply(TEST_STRING)).toEqual(EXPECTED_OUTCOME)
    expect(staticCombination.apply(TEST_STRING)).toEqual(nativeCombination.apply(TEST_STRING))
  })

  test('Combination test - same result for both orders', () => {
    const TEST_STRING = '1234567'
    const EXPECTED_OUTCOME = '1(A1)23(A2)(B2)567'

    const op1 = new Operation([
      {skip: 1}, {insert: "(A1)"},
      {skip: 2}, {delete: 1},
    ]);
    const op2 = new Operation([
      {skip: 3}, {insert: "(A2)"},
      {skip: 1}, {insert: "(B2)"},
    ]);

    const comb1 = Operation.combine(op1, op2)
    const comb2 = Operation.combine(op2, op1)


    expect(comb1.apply(TEST_STRING)).toEqual(EXPECTED_OUTCOME)
    expect(comb1.apply(TEST_STRING)).toEqual(comb2.apply(TEST_STRING))
  })

  // This is an example of a combination that results in different values depending on the order of the combination
  // The reason for that is that both operations add text to the same string index
  // but the order depends on which of them is the first one to add the substring ("...(B2)(B1)... vs ...(B1)(B2)...")
  test('Combination test - different result for both orders', () => {
    const TEST_STRING = '1234567'
    const EXPECTED_OUTCOME1 = '1(A1)2(A2)34(B2)(B1)567'
    const EXPECTED_OUTCOME2 = '1(A1)2(A2)34(B1)(B2)567'

    const op1 = new Operation([
      {skip: 1}, {insert: "(A1)"},
      {skip: 3}, {insert: '(B1)'},
    ]);
    const op2 = new Operation([
      {skip: 2}, {insert: "(A2)"},
      {skip: 2}, {insert: "(B2)"},
    ]);

    const comb1 = Operation.combine(op1, op2)
    const comb2 = Operation.combine(op2, op1)

    expect(comb1.apply(TEST_STRING)).toEqual(EXPECTED_OUTCOME1)
    expect(comb1.apply(TEST_STRING)).not.toEqual(comb2.apply(TEST_STRING))
    expect(comb2.apply(TEST_STRING)).toEqual(EXPECTED_OUTCOME2)
  })
})