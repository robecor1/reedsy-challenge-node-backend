import {JobInfo} from "./@types";
import {updateDocumentById} from "../../adaptors/mongoose";
import {MONGO_COLLECTIONS} from "../../enums/mongo";
import {logInfo} from "../../utils/logging";
import {fakeWait} from "../../services/fake-processing";
import {JOB_STATE} from "../../services/job-service/@constants";


export class JobProcess {
  jobId: string
  jobType: string
  bookType: string

  constructor(info: JobInfo) {
    this.jobId = info.jobId
    this.jobType = info.jobType
    this.bookType = info.bookType
  }

  start() {
    fakeWait(this.jobType, this.bookType).then(() => {
      return updateDocumentById(MONGO_COLLECTIONS.JOBS, this.jobId, {state: JOB_STATE.FINISHED})
    })
      .then(() => {
        logInfo(`Finished processing job with id ${this.jobId}`)
      })
  }
}