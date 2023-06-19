import {JobProcess} from "./index";
import * as fakeWait from "../../services/fake-processing";

describe('Job Process', () => {
  test('Process instance start', async () => {
    const JOB_INFO = {
      jobId: '1',
      jobType: 'import',
      bookType: 'pdf'
    }

    jest.spyOn(fakeWait, 'fakeWait')

    const newJobProcess = new JobProcess(JOB_INFO)
    newJobProcess.start()
    expect(fakeWait.fakeWait).toHaveBeenCalledWith(JOB_INFO.jobType, JOB_INFO.bookType)

  })
})