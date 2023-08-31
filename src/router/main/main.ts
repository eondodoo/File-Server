import {Router} from 'express'
import { downloadFile, getAllFiles, getFileById, searchFiles, } from '../../controllers/main/main'
import { authenticateToken } from '../../middleware/authorization'
const router = Router()


router.get('',  getAllFiles)
router.get('/:id', getFileById)
router.get('/:id/download', authenticateToken, downloadFile)
router.get('/search', searchFiles)

export default router 