import {Job} from "./@types";

export const groupBy = (jobs: Job[], field: string) => {
  const result = {}

  for (const job of jobs) {
    if (!result[job[field]]) {
      result[job[field]] = []
    }

    result[job[field]] = [...result[job[field]], job]
  }

  return result
}