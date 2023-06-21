import {OperationEditQueue} from "./@types";


export class Operation {
  private cursor: number = 0
  editList: OperationEditQueue

  constructor(editList: OperationEditQueue) {
    this.editList = editList
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
      } else if ('delete' in editItem) {
        resultText = resultText.slice(this.cursor, editItem.delete)
      }
    }

    return resultText
  }
}
