import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const swaggerOption = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Robert Express API with Swagger",
      version: "0.1.0",
      description:
        "Shift fetch API",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Robert",
        url: "https://github.com/robecor1",
        email: "robbe_cor@yahoo.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    paths: {
      //TODO: Add documentation for routes
      "/": {
        "get": {}
      }
    }
  },
  apis: ["./src/routes/*/*.js"],
}

const specs = swaggerJsdoc(swaggerOption)

export default swaggerUi.setup(specs)
