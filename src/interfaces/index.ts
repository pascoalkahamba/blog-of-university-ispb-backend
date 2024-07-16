import { TFileModal, TKindOfFile, TPictureModal, TwhoPosted } from "../@types";

export interface IPostDataBoby {
  postData: ICreatePost;
  fileModal: TFileModal;
  pictureModal: TPictureModal;
}

export interface ICreatePost {
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
export interface AdminInfoDatabaseI {
  _id: string;
  username: string;
  email: string;
  password: string;
  __v: number;
}

export interface AdminDataI {
  _doc: AdminInfoI;
}

export interface AdminInfoResultI {
  username: string;
  email: string;
}
