import { Router } from "express";
import { getMessage } from "../Controllers/messages.controller.js";
import { authUser } from "../middleware/auth.js";
export const messageRouter = Router();

messageRouter.get("/", authUser, getMessage);
