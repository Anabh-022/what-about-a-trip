import express from "express"
import { UserRouter } from "./Routes/User.router.js"
import cors from "cors";
import { blogRouter } from "./Routes/blogs.router.js";
import { messageRouter } from "./Routes/messages.router.js";
import { itenaryRouter } from "./Routes/itenary.router.js";
const server = express()
server.use(cors())
server.use(express.json())

server.use("/api/v1/user", UserRouter)
server.use("/api/v1/blogs", blogRouter)
server.use("/api/v1/messages", messageRouter)
server.use("/api/v1/itenary", itenaryRouter)
server.listen(3000, () => {
  console.log(`${Date.now()} Server started at port 3000`)
})
