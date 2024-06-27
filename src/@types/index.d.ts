import { PostDataI } from "../interfaces";

type PostDataT = Omit<PostDataI, "date" | "views" | "favorite">;
