import {PostExportBody} from "../../controllers/export/@types";
import {CustomError} from "../../utils/error";

// Make sure this match the type field in the PostExportBody type
export const TYPE_VALUES = [
  'epub',
  'pdf'
]

export const validateExportBody = (body: PostExportBody) => {
  if (!body.hasOwnProperty('bookId')) {
    throw new CustomError('Missing "bookId" field')
  }

  if (typeof body.bookId !== 'string') {
    throw new CustomError('"bookId" field should be of type string')
  }

  if (!body.hasOwnProperty('type')) {
    throw new CustomError('Missing "type" field')
  }

  if (!TYPE_VALUES.includes(body.type)) {
    throw new CustomError(`"type" field should be one of the following values: \n ${TYPE_VALUES.join('\n')}`)
  }

  return true
}