import { AdminInfo, PostDataI } from "../interfaces";

type PostDataT = Omit<PostDataI, "date" | "views" | "favorite">;
type AdminInfoLoginT = Omit<AdminInfo, "username">;
type PathErrorT = "username" | "email" | "password";
