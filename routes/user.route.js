const {Router} = require('express')
const { index, signup,getforget, forget, profile, getsignin, getsignup, login } = require('../controllers/user.controller')
const {  authlogin, authsignup } = require('../middlewares/middleware')
const router = Router()

// router.use(cors)

// get
router.get('/',index)
router.get('/signup',getsignup)
router.get('/signin',getsignin)
router.get('/forget',getforget)
router.get('/profile',profile)

// post
router.post('/signup',authsignup,signup)
router.post('/login',authlogin,login)
router.post('/forget',forget)

module.exports={router} 