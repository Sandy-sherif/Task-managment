const express = require('express')
const app = express()
const tasksRoutes = require('./routes/tasksRoutes')
const usersRoutes = require('./routes/usersRoutes')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const path = require('node:path')
const dotenv = require('dotenv')
dotenv.config()

const cors = require('cors');


// Enable all CORS requests
app.use(cors({
    origin: 'https://taupe-twilight-58f5e5.netlify.app', // Allow requests only from your Netlify frontend
    methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE'], // HTTP methods you want to allow
    credentials: true, // Allow cookies if needed
  }));
app.listen(process.env.PORT,()=>{
    console.log('Server Started');
})

mongoose.connect(process.env.DB)
.then(()=>{
    console.log('DB Connected');
})

app.use(express.static(path.join(__dirname,'')))
app.use(express.json())
app.use(cookieParser())

app.use('/users',usersRoutes)
app.use('/tasks',tasksRoutes)