import express from "express";
import PostController from "../controllers/postController";
import { authMiddleware } from "../middlewares/authMiddleware";
import upload from "../config/multerConfig";
import { uploadFileMiddleware } from "../middlewares/uploadFileMiddleware";

const postController = new PostController();
const postRoutes = express.Router();

postRoutes.use(authMiddleware);

postRoutes.post(
  "/create",
  upload.single("file"),
  uploadFileMiddleware,
  postController.create
);
postRoutes.post(
  "/update/:id",
  upload.single("file"),
  uploadFileMiddleware,
  postController.update
);
postRoutes.post("/addLike/:id", postController.addLike);
postRoutes.post("/addUnlike/:id", postController.addUnlike);
postRoutes.delete("/delete/:id", postController.delete);
postRoutes.get("/allPosts", postController.getAllPosts);
postRoutes.get("/onePost/:id", postController.getOnePost);

export { postRoutes };
