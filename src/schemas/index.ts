import { z as zod } from "zod";

const createAdminSchema = zod.object({
  username: zod.string().min(6),
  password: zod.string().min(6),
  email: zod.string().email(),
  emailAlreadyExist: zod.string().email(),
  contact: zod.number().min(9),
});

export { createAdminSchema };
