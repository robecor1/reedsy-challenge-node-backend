import mongoose from 'mongoose';
import {MONGO_INSTANCE_CONFIGURATION} from "../../config/mongo-server";
import {cleanData} from "./utils";
import {FindFilter, FindOptions} from "./@types";
import {CustomError} from "../../utils/error";
import {ERROR_MESSAGE} from "../../enums/errors";

// The maximum number of times to try for a ready connection
const CONNECTION_MAX_TRIES = 5
// The interval time in milliseconds to try for a ready connection
const CONNECTION_TRY_INTERVAL = 1000

// The export is for other unit tests files
export let mongoConnection

export const connectToMongoDb = async (mongoUri: string) => {
  mongoConnection = await mongoose.createConnection(mongoUri, {dbName: MONGO_INSTANCE_CONFIGURATION.dbName})
}

export const createDocument = async (collectionName: string, data: Record<string, string | number | Date>) => {
  const readyConnection = await getReadyConnection(0)
  const collection = readyConnection.collection(collectionName)

  return await collection.insertOne(cleanData(data))
}

export const updateDocumentById = async (collectionName: string, documentId: string, data: Record<string, string | number | Date>) => {
  const readyConnection = await getReadyConnection(0)
  const collection = readyConnection.collection(collectionName)

  return await collection.updateOne({
    _id: documentId
  } , {
    $set: cleanData(data)
  })
}

export const fetchAllDocuments = async (collectionName: string, filter?: FindFilter, options?: FindOptions) => {
  const readyConnection = await getReadyConnection(0)
  const collection = readyConnection.collection(collectionName)

  return await collection.find(filter, {
    groupBy: options.groupField
  }).toArray()
}

export const clearCollection = async (collectionName: string) => {
  const readyConnection = await getReadyConnection(0)
  const collection = readyConnection.collection(collectionName)

  return await collection.drop()

}

export const closeConnection = () => {
  mongoConnection && mongoConnection.close()
}

const getReadyConnection = async (attempt: number) => {
  if (attempt > CONNECTION_MAX_TRIES) {
    throw new CustomError(ERROR_MESSAGE.MONGO_CONNECTION_TRY_ERROR)
  }

  if (mongoConnection && mongoConnection.readyState === 1) {
    return mongoConnection
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getReadyConnection(attempt + 1))
      }, CONNECTION_TRY_INTERVAL)
    })
  }
}
