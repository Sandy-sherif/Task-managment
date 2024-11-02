const express = require('express')
const router = express.Router()
const userController = require('./../controllers/usersController')
const usersValidation = require('./../validations/userValidation')

router.post('/register',usersValidation(),userController.register)
router.post('/login',userController.login)
router.route('/:id')
    .get(userController.getSingleUser)
    .patch(userController.updateUserData)

module.exports = router
