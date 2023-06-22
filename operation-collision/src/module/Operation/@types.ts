export type OperationEditQueue = Array<OperationEdit>

export type OperationEdit = OperationSkip | OperationInsert | OperationDelete

export type OperationSkip = {
  skip: number
}

export type OperationInsert = {
  insert: string
}

export type OperationDelete = {
  delete: number
}
