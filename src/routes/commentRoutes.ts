import express from "express";
import CommentController from "../controllers/commentController";
import { authMiddleware } from "../middlewares/authMiddleware";

const commentController = new CommentController();
const commentRoutes = express.Router();

commentRoutes.use(authMiddleware);

commentRoutes.post("/create/:postId", commentController.create);
commentRoutes.post("/addLike/:id", commentController.addLike);
commentRoutes.post("/addUnlike/:id", commentController.addUnlike);
commentRoutes.post("/update/:id", commentController.update);
commentRoutes.delete("/delete/:id", commentController.delete);

export { commentRoutes };
