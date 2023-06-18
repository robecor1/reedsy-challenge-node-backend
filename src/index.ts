import {getExpressApp} from "./config/express-app";
import {SERVER_CONFIG} from "./config/server-config";
import swaggerUi from "swagger-ui-express"
import swaggerDocs from "./config/swagger";
import {exportRoute} from "./routes/export";
import {importRoute} from "./routes/import";
import bodyParser from "body-parser";
import {logError, logInfo} from "./utils/logging";
import {startMongoServer} from "./adaptors/memory-mongo";

const app = getExpressApp();

app.use(bodyParser.json())
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerDocs
);
app.use('/export', exportRoute)
app.use('/import', importRoute)


app.listen(SERVER_CONFIG.port, () => {
  //TODO: Add server start handler
  logInfo("Express for Reedsy assignment started")

  // Start the in memory mongoDB
  // For the first time it may need to download
  // Note: We only use this for assignment development only. It should never be used in production situations
  startMongoServer().then(() => {
    logInfo('In memory mongoDB started')
  }).catch((error) => {
    logError(`In memory mongoDB start error: ${error.message}`)
  })
})
