import { z as zod } from "zod";

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
};
