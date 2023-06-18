// For development’s sake we will use a mongo package that start a db in memory when node starts
import { MongoMemoryServer } from 'mongodb-memory-server';
import {MONGO_INSTANCE_CONFIGURATION} from "../../config/mongo-server";

let server = null

export const startMongoServer = async () => {
  server = await MongoMemoryServer.create({
    instance: MONGO_INSTANCE_CONFIGURATION,
    binary: {
      version: '6.0.5'
    }
  })
}

export const getServerUri = () => {
  return server && server.getUri()
}

export const stopServer = () => {
  server && server.stop()
}
