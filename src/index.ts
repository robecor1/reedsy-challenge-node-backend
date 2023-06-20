require('dotenv').config();

import {getExpressApp} from "./config/express-app";
import {SERVER_CONFIG} from "./config/server-config";
import swaggerUi from "swagger-ui-express"
import swaggerDocs from "./config/swagger";
import {exportRoute} from "./routes/export";
import {importRoute} from "./routes/import";
import bodyParser from "body-parser";
import {logError, logInfo} from "./utils/logging";
import {getServerUri, startMongoServer} from "./adaptors/memory-mongo";
import {connectToMongoDb} from "./adaptors/mongoose";

const app = getExpressApp();

app.use(bodyParser.json())
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerDocs
);
app.use('/export', exportRoute)
app.use('/import', importRoute)


app.listen(SERVER_CONFIG.port, async () => {
  logInfo("Express for Reedsy assignment started")

  try {
    // If we have a mongo url in the env use that otherwise start the in memory one
    // Note: I started to use an in memory one for development, but switched to separate database for the sake of load tests
    // The memory database was messing with the memory metrics
    if (process.env.MONGO_DB_URI) {
      await connectToMongoDb(process.env.MONGO_DB_URI)
      logInfo('Connected to db')
    } else {
      // Start the in memory mongoDB
      // For the first time it may need to download
      // Note: We only use this for assignment development only. It should never be used in production situations
      await startMongoServer()
      logInfo('In memory mongoDB started')

      // If the mongoDB started connect to it
      const dbUri = getServerUri()
      await connectToMongoDb(dbUri)
      logInfo('Connected to db')
    }
  } catch (error) {
    logError(`MongoDB start and connect error : ${error.message}`)
  }
})
