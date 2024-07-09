import { Admin, Student, Coordinator } from "@prisma/client";

export type DataBaseExtraValues = "createdAt" | "updatedAt" | "id" | "role";

export type TAdminModal = Omit<Admin, DataBaseExtraValues>;
export type TStudentModal = Omit<Student, DataBaseExtraValues>;
export type TCoordinatorModal = Omit<Coordinator, DataBaseExtraValues>;
