import { TFileModal, TKindOfFile, TPictureModal, TwhoPosted } from "../@types";

export interface IPostDataBoby {
  postData: ICreatePost;
  fileModal: TFileModal;
  pictureModal: TPictureModal;
}

export interface ICreatePost {
  id?: number;
  title: string;
  content: string;
  kindOfFile: TKindOfFile;
  createrPostId: number;
  whoPosted: TwhoPosted;
  nameOfDepartment: string;
}

export interface AdminInfoI {
  username: string;
  email: string;
  password: string;
}

export interface ParamsId {
  id: number;
}

export interface AdminInfoResultI {
  username: string;
  email: string;
}
