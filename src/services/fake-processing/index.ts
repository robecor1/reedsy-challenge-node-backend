import {BOOK_TYPE, JOB_TYPE} from "../job-service/@constants";

const WAIT_TIMES = {
  [JOB_TYPE.EXPORT]: {
    [BOOK_TYPE.EPUB]: 10000,
    [BOOK_TYPE.PDF]: 25000,
  },
  [JOB_TYPE.IMPORT]: 60000
}

export const fakeWait = (jobType: string, bookType: string) => {
  const waitTime = jobType === JOB_TYPE.IMPORT ? WAIT_TIMES[jobType] : WAIT_TIMES[jobType][bookType] || 0

  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, waitTime)
  })
}