const {
    body
} = require('express-validator')
const Task = require('../models/tasksModel')

const tasksValidation = () => {
    return [
        body('taskName').notEmpty().withMessage('task Name Cant be Empty')
        .custom(async (value) => {
            let tasks = await Task.findOne({
                taskName: value
            })
            if (tasks) {
                throw ('Task Already Exists')
            }
        }),
        body('taskPriority').isIn(['High', 'Medium', 'Low']).withMessage('Priority Must Be Test')
    ]
}

module.exports = tasksValidation