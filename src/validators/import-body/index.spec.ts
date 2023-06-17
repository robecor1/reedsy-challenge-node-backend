import {TYPE_VALUES, validateImportBody} from "./index";
import {PostImportBody} from "../../controllers/import/@types";


describe("Post import body validator", () => {
  test('Missing "bookId" error', () => {
    // Empty body since "bookId" is the first checked field
    const VALIDATION_BODY = {}

    // Conversion for the sake of testing
    const testFunction = () => {validateImportBody(VALIDATION_BODY as PostImportBody)}

    expect(testFunction).toThrow('Missing "bookId" field')
  })

  test('"bookId" field type error', () => {
    const VALIDATION_BODY = {
      bookId: 1
    }

    // Conversion for the sake of testing
    const testFunction = () => {validateImportBody(VALIDATION_BODY as unknown as PostImportBody)}

    expect(testFunction).toThrow('"bookId" field should be of type string')
  })

  test('Missing "type" error', () => {
    const VALIDATION_BODY = {
      bookId: '1'
    }

    // Conversion for the sake of testing
    const testFunction = () => {validateImportBody(VALIDATION_BODY as PostImportBody)}

    expect(testFunction).toThrow('Missing "type" field')
  })

  test('"type" field type error', () => {
    const VALIDATION_BODY = {
      bookId: '1',
      type: '1'
    }

    // Conversion for the sake of testing
    const testFunction = () => {validateImportBody(VALIDATION_BODY as unknown as PostImportBody)}

    expect(testFunction).toThrow(`"type" field should be one of the following values: \n ${TYPE_VALUES.join('\n')}`)
  })

  test('Missing "url" error', () => {
    const VALIDATION_BODY = {
      bookId: '1',
      type: 'pdf'
    }

    // Conversion for the sake of testing
    const testFunction = () => {validateImportBody(VALIDATION_BODY as PostImportBody)}

    expect(testFunction).toThrow('Missing "url" field')
  })

  test('"url" field type error', () => {
    const VALIDATION_BODY = {
      bookId: '1',
      type: 'pdf',
      url: 1
    }

    // Conversion for the sake of testing
    const testFunction = () => {validateImportBody(VALIDATION_BODY as unknown as PostImportBody)}

    expect(testFunction).toThrow('"url" field should be of type string')
  })

  test('"url" field type error', () => {
    const VALIDATION_BODY = {
      bookId: '1',
      type: 'pdf',
      url: '1'
    }

    // Conversion for the sake of testing
    const testFunction = () => {validateImportBody(VALIDATION_BODY as unknown as PostImportBody)}

    expect(testFunction).toThrow('"url" field is not a valid URL string')
  })

  test('Valid body', () => {
    const VALIDATION_BODY = {
      bookId: '1',
      type: 'pdf',
      url: 'https://www.google.com'
    }

    const result = validateImportBody(VALIDATION_BODY as PostImportBody)
    expect(result).toBe(true)
  })
})