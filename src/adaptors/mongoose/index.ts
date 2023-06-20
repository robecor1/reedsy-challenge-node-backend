import mongoose from 'mongoose';
import {MONGO_INSTANCE_CONFIGURATION} from "../../config/mongo-server";
import {cleanData} from "./utils";
import {FindFilter, FindOptions} from "./@types";
import {CustomError} from "../../utils/error";
import {ERROR_MESSAGE} from "../../enums/errors";
import {MONGO_COLLECTIONS} from "../../enums/mongo";

// The maximum number of times to try for a ready connection
const CONNECTION_MAX_TRIES = 5
// The interval time in milliseconds to try for a ready connection
const CONNECTION_TRY_INTERVAL = 1000

// The export is for other unit tests files
export let mongoConnection

export const connectToMongoDb = async (mongoUri: string) => {
  mongoConnection = await mongoose.createConnection(mongoUri, {dbName: MONGO_INSTANCE_CONFIGURATION.dbName})

  // If there is a jobs collection add a jobType index for faster query
  const readyConnection = await getReadyConnection(0)
  const collection = readyConnection.collection(MONGO_COLLECTIONS.JOBS)

  if (collection) {
    await collection.createIndex({ jobType: 1 });
  }
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

export const fetchDocuments = async (collectionName: string, filter?: FindFilter, options?: FindOptions) => {
  const readyConnection = await getReadyConnection(0)
  const collection = readyConnection.collection(collectionName)

  const cursor = await collection.find(filter)

  if (options?.skip) {
    cursor.skip(options.skip)
  }
  if (options?.limit) {
    cursor.limit(options.limit)
  }

  return cursor.toArray()
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
