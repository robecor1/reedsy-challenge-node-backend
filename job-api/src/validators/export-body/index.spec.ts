import {TYPE_VALUES, validateExportBody} from "./index";
import {PostExportBody} from "../../controllers/export/@types";


describe("Post export body validator", () => {
  test('Missing "bookId" error', () => {
    // Empty body since "bookId" is the first checked field
    const VALIDATION_BODY = {}

    // Conversion for the sake of testing
    const testFunction = () => {validateExportBody(VALIDATION_BODY as PostExportBody)}

    expect(testFunction).toThrow('Missing "bookId" field')
  })

  test('"bookId" field type error', () => {
    const VALIDATION_BODY = {
      bookId: 1
    }

    // Conversion for the sake of testing
    const testFunction = () => {validateExportBody(VALIDATION_BODY as unknown as PostExportBody)}

    expect(testFunction).toThrow('"bookId" field should be of type string')
  })

  test('Missing "type" error', () => {
    const VALIDATION_BODY = {
      bookId: '1'
    }

    // Conversion for the sake of testing
    const testFunction = () => {validateExportBody(VALIDATION_BODY as PostExportBody)}

    expect(testFunction).toThrow('Missing "type" field')
  })

  test('"type" field type error', () => {
    const VALIDATION_BODY = {
      bookId: '1',
      type: '1'
    }

    // Conversion for the sake of testing
    const testFunction = () => {validateExportBody(VALIDATION_BODY as unknown as PostExportBody)}

    expect(testFunction).toThrow(`"type" field should be one of the following values: \n ${TYPE_VALUES.join('\n')}`)
  })

  test('Valid body', () => {
    const VALIDATION_BODY = {
      bookId: '1',
      type: 'pdf'
    }

    const result = validateExportBody(VALIDATION_BODY as PostExportBody)
    expect(result).toBe(true)
  })
})