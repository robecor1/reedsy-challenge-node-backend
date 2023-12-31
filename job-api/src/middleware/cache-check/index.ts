import {NextFunction, Request, Response} from "express";
import {JobCache} from "./@types";
import {convertOptionsToHashKey} from "../../utils/format";

// This is going to be our cache file
// Of course the best practice is going to be using Redis
export const jobCache: JobCache = {}

export const checkJobsCache = async (req: Request, res: Response, next: NextFunction) => {
  // Get the import/export from the url
  // This is to avoid duplicating code for both import and export jobs
  const jobType = req.baseUrl.split('/')[1]
  const {skip, limit} = req.query
  const options = {skip: Number(skip), limit: Number(limit)}
  const foundCache = jobCache[jobType] && jobCache[jobType][convertOptionsToHashKey(options)]

  if (foundCache) {
    res.status(200).json(foundCache)
  } else {
    next()
  }
}