import { Router } from "express";
import {getImport, postImport} from "../../controllers/import";

const router = Router()

router.get('/', getImport)
router.post('/', postImport)

export {router as importRoute}
