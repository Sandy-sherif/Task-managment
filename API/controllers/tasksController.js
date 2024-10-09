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
    res.json(products)
}

const getSingleTask = async (req,res)=>{
    let id = req.params.id
    let intendeTask = await Task.findOne({_id : id })
    res.json(intendeProduct || {msg : "Not Found"})

}

const updateTask = async (req,res)=>{
    let id = req.params.id
    let newTaskData = req.body
    let updated = await Task.updateOne({_id : id},{...newTaskData, $inc : {__v : 1}})
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
    aggregations
}