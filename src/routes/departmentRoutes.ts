import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { DepartmentController } from "../controllers/departmentController";

const departmentController = new DepartmentController();
const departmentRoutes = express.Router();

departmentRoutes.use(authMiddleware);
departmentRoutes.post("/create", departmentController.create);
departmentRoutes.post("/update/:id", departmentController.update);
departmentRoutes.delete(
  "/deleteCourseFromDepartment/:departmentId/:courseId",
  departmentController.deleteCourseFromDepartment
);
departmentRoutes.delete(
  "/deleteSubjectFromCourse/:departmentId/:courseId/:subjectId",
  departmentController.deleteSubjectFromCourse
);

export { departmentRoutes };
