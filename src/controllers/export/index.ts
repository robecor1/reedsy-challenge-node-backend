import {NextFunction, Request, Response} from "express";
import {createJob} from "../../services/jobService";
import {JOB_TYPE} from "../../services/jobService/@constants";

export const getExport = (req: Request, res: Response, next: NextFunction) => {
  //TODO: Add logic
  res.status(200).send('Success')
}

export const postExport = async (req: Request, res: Response, next: NextFunction) => {
  await createJob(req.body, JOB_TYPE.EXPORT)
  res.status(200).send('Success')
}