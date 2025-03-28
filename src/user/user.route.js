import express from 'express'
import bcrypt from "bcryptjs";
import {User} from './user.model.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.get('/:userId',(req,res,next)=>{
 res.json({})
})

// /api/users/login
router.post('/login',async(req,res,next)=>{
    const {email,password} = req.body
    const user = await User.findOne({
        email
    });
    if(!user){
        const error = new Error("Invalid Credentials")
        error.statusCode = 400;

        next(error);
        return
    }
    const matched = bcrypt.compareSync(password, user.password);
    if(!matched){
        const error = new Error("email or password not matched")
        error.statusCode = 400;

        next(error);
        return
    }

    //json web token
    const token = jwt.sign(
        { userId: user._id }, 
        process.env.JWT_SECRET, // Ensure this is defined
        { expiresIn: "1h" }
      );
    res.json({token})
})

router.post('/',async(req,res,next)=>{
    const {name,email,password} = req.body

    if(!name || !email || !password){
        const error = new Error('All Fields are required')
        error.statusCode = 400
        next(error)
        // res.status(400).json({message:"All Fields are required!"})
        // return;
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const result = await User.create({
            name,
            email,
            password:hash,
         });
        res.status(201).json({ id : result._id})
    } catch (err) {
        next(err);
    }
})

export default router