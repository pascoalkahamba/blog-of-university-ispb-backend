import { AdminInfo, PostDataI } from "../interfaces";

type PostDataT = Omit<PostDataI, "date" | "views" | "favorite">;
type AdminInfoLogin = Omit<AdminInfo, "username">;
