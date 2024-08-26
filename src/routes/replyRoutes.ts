import express from "express";
import ReplyController from "../controllers/replyController";
import { authMiddleware } from "../middlewares/authMiddleware";

const replyController = new ReplyController();
const replyRoutes = express.Router();

replyRoutes.use(authMiddleware);

replyRoutes.post("/create/:commentId", replyController.create);
replyRoutes.post("/update/:id", replyController.update);
replyRoutes.delete("/delete/:id", replyController.delete);

export { replyRoutes };
