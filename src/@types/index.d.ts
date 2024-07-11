import { Admin, Student, Coordinator } from "@prisma/client";

export type DataBaseExtraValues = "createdAt" | "updatedAt" | "id" | "role";
export type TPathError = "email" | "password" | "contact" | "username";

export type TAdminModal = Omit<Admin, DataBaseExtraValues>;
export type TAdminLogin = Pick<Admin, "email" | "password">;
export type TKindsOfRole = "USER" | "ADMIN" | "COORDINATOR";

export type TStudentModal = Omit<Student, DataBaseExtraValues>;
export type TCoordinatorModal = Omit<Coordinator, DataBaseExtraValues>;
