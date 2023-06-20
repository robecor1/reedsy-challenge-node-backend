import {jobCache} from "../../middleware/cache-check";
import {convertOptionsToHashKey} from "../../utils/format";

export const setCache = (type: string, options: { skip: number, limit: number }, data: any) => {
  jobCache[type] = jobCache[type] || {}
  jobCache[type][convertOptionsToHashKey(options)] = data
}