import {OperationEditQueue} from "./@types";


export class Operation {
  private editList: OperationEditQueue

  constructor(editList: OperationEditQueue) {
    this.editList = editList
  }

  combine(operation: Operation) {
    // Assumption here is made that the operation from the second item go after the first one
    this.editList = Operation.combineOperationsEditList(this.editList, operation.editList)
    return this
  }

  static combine(operation1: Operation, operation2: Operation) {
    // Assumption here is made that the operation from the second item go after the first one
    const combinedEdit = this.combineOperationsEditList(operation1.editList, operation2.editList)
    return new Operation(combinedEdit)
  }

  apply(text: string) {
    let cursor = 0
    let resultText = text

    for (const editItem of this.editList) {
      if ('skip' in editItem) {
        // Assumption here is made that the skip operation is incremental
        // Similar how an editor cursor is moved a number of character from left to right
        cursor += editItem.skip
      } else if ('insert' in editItem) {
        resultText = resultText.slice(0, cursor) + editItem.insert + resultText.slice(cursor);
        // From the example I saw that after an insert the cursor moved by the number of characters in insert
        cursor += editItem.insert.length
      } else if ('delete' in editItem) {
        const firstPart = resultText.substring(0, cursor)
        const secondPart = resultText.substring(cursor + editItem.delete)
        resultText = firstPart + secondPart
      }
    }

    return resultText
  }

  private static combineOperationsEditList(editList1: OperationEditQueue, editList2: OperationEditQueue) {
    let resultEditList: OperationEditQueue = [...editList1]

    const firstItem = editList2[0]
    const firstSkip = 'insert' in firstItem || 'delete' in firstItem ? 0 : firstItem["skip"]
    const {skipDelta, insertDelta} = this.getSkipAndInsertDelta(editList1, firstSkip)
    const newSecondList = this.createSecondList(editList2, skipDelta, insertDelta)

    return [...resultEditList, ...newSecondList]
  }

  // This method is used in the operation combination process
  // We iterate over the first list of edits and get the following information
  // skipDelta - this is used to modify the first skip edit in the second list to the correct position based on the final value from the first list
  // insertDelta - this is on object contain information of on which index in the text and how many characters were added. We use the following format
  // {[number_string_format]: number} - where the property represents the index on the string where a substring was added and the value is the length of the substring
  private static getSkipAndInsertDelta(editList: OperationEditQueue, firstSkip: number) {
    let skipDelta = 0
    let insertDelta = {}
    let lefIndex = 0

    for (const editItem of editList) {
      if (firstSkip > skipDelta) {
        skipDelta += editItem['skip'] || 0
      } else {
        skipDelta += editItem['skip'] || editItem['insert']?.length || 0
      }

      if ('skip' in editItem) {
        lefIndex += editItem['skip']
      }

      if ('insert' in editItem) {
        if (!insertDelta[lefIndex]) {
          insertDelta[lefIndex] = 0
        }

        insertDelta[lefIndex] += editItem['insert']?.length
      }
    }

    return {
      skipDelta,
      insertDelta
    }
  }

  // This method is used in the operation combination process
  // Using the information from the first list we create a new second list with the skip edits modified
  private static createSecondList(editList: OperationEditQueue, skipDelta: number, insertDelta: Record<string, number>) {
    let resultEditList: OperationEditQueue = []
    const firstItem = editList[0]
    const firstSkip = 'insert' in firstItem || 'delete' in firstItem ? 0 : firstItem["skip"]
    let lefIndex = 0

    for (const editItem of editList) {
      if ('skip' in editItem) {
        lefIndex += editItem['skip']

        if (editItem === firstItem) {
          resultEditList = [...resultEditList, {skip: editItem['skip'] - skipDelta}]
        } else {
          const newSkipDelta = this.calculateNewSkipDelta(insertDelta, firstSkip, lefIndex)

          resultEditList = [...resultEditList, {skip: editItem['skip'] + newSkipDelta}]
        }

      } else {
        if (editItem === firstItem) {
          resultEditList = [...resultEditList, {skip: -skipDelta}, editItem]
        } else {
          resultEditList = [...resultEditList, editItem]
        }
      }
    }

    return resultEditList
  }

  // Calculate how much to move the skip field of non-first items for the second list
  private static calculateNewSkipDelta(insertDelta: Record<string, number>, firstSkip: number, lefIndex: number) {
    const addDeltaKeys = Object.keys(insertDelta).map(key => Number(key))
    const validKeys = addDeltaKeys.filter(key => (key >= firstSkip && key < lefIndex))
    let newSkipDelta = 0

    for (const validKey of validKeys) {
      newSkipDelta += insertDelta[validKey]
    }

    return newSkipDelta
  }
}
