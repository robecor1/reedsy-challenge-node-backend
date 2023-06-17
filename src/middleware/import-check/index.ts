import {NextFunction, Request, Response} from "express";
import {validateImportBody} from "../../validators/import-body";
import {logError} from "../../utils/logging";

export const checkImportBody = (req: Request, res: Response, next: NextFunction) => {
  try {
    validateImportBody(req.body)
    next()
  } catch (error) {
    logError(`Export body check error: ${error.message}`)
    // Since the error messages defined in the validator are for the client we can return the message directly
    res.status(400).send(error.message)
  }
}