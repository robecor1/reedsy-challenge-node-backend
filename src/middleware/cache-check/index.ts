import {NextFunction, Request, Response} from "express";
import {JobCache} from "./@types";

// This is going to be our cache file
// Of course the best practice is going to be using Redis, but I already used MongoDB for DB instead of just using the memory and I fear that using Redis is going to take too much time
export const jobCache: JobCache = {}

export const checkJobsCache = async (req: Request, res: Response, next: NextFunction) => {
  // Get the import/export from the url
  // This is to avoid duplicating code for both import and export jobs
  const jobType = req.baseUrl.split('/')[1]
  if (jobCache[jobType]) {
    res.status(200).json(jobCache[jobType])
  } else {
    next()
  }
}