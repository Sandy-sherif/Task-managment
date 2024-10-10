const express = require('express')
const router = express.Router()
const tasksController = require('../controllers/tasksController')
const tasksValidation = require('../validations/tasksValidation')
const usersMiddleware = require('../middlewares/usersMiddleware')
const upload = require('../utilities/productImageUpload')

router.route('/')
    .get(tasksController.getAllTasks)
    .post(tasksController.addTask)

router.route('/filter').get(tasksController.filtertasks)

router.route('/:id')
    .get(tasksController.getSingleTask)
    .patch(tasksController.updateTask)
    .delete(tasksController.deleteTask)

router.get('/agg', tasksController.aggregations)

module.exports = router