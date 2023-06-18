import {PostImportBody} from "../../controllers/import/@types";
import {PostExportBody} from "../../controllers/export/@types";
import {Job, JobType} from "./@types";
import {JOB_STATE} from "./@constants";
import {createDocument} from "../../adaptors/mongoose";
import {MONGO_COLLECTIONS} from "../../enums/mongo";


export const createJob = async (data: PostImportBody & PostExportBody, type: JobType) => {
  const newJob: Job = {
    bookID: data.bookId,
    type: data.type,
    url: data?.url,
    jobType: type,
    state: JOB_STATE.PENDING,
    created_at: Date.now()
  }

  await createDocument(MONGO_COLLECTIONS.JOBS, newJob)
}
