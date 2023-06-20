import {NextFunction, Request, Response} from "express";
import {createJob, fetchAllJobs} from "../../services/job-service";
import {JOB_TYPE} from "../../services/job-service/@constants";
import {ERROR_MESSAGE} from "../../enums/errors";
import {jobCache} from "../../middleware/cache-check";

export const getImport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (jobCache[JOB_TYPE.IMPORT]) {
      res.status(200).json(jobCache[JOB_TYPE.IMPORT])
    } else {
      const jobs = await fetchAllJobs(JOB_TYPE.IMPORT)
      jobCache[JOB_TYPE.IMPORT] = jobs
      res.status(200).json(jobs)
    }
  } catch (error) {
    res.status(500).send(ERROR_MESSAGE.SERVER_ERROR)
  }
}

export const postImport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobId = await createJob(req.body, JOB_TYPE.IMPORT)
    res.status(200).json({
      success: true,
      jobId
    })
  } catch (error) {
    res.status(500).send(ERROR_MESSAGE.SERVER_ERROR)
  }
}