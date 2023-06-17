import { Router } from "express";
import {getExport, postExport} from "../../controllers/export";
import {checkExportBody} from "../../middleware/export-check";

const router = Router()

// Route for listing exports
router.get('/', getExport)

// Middleware for validation for the export process body
router.post('/', checkExportBody)

//Route for the export job creation
router.post('/', postExport)

export {router as exportRoute}
