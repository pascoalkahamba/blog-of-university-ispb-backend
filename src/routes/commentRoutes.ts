import express from "express";
import CommentController from "../controllers/commentController";
import { authMiddleware } from "../middlewares/authMiddleware";

const commentController = new CommentController();
const commentRoutes = express.Router();

commentRoutes.use(authMiddleware);

commentRoutes.post("/create/:postId", commentController.create);
commentRoutes.post("/update/:id", commentController.update);
commentRoutes.delete("/delete/:id", commentController.delete);

export { commentRoutes };
