const mongoose = require('mongoose')

const tasksSchema = mongoose.Schema({
    taskName : {type : String },
    taskDueDate : {type : Date},
    taskPriority : {type : String, enum : ['High','Medium','Low']},
    taskStage : {type : String },
    taskDiscription : {type : String },
})

const taskModel = mongoose.model('Task',tasksSchema)

module.exports = taskModel