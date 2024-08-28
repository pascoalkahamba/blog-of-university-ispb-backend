import { z as zod } from "zod";
import { TwhoPosted } from "../@types";

const createAdminSchema = zod.object({
  username: zod.string().min(6),
  password: zod.string().min(6),
  email: zod.string().email(),
  contact: zod.string().min(9).max(9),
});

const envSchema = zod.object({
  MONGODBCONNECTION: zod.string(),
  PORT: zod.string(),
  DATABASE_URL: zod.string(),
  gsBucket: zod.string().min(6),
  apiKey: zod.string().min(5),
  authDomain: zod.string().min(5),
  projectId: zod.string().min(5),
  storageBucket: zod.string().min(5),
  messagingSenderId: zod.string().min(5),
  appId: zod.string().min(5),
  measurementId: zod.string().min(5),
  JWT_SECRET_KEY: zod.string(),
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
  content: zod.string().min(20),
  whoPosted: zod.string().min(5) as zod.ZodType<TwhoPosted>,
  nameOfDepartment: zod.string().min(6),
});
const createCommentSchema = zod.object({
  content: zod.string(),
  whoCreator: zod.string().min(5) as zod.ZodType<TwhoPosted>,
});
const updateCommentSchema = zod.object({
  content: zod.string(),
});

const fileModalSchema = zod.object({
  name: zod.string().min(6),
  deppartmentId: zod.number(),
});

const pictureModalSchema = zod.object({
  adminId: zod.number() || zod.undefined(),
  coordinatorId: zod.number() || zod.undefined(),
  name: zod.string(),
  url: zod.string().url(),
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

const addLikeSchema = zod.object({
  like: zod.number(),
});
const addUnlikeSchema = zod.object({
  unlike: zod.number(),
});

export {
  createAdminSchema,
  loginAdminSchema,
  deleteCoordinatorSchema,
  createCoordinatorSchema,
  loginCoordinatorSchema,
  loginStudentSchema,
  envSchema,
  addLikeSchema,
  addUnlikeSchema,
  deleteStudentSchema,
  createStudentSchema,
  createPostSchema,
  fileModalSchema,
  pictureModalSchema,
  createCommentSchema,
  updateCommentSchema,
  deletePostSchema,
};
