import {NextFunction, Request, Response} from "express";
import {createDocument} from "../../adaptors/mongoose";

export const getExport = (req: Request, res: Response, next: NextFunction) => {
  //TODO: Add logic
  res.status(200).send('Success')
}

export const postExport = async (req: Request, res: Response, next: NextFunction) => {
  //TODO: Add logic
  await createDocument('jobs', req.body)
  res.status(200).send('Success')
}