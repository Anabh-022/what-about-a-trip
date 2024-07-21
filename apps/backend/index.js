import express from "express"
import { UserRouter } from "./Routes/User.router.js"
import cors from "cors";
import { blogRouter } from "./Routes/blogs.router.js";
const server= express()
server.use(cors())
server.use(express.json())

server.use("/api/v1/user",UserRouter)
server.use("/api/v1/blogs",blogRouter)
server.listen(3000,()=>{
    console.log(`${Date.now()} Server started at port 3000`)
})