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

export {
  createAdminSchema,
  loginAdminSchema,
  deleteCoordinatorSchema,
  createCoordinatorSchema,
  loginCoordinatorSchema,
  loginStudentSchema,
};
