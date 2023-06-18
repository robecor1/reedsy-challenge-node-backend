import {NextFunction, Request, Response} from "express";
import {createJob, fetchAllJobs} from "../../services/jobService";
import {JOB_TYPE} from "../../services/jobService/@constants";
import {ERROR_MESSAGE} from "../../enums/errors";

export const getExport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobs = await fetchAllJobs(JOB_TYPE.EXPORT)
    res.status(200).send(JSON.stringify(jobs))
  } catch (error) {
    res.status(500).send(ERROR_MESSAGE.SERVER_ERROR)
  }
}

export const postExport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createJob(req.body, JOB_TYPE.EXPORT)
    res.status(200).send('Success')
  } catch (error) {
    res.status(500).send(ERROR_MESSAGE.SERVER_ERROR)
  }
}