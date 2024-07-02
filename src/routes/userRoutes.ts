import express from "express";
import UserController from "../controllers/userController";

const userRoutes = express.Router();
const userController = new UserController();

userRoutes.post("/create", userController.create);

userRoutes.post("/updatePost/:id", userController.updatePost);
userRoutes.delete("/deletePost/:id", userController.postDeleted);
userRoutes.get("/getAllPosts", userController.getAllPosts);
userRoutes.get("/getOnePost/:id", userController.getOnePost);

export { userRoutes };
