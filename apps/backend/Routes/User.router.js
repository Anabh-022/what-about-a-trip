import {Router} from "express"
import bcrypt from "bcrypt" 
import {db} from "@repo/database/client"
import {signup_schema} from "schema-zod/Signup-schema"
import { login_schema } from "schema-zod/login-schema"
import jwt from "jsonwebtoken"

export const UserRouter =Router()

UserRouter.post("/login",async(req,res)=>{
    const body=req.body
    const parsedBody=login_schema.safeParse(body)
    if(!parsedBody.success){
        res.status(400).json({message:parsedBody.error.errors})
        return
    }
    const user=await db.user.findUnique({
        where:{
            userName:body.username
        }

    })
    if(!user){
        res.status(404).json({message:"User not found"});
        return;
    }
    const match = await bcrypt.compare(body.password, user.password);
    if(!match)
        {
            res.status(401).json({message:"Incorrect details"})
            return;
        }
    //res.json({message:"User logged in successfully"});
    const token = jwt.sign({ id:user.id}, 'password');
    res.json({token:token})
    

})

UserRouter.post("/signup",async(req,res)=>{
    const body=req.body
    const parsedBody=signup_schema.safeParse(body)
    console.log(body);
    if(!parsedBody.success)
    {
        res.status(400).json({message:parsedBody.error.errors})
        return;
    }
    const hashedPassword=await bcrypt.hash(body.password,10);
    let user;
    try{
        user = await db.user.create({
        data: {
         userName:body.username,
         firstName:body.firstname,
         lastName:body.lastname,
         contact:body.contact,
         email:body.email,
         password:hashedPassword
        }})
    }
    
    catch(e){
        if(e.code=='P2002'){
            res.status(400).json({message:`${e.meta.target[0]} already exists`})
            return;
        }
        console.log(e);
        res.status(400).json({mmessage:"Error in recieving user details"})
        return
    }
    const token = jwt.sign({ id:user.id}, 'password');
    res.json({token:token})
})

UserRouter.post("/delete",(req,res)=>{
    res.json({aaina:"Ankit is Brother"})
})

UserRouter.put("/edit",(req,res)=>{
    res.json({aaina:"Ankit is Brother"})
})


//auth  for ws server
UserRouter.post("/auth",(req,res)=>{
    try{
        const {tk} = req.body;
        let user=null;
        try{
            user = jwt.verify(tk,'password');
        }
        catch(e){
            return res.status(400).json({error:"Usr not found"});
        }
        
        res.json(user);
    }
    catch(e){
        console.log(`${Date.now} Error at user auth route`, e);
        res.status(500).json({msg:"Internal Server Error"});
    }
})