import {PostImportBody} from "../../controllers/import/@types";
import {PostExportBody} from "../../controllers/export/@types";
import {Job, JobType} from "./@types";
import {JOB_STATE} from "./@constants";
import {createDocument, fetchAllDocuments, updateDocumentById} from "../../adaptors/mongoose";
import {MONGO_COLLECTIONS} from "../../enums/mongo";
import {fakeWait} from "../fake-processing";


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
  return await processJob(newJob, result.insertedId)
}

export const fetchAllJobs = (jobType: JobType) => {
  return fetchAllDocuments(MONGO_COLLECTIONS.JOBS, {jobType}, {groupField: 'state'})
}

export const processJob = async (job: Job, jobId: string) => {
  await fakeWait(job.jobType, job.type)
  return await updateDocumentById(MONGO_COLLECTIONS.JOBS, jobId, {state: JOB_STATE.FINISHED})
}

