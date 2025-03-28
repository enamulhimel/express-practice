import express from 'express'
import {User} from './user.model.js'

const router = express.Router()

router.post('/',async(req,res,next)=>{
    const {name,email,password} = req.body

    if(!name || !email || !password){
        next(new Error('All Fields are required'))
        // res.status(400).json({message:"All Fields are required!"})
        // return;
    }
    
    const result = await User.create({
        name,
        email,
        password
     })
     console.log(result)
    res.status(201).json({ id : result._id})
})

export default router