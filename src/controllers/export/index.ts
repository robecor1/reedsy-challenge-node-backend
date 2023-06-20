import {NextFunction, Request, Response} from "express";
import {createJob, fetchAllJobs} from "../../services/job-service";
import {JOB_TYPE} from "../../services/job-service/@constants";
import {ERROR_MESSAGE} from "../../enums/errors";
import {jobCache} from "../../middleware/cache-check";

export const getExport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobs = await fetchAllJobs(JOB_TYPE.EXPORT)
    jobCache[JOB_TYPE.EXPORT] = jobs
    res.status(200).json(jobs)
  } catch (error) {
    res.status(500).send(ERROR_MESSAGE.SERVER_ERROR)
  }
}

export const postExport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobId = await createJob(req.body, JOB_TYPE.EXPORT)
    res.status(200).json({
      success: true,
      jobId
    })
  } catch (error) {
    res.status(500).send(ERROR_MESSAGE.SERVER_ERROR)
  }
}