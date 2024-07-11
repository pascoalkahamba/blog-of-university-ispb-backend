import { Admin, Student, Coordinator } from "@prisma/client";

export type TDataBaseExtraValues = "createdAt" | "updatedAt" | "id" | "role";
export type TJsonWebTokenError = "jwt malformed" | "jwt must be provided";
export type TPathError =
  | "email"
  | "password"
  | "contact"
  | "username"
  | "emailNotFound"
  | "emailAlreadyExist";

export type TAdminModal = Omit<Admin, TDataBaseExtraValues>;
export type TAdminLogin = Pick<Admin, "email" | "password">;
export type TKindsOfRole = "USER" | "ADMIN" | "COORDINATOR";

export type TStudentModal = Omit<Student, DataBaseExtraValues>;
export type TCoordinatorModal = Omit<Coordinator, DataBaseExtraValues>;
