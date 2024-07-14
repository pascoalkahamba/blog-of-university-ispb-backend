import {
  Admin,
  Student,
  Coordinator,
  Post,
  File,
  Picture,
} from "@prisma/client";

export type TDataBaseExtraValues = "createdAt" | "updatedAt" | "id" | "role";
export type TJsonWebTokenError = "jwt malformed" | "jwt must be provided";
export type TwhoPosted = "admin" | "coordinator";
export type TKindOfFile = "file" | "photo" | "nothing";
export type TPathError =
  | "email"
  | "password"
  | "contact"
  | "username"
  | "emailNotFound"
  | "emailAlreadyExist"
  | "registrationNumber";

export type TAdminModal = Omit<Admin, TDataBaseExtraValues>;
export type TPictureModal = Omit<Picture, TDataBaseExtraValues>;
export type TFileModal = Omit<File, TDataBaseExtraValues>;
export type TCreatePostAdmin = Pick<Post, "title" | "content" | "adminId">;
export type TAdminLogin = Pick<Admin, "email" | "password">;
export type TCoordinatorLogin = Pick<Coordinator, "email" | "password">;
export type TStudentLogin = Pick<Student, "email" | "password">;
export type TKindsOfRole = "USER" | "ADMIN" | "COORDINATOR";

export type TStudentModal = Omit<
  Student,
  TDataBaseExtraValues | "blocked" | "blockedQuantity" | "active" | "year"
>;
export type TCoordinatorModal = Omit<
  Coordinator,
  TDataBaseExtraValues | "blocked" | "blockedQuantity" | "departmentId"
>;
