import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { DepartmentController } from "../controllers/departmentController";

const departmentController = new DepartmentController();
const departmentRoutes = express.Router();

departmentRoutes.use(authMiddleware);
departmentRoutes.post("/create", departmentController.create);
departmentRoutes.get(
  "/getAllDepartments",
  departmentController.getAllDepartments
);
departmentRoutes.get("/getAllCourses", departmentController.getAllCourses);
departmentRoutes.get(
  "/getOneDepartment/:id",
  departmentController.getOneDepartment
);
departmentRoutes.get(
  "/getAllCoursesFromDepartment/:departmentId",
  departmentController.getAllCoursesFromDepartment
);
departmentRoutes.get(
  "/getAllSubjectsFromCourse/:courseId/:subjectId",
  departmentController.getAllSubjectsFromCourse
);
departmentRoutes.post("/update/:id", departmentController.update);
departmentRoutes.delete(
  "/deleteCourseFromDepartment/:departmentId/:courseId",
  departmentController.deleteCourseFromDepartment
);
departmentRoutes.delete("/delete/:id", departmentController.delete);
departmentRoutes.delete(
  "/deleteSubjectFromCourse/:departmentId/:courseId/:subjectId",
  departmentController.deleteSubjectFromCourse
);

export { departmentRoutes };
