import {Router} from 'express'
import { downloadFile, getAllFiles, getFileById, searchFiles, sendFile, } from '../../controllers/main/main'
// import { authenticateToken } from '../../middleware/authorization'
import { isAuthenticated, isNotAuthenticated } from '../../middleware/isAuthenticated'
import { sendMail } from '../../middleware/sendMail'
const router = Router()


router.get('',  getAllFiles)
router.get('/:id', getFileById)
router.get('/:id/download', isNotAuthenticated, downloadFile)
router.get('/:id/send', sendFile)
router.get('/search', searchFiles)

export default router 