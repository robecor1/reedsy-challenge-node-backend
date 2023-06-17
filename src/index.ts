import {getExpressApp} from "./config/express-app";
import {SERVER_CONFIG} from "./config/server-config";
import swaggerUi from "swagger-ui-express"
import swaggerDocs from "./config/swagger";

const app = getExpressApp();

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerDocs
);


app.listen(SERVER_CONFIG.port, () => {
  //TODO: Add server start handler
  console.log("Reedsy app")
})
