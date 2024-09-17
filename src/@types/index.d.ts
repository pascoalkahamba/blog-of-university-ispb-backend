import { Admin, Student, Coordinator, Post, File } from "@prisma/client";
import { IUpdateProfile, IUpdateProfileCoordinator } from "../interfaces";

export type TDataBaseExtraValues = "createdAt" | "updatedAt" | "id" | "role";
export type TJsonWebTokenError = "jwt malformed" | "jwt must be provided";
export type TwhoPosted = "admin" | "coordinator" | "student";
export type TKindOfFile = "file" | "photo" | "nothing";
export type TPathError =
  | "email"
  | "password"
  | "contact"
  | "username"
  | "bio"
  | "emailNotFound"
  | "emailAlreadyExist"
  | "registrationNumber"
  | "content"
  | "createrPostId"
  | "kindOfFile"
  | "like"
  | "departmentId"
  | "courseId"
  | "subjects"
  | "courses"
  | "statusLike"
  | "statusUnlike"
  | "unlike"
  | "title"
  | "nameOfDepartment"
  | "whoPosted"
  | "whoCreator"
  | "mimeType"
  | "name"
  | "postId"
  | "size"
  | "id"
  | "code"
  | "operation"
  | "width"
  | "height";

export type TAdminModal = Omit<Admin, TDataBaseExtraValues>;
export type TAdminInfoUpdate = Omit<
  IUpdateProfile,
  "courseId" | "departmentId"
>;
export type TCoordinatorInfoUpdate = Omit<
  IUpdateProfileCoordinator,
  "registrationNumber"
>;
export type TFileModal = Omit<File, TDataBaseExtraValues>;
export type TOperation = "resetPassword" | "deleteAccount";
export type TCreatePost = Pick<Post, "title" | "content" | "adminId">;
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
