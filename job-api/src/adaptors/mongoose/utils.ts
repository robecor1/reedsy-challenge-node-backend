// Simple method of cleaning data of null or undefined values since mongo will save them in the database and for now we don't want them
export const cleanData = (data) => {
  for (const key of Object.keys(data)) {
    if (data[key] === null || data[key] === undefined) {
      delete data[key]
    }
  }

  return data
}