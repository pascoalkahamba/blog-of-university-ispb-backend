import express from "express";
import PostController from "../controllers/postController";
import { authMiddleware } from "../middlewares/authMiddleware";

const postController = new PostController();
const postRoutes = express.Router();

postRoutes.use(authMiddleware);

postRoutes.post("/create", postController.create);
postRoutes.post("/update/:id", postController.update);
postRoutes.delete("/delete/:id", postController.delete);
postRoutes.get("/allPosts/", postController.getAllPosts);
postRoutes.get("/onePost/:id", postController.getOnePost);

export { postRoutes };
