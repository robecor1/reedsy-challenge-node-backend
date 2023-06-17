import { Router } from "express";
import {getExport, postExport} from "../../controllers/export";

const router = Router()

router.get('/', getExport)
router.post('/', postExport)

export {router as exportRoute}
