import {Router} from 'express'
import { downloadFile, getAllFiles, getFileById, searchFiles, send, sendFile, } from '../../controllers/main/main'
import { isAuthenticated, isNotAuthenticated } from '../../middleware/isAuthenticated'
const router = Router()


router.get('',  getAllFiles)
router.get('/search', searchFiles) 
router.get('/:id', getFileById)
router.get('/:id/download', isNotAuthenticated, downloadFile)
router.get('/:id/send', isNotAuthenticated, send)
router.post('/:id/send', isNotAuthenticated, sendFile)
// router.get('/:send', isNotAuthenticated, sendFile)
 

export default router 