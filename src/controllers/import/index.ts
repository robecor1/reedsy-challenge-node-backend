import {NextFunction, Request, Response} from "express";
import {createJob, fetchAllJobs} from "../../services/job-service";
import {JOB_TYPE} from "../../services/job-service/@constants";
import {ERROR_MESSAGE} from "../../enums/errors";

export const getImport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobs = await fetchAllJobs(JOB_TYPE.IMPORT)
    res.status(200).send(JSON.stringify(jobs))
  } catch (error) {
    res.status(500).send(ERROR_MESSAGE.SERVER_ERROR)
  }
}

export const postImport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createJob(req.body, JOB_TYPE.IMPORT)
    res.status(200).send('Success')
  } catch (error) {
    res.status(500).send(ERROR_MESSAGE.SERVER_ERROR)
  }
}