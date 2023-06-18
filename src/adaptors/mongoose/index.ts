import mongoose from 'mongoose';
import {MONGO_INSTANCE_CONFIGURATION} from "../../config/mongo-server";
import {logError} from "../../utils/logging";

let mongoConnection

export const connectToMongoDb = async (mongoUri: string) => {
  mongoConnection = await mongoose.createConnection(mongoUri, {dbName: MONGO_INSTANCE_CONFIGURATION.dbName})
}

export const createDocument = async (collectionName: string, data: Record<string, string | number | Date>, options?: CreateDocumentOptions) => {
  if (mongoConnection && mongoConnection.readyState === 1) {
    const collection = mongoConnection.collection(collectionName)

    await collection.insertOne(data)
  } else {
    logError('Mongo connection not open yet')
  }
}
