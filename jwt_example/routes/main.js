const express = require('express')

const router = express.Router()
const {login,dashboard} = require('../controllers/main')

const authemticationMiddleware = require('../middleware/auth');

router.route('/dashboard').get(authemticationMiddleware,dashboard)
router.route('/login').post(login)

module.exports = router