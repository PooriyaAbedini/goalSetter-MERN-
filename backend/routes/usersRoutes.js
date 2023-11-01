const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const {registerUser, getMe, loginUser} = require('../controllers/userControllers')
const {protect} = require('../middlewares/authmiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)




module.exports = router