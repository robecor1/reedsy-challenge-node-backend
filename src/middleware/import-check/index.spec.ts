import {Request, Response} from "express";
import {checkImportBody} from "./index";


describe('Import post body check controller', () => {
  test('400 for missing "bookId"', async () => {
    const request = {
      body: {}
    }
    const response = {
      send() {
        return response
      },
      status() {
        return response
      }
    }

    jest.spyOn(response, 'status')

    await checkImportBody(request as Request, response as unknown as Response, ()=>{})
    expect(response.status).toHaveBeenCalledWith(400)
  })

  test('400 for incorrect "bookId" type', async () => {
    const request = {
      body: {
        bookId: 1
      }
    }
    const response = {
      send() {
        return response
      },
      status() {
        return response
      }
    }

    jest.spyOn(response, 'status')

    await checkImportBody(request as Request, response as unknown as Response, ()=>{})
    expect(response.status).toHaveBeenCalledWith(400)
  })

  test('400 for missing "type"', async () => {
    const request = {
      body: {
        bookId: '1'
      }
    }
    const response = {
      send() {
        return response
      },
      status() {
        return response
      }
    }

    jest.spyOn(response, 'status')

    await checkImportBody(request as Request, response as unknown as Response, ()=>{})
    expect(response.status).toHaveBeenCalledWith(400)
  })

  test('400 for incorrect "type" type', async () => {
    const request = {
      body: {
        bookId: '1',
        type: '1'
      }
    }
    const response = {
      send() {
        return response
      },
      status() {
        return response
      }
    }

    jest.spyOn(response, 'status')

    await checkImportBody(request as Request, response as unknown as Response, ()=>{})
    expect(response.status).toHaveBeenCalledWith(400)
  })

  test('400 for missing "url"', async () => {
    const request = {
      body: {
        bookId: '1',
        type: 'pdf'
      }
    }
    const response = {
      send() {
        return response
      },
      status() {
        return response
      }
    }

    jest.spyOn(response, 'status')

    await checkImportBody(request as Request, response as unknown as Response, ()=>{})
    expect(response.status).toHaveBeenCalledWith(400)
  })

  test('Valid body', async () => {
    const request = {
      body: {
        bookId: '1',
        type: 'pdf',
        url: 'https://www.google.com'
      }
    }
    const response = {
      send() {
        return response
      },
      status() {
        return response
      }
    }

    jest.spyOn(response, 'status')

    await checkImportBody(request as Request, response as unknown as Response, ()=>{})
    expect(response.status).not.toHaveBeenCalledWith(400)
  })
})