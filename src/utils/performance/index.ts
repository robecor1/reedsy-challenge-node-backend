import { performance, PerformanceObserver, EntryType } from "perf_hooks"
import {logError, logInfo} from "../logging";

const entries = {}

const entryType: EntryType = "measure"
const perfObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    logInfo(`Duration for ${entry.name} was ${entry.duration} ms`)
  })
})

perfObserver.observe({buffered: true, entryTypes: [entryType]})

export const measureStart = (actionName: string) => {
  if (entries[actionName]) {
    logError('Performance entry already exists')
    return
  }

  const markStart = `${actionName}-start`

  performance.mark(markStart)
  entries[actionName] = actionName
}

export const measureStop = (actionName: string) => {
  if (!entries[actionName]) {
    logError('No performance measure entries')
    return
  }

  const markStart = `${actionName}-start`
  const markEnd = `${actionName}-end`


  performance.mark(markEnd)
  performance.measure(actionName, markStart, markEnd)

  delete entries[actionName]
}
