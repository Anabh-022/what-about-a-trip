import express from "express"
import { UserRouter } from "./Routes/User.router.js"
import cors from "cors";
import { blog_router } from "./Routes/blogs.router.js";
const server= express()
server.use(cors())
server.use(express.json())

server.use("/api/v1/user",UserRouter)
server.use("/api/v1/blogs",blog_router)
server.listen(3000)