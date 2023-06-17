import { Router } from "express";
import {getImport, postImport} from "../../controllers/import";
import {checkImportBody} from "../../middleware/import-check";

const router = Router()

// Route for listing imports
router.get('/', getImport)

// Middleware for validation for the import process body
router.post('/', checkImportBody)

//Route for the import job creation
router.post('/', postImport)

export {router as importRoute}
