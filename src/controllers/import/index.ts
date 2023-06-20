import {NextFunction, Request, Response} from "express";
import {createJob, fetchJobs} from "../../services/job-service";
import {JOB_TYPE} from "../../services/job-service/@constants";
import {ERROR_MESSAGE} from "../../enums/errors";
import {FindOptions} from "../../adaptors/mongoose/@types";
import {setCache} from "../../services/cache";
import {logError} from "../../utils/logging";

export const getImport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {skip, limit} = req.query
    const options = {skip: Number(skip), limit: Number(limit)}
    const jobs = await fetchJobs(JOB_TYPE.IMPORT, options as FindOptions)

    setCache(JOB_TYPE.IMPORT, options, jobs)
    res.status(200).json(jobs)
  } catch (error) {
    logError(error)
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