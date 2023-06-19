import {stopServer, getServerUri, startMongoServer} from "../../adaptors/memory-mongo";
import {logError} from "../../utils/logging";
import {clearCollection, closeConnection, connectToMongoDb} from "../../adaptors/mongoose";
import {createJob, fetchAllJobs} from "./index";
import {JOB_TYPE} from "./@constants";
import {PostExportBody} from "../../controllers/export/@types";
import {PostImportBody} from "../../controllers/import/@types";
import {MONGO_COLLECTIONS} from "../../enums/mongo";


describe('Job Service', () => {
  const OLD_ENV = process.env

  beforeAll(async () => {
    process.env.ENV = 'test'

    // The in memory mongodb is also useful for unit tests
    try {
      await startMongoServer()
      const dbUri = getServerUri()
      await connectToMongoDb(dbUri)
    } catch (error) {
      logError(`MongoDB start and connect error : ${error.message}`)
    }
  })

  afterEach(  async () => {
    await clearCollection(MONGO_COLLECTIONS.JOBS)
  })

  afterAll(() => {
    // Close connection and stop server after tests are finished
    closeConnection()
    stopServer()

    process.env = OLD_ENV
  })

  test('Insert export job', async () => {
    const DATA = {
      bookId: '1',
      type: 'pdf'
    } as PostExportBody & PostImportBody

    const result = await createJob(DATA, JOB_TYPE.EXPORT)

    expect(result.acknowledged).toBe(true)
  })

  test('Fetch all jobs', async () => {
    const DATA = {
      bookId: '1',
      type: 'pdf'
    } as PostExportBody & PostImportBody

    await createJob(DATA, JOB_TYPE.EXPORT)
    const jobsArray = await fetchAllJobs(JOB_TYPE.EXPORT)

    expect(jobsArray.length).toBe(1)
    expect(jobsArray[0].bookId).toBe(DATA.bookId)
  })
})
