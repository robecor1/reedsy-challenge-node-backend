import {Request, Response} from "express";
import {checkExportBody} from "./index";


describe('Export post body check controller', () => {
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

    await checkExportBody(request as Request, response as unknown as Response, ()=>{})
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

    await checkExportBody(request as Request, response as unknown as Response, ()=>{})
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

    await checkExportBody(request as Request, response as unknown as Response, ()=>{})
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

    await checkExportBody(request as Request, response as unknown as Response, ()=>{})
    expect(response.status).toHaveBeenCalledWith(400)
  })
})