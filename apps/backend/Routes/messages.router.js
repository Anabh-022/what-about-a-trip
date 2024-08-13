import { Router } from "express";
import { getMessage } from "../Controllers/messages.controller.js";
export const messageRouter = Router();

messageRouter.get("/", getMessage);
