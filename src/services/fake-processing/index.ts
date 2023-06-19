import {BOOK_TYPE, JOB_TYPE} from "../job-service/@constants";

const WAIT_TIMES = {
  [JOB_TYPE.EXPORT]: {
    [BOOK_TYPE.EPUB]: 10000,
    [BOOK_TYPE.PDF]: 25000,
  },
  [JOB_TYPE.IMPORT]: 60000
}

// For the sake of the assignment I'm going to assume that the processing part of the job is an async I/O operations
// With this assumption I created a fake waiting service that simulates that

// If it is a sync operation that block the Node event loop then we can consider using clusters or worker_threads
// This situation complicates the implementation and should consider the number the cores/threads and scaling it a different way using maybe an elastic scaling service similar to the one from AWS
export const fakeWait = (jobType: string, bookType: string) => {
  const waitTime = jobType === JOB_TYPE.IMPORT ? WAIT_TIMES[jobType] : WAIT_TIMES[jobType][bookType] || 0

  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, waitTime)
  })
}