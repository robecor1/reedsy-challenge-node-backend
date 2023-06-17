import {NextFunction, Request, Response} from "express";
import {validateExportBody} from "../../validators/export-body";
import {logError} from "../../utils/logging";

export const checkExportBody = (req: Request, res: Response, next: NextFunction) => {
  try {
    validateExportBody(req.body)
    next()
  } catch (error) {
    logError(`Export body check error: ${error.message}`)
    // Since the error messages defined in the validator are for the client we can return the message directly
    res.status(400).send(error.message)
  }
}