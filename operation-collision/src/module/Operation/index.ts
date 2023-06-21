import {OperationEditQueue} from "./@types";


export class Operation {
  private cursor: number = 0
  editQueue: OperationEditQueue

  constructor(editQueue: OperationEditQueue) {
    this.editQueue = editQueue
  }
}
