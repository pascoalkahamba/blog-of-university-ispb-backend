import { z as zod } from "zod";
import { TKindOfFile, TwhoPosted } from "../@types";

const createAdminSchema = zod.object({
  username: zod.string().min(6),
  password: zod.string().min(6),
  email: zod.string().email(),
  contact: zod.string().min(9).max(9),
});

const createCoordinatorSchema = zod.object({
  username: zod.string().min(6),
  password: zod.string().min(6),
  department: zod.string().min(6),
  email: zod.string().email(),
  contact: zod.string().min(9).max(9),
});

const createStudentSchema = zod.object({
  username: zod.string().min(6),
  password: zod.string().min(6),
  registrationNumber: zod.string().min(3),
  email: zod.string().email(),
  contact: zod.string().min(9).max(9),
});

const createPostSchema = zod.object({
  title: zod.string().min(6),
  content: zod.string().min(6),
  kindOfFile: zod.string().min(4) as zod.ZodType<TKindOfFile>,
  createrPostId: zod.number(),
  whoPosted: zod.string().min(6) as zod.ZodType<TwhoPosted>,
  nameOfDepartment: zod.string().min(6),
});

const fileModalSchema = zod.object({
  name: zod.string().min(6),
  mimeType: zod.string().min(6),
  size: zod.number(),
  content: zod.string().min(6) as unknown as zod.ZodType<Buffer>,
  postId: zod.number(),
});

const pictureModalSchema = zod.object({
  content: zod.string().min(6) as unknown as zod.ZodType<Buffer>,
  mimeType: zod.string().min(6),
  size: zod.number(),
  postId: zod.number(),
  height: zod.number(),
  width: zod.number(),
});

const loginAdminSchema = zod.object({
  password: zod.string().min(6),
  email: zod.string().email(),
});
const loginStudentSchema = zod.object({
  password: zod.string().min(6),
  email: zod.string().email(),
});
const loginCoordinatorSchema = zod.object({
  password: zod.string().min(6),
  email: zod.string().email(),
});

const deleteCoordinatorSchema = zod.object({
  email: zod.string().email(),
});
const deletePostSchema = zod.object({
  id: zod.number(),
});

const deleteStudentSchema = zod.object({
  registrationNumber: zod.string().min(2),
});

export {
  createAdminSchema,
  loginAdminSchema,
  deleteCoordinatorSchema,
  createCoordinatorSchema,
  loginCoordinatorSchema,
  loginStudentSchema,
  deleteStudentSchema,
  createStudentSchema,
  createPostSchema,
  fileModalSchema,
  pictureModalSchema,
  deletePostSchema,
};
