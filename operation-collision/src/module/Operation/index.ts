import {OperationEditQueue} from "./@types";


export class Operation {
  private cursor: number = 0
  editList: OperationEditQueue

  constructor(editList: OperationEditQueue) {
    this.editList = editList
  }

  combine(operation: Operation) {
    // Assumption here is made that the operation from the second item go after the first one
    this.editList = [...this.editList, ...operation.editList]
    return this
  }

  static combine (operation1: Operation, operation2: Operation) {
    return new Operation([...operation1.editList, ...operation2.editList])
  }

  apply(text: string) {
    let resultText = text

    for (const editItem of this.editList) {
      if ('skip' in editItem) {
        // Assumption here is made that the skip operation is incremental
        // Similar how a cursor is moved a number of character from left to right
        this.cursor += editItem.skip
      } else if ('insert' in editItem) {
        resultText = resultText.slice(0, this.cursor) + editItem.insert + resultText.slice(this.cursor);
        // From the example I saw that after an insert the cursor moved by the number of characters in insert
        this.cursor += editItem.insert.length
      } else if ('delete' in editItem) {
        const firstPart = resultText.substring(0, this.cursor)
        const secondPart = resultText.substring(this.cursor + editItem.delete)
        resultText = firstPart + secondPart
      }
    }

    return resultText
  }
}
