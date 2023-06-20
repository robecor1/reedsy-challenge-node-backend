import {PostImportBody} from "../../controllers/import/@types";
import {PostExportBody} from "../../controllers/export/@types";
import {Job, JobType} from "./@types";
import {JOB_STATE} from "./@constants";
import {createDocument, fetchDocuments} from "../../adaptors/mongoose";
import {MONGO_COLLECTIONS} from "../../enums/mongo";
import {JobProcess} from "../../modules/job-process";
import {groupBy} from "./utils";
import {FindOptions} from "../../adaptors/mongoose/@types";


export const createJob = async (data: PostImportBody & PostExportBody, type: JobType) => {
  const newJob: Job = {
    bookId: data.bookId,
    type: data.type,
    url: data?.url,
    jobType: type,
    state: JOB_STATE.PENDING,
    created_at: Date.now()
  }

  const result = await createDocument(MONGO_COLLECTIONS.JOBS, newJob)
  createJobProcess(newJob, result.insertedId)

  return result.insertedId
}

export const fetchJobs = async (jobType: JobType, options?: FindOptions) => {
  const jobs = await fetchDocuments(MONGO_COLLECTIONS.JOBS, {jobType}, options)
  return groupBy(jobs, 'state')
}

const createJobProcess = (job: Job, jobId: string) => {
  const process = new JobProcess({
    jobId,
    jobType: job.jobType,
    bookType: job.type
  })

  process.start()
}

