const mongoose = require('mongoose')

const tasksSchema = mongoose.Schema({
    taskName : {type : String },
    taskDueDate : {type : Date},
    taskPriority : {type : String, enum : ['High','Medium','Low']},
    taskStage : {type : String, enum : ['Finished','Not started'] },
    taskDiscription : {type : String },
    taskCategory : {type : String, enum : ['Work','Family','Freelance work','Confernce planning']},
    taskNotfication:{type: String}
})

const taskModel = mongoose.model('Task',tasksSchema)

module.exports = taskModel