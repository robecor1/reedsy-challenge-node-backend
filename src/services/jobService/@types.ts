import {ImportBodyType} from "../../controllers/import/@types";
import {ExportBodyType} from "../../controllers/export/@types";

export type Job = {
  bookID: string
  type: ImportBodyType | ExportBodyType
  url?: string,
  jobType: JobType,
  state: JobState,
  created_at?: number,
  updated_at?: number
}

export type JobType = 'import' | 'export'
export type JobState = 'pending' | 'finished'
