import {getExpressApp} from "./config/express-app";
import {SERVER_CONFIG} from "./config/server-config";
import swaggerUi from "swagger-ui-express"
import swaggerDocs from "./config/swagger";
import {exportRoute} from "./routes/export";


const app = getExpressApp();

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerDocs
);
app.use('/export', exportRoute)


app.listen(SERVER_CONFIG.port, () => {
  //TODO: Add server start handler
  console.log("Reedsy app")
})
