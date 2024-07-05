import { Router } from "express";
import { publishController,idController,bulkController } from "../Controllers/blog.controller";

export const blogRouter=Router();
blogRouter.post("/publish",publishController);
blogRouter.get("/bluk"),bulkController;
blogRouter.get("/:id",idController);

