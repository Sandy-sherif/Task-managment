const Task = require('../models/tasksModel')
const {validationResult} = require('express-validator')

const addTask = async (req,res)=>{
    try{
        let newTaskData = req.body
        
        let validationErrors = validationResult(req)
        if(!validationErrors.isEmpty()){
            throw(validationErrors)
        }
        await Task.create({...newTaskData})
        res.json({
            msg : 'Done'
        })
    }catch(er){
        res.json(er)
    }
}

const getAllTasks = async (req,res)=>{
    let tasks = await Task.find({})
    res.json(tasks)
}
const filtertasks = async (req,res)=>{
    const { category, date } = req.query;
    let filter={}
    if(category){
        filter.taskCategory = category;
    }
    if(date){
        const specificDate = new Date(date);
        filter.taskDueDate = specificDate;
    }
    let tasks = await Task.find(filter)
    res.json(tasks)
}

const getSingleTask = async (req,res)=>{
    let id = req.params.id
    let intendeTask = await Task.findOne({_id : id })
    res.json(intendeTask || {msg : "Not Found"})

}

const updateTask = async (req,res)=>{
    let id = req.params.id
    console.log(id)
    let newTaskData = req.body
    let updated = await Task.updateOne({_id : id},{...newTaskData})
    res.json(updated)
}

const deleteTask = async (req,res)=>{
    let id = req.params.id

    let deleted = await Task.deleteOne({_id : id})

    res.json(deleted)
}

const aggregations = async (req,res)=>{
    let page = req.query.page || 1
    let limit = 2
    let skip = (page - 1) * limit  

    let agg = await Product.find({}).limit(limit).skip(skip)

    res.json(agg)
}

module.exports = {
    addTask,
    getAllTasks,
    getSingleTask,
    updateTask,
    deleteTask,
    aggregations,
    filtertasks
}