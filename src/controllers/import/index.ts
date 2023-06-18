import {NextFunction, Request, Response} from "express";
import {createJob} from "../../services/jobService";
import {JOB_TYPE} from "../../services/jobService/@constants";

export const getImport = (req: Request, res: Response, next: NextFunction) => {
  //TODO: Add logic
  res.status(200).send('Success')
}

export const postImport = async (req: Request, res: Response, next: NextFunction) => {
  await createJob(req.body, JOB_TYPE.IMPORT)
  res.status(200).send('Success')
}