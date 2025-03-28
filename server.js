import express from 'express'
import { connectDB } from './src/config/db.js'
import userRouter from './src/user/user.route.js'

const app = express()

const PORT = process.env.PORT || 4000

try {
    connectDB();
    console.log("Coonect To Db!!!")
} catch (error) {
    console.error(err)
    process.exit(1)
}

app.use(express.json())

app.get("/",(req,res)=>{
    res.send('Welcome to Coders Bank!')
})

app.get('/hello',(req,res)=>{
    res.send('Helloo!!!');
})

const reqLogger = (req,res,next)=>{
    console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);
    next()
}

app.use(reqLogger)


// Register routes
app.use('/api/users',userRouter)

app.get('/health',(req,res)=>{
    console.log(req.query.name)
    res.status(200).json({"messege":'Hey!I am Healthy.this is not the same format'})
})
 


app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({message:'Something wrong! '})
})

app.listen(PORT,()=>console.log(`Server is running ${PORT}`))