import express from "express";
import UserController from "../controllers/userController";

const userRoutes = express.Router();
const userController = new UserController();

userRoutes.post("/create", userController.create);

userRoutes.post("/updatePost/:id", userController.updatePost);

userRoutes.post(
  "/changeOneFavoritePost/:id",
  userController.changeOneFavoritePost
);
userRoutes.delete("/deletePost/:id", userController.postDeleted);
userRoutes.get("/allPosts", userController.allPosts);
userRoutes.get("/onePost/:id", userController.onePost);
userRoutes.get("/favoritePosts/:favorite", userController.favoritePosts);
userRoutes.get(
  "/favoritePostsOfCollege/:favorite",
  userController.favoritePostsOfCollege
);
userRoutes.get("/collegeOfPosts/", userController.collegeOfPosts);

export { userRoutes };
