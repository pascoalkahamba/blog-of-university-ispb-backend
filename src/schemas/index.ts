import { z as zod } from "zod";

const createAdminSchema = zod.object({
  username: zod.string().min(6),
  password: zod.string().min(6),
  email: zod.string().email(),
  contact: zod.string().min(9).max(9),
});

const loginAdminSchema = zod.object({
  password: zod.string().min(6),
  email: zod.string().email(),
});

export { createAdminSchema, loginAdminSchema };
