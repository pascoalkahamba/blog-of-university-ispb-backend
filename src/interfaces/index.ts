import { TwhoPosted } from "../@types";

export interface IPostDataBoby {
  title: string;
  content: string;
  nameOfDepartment: string;
  whoPosted: TwhoPosted;
}

export interface ICommentDataBoby {
  content: string;
  postId: number;
  creatorId: number;
  whoCreator: TwhoPosted;
}
export interface IReplyData {
  content: string;
  commentId: number;
  creatorId: number;
  whoCreator: TwhoPosted;
}
export interface IReplyDataBoby {
  content: string;
  whoCreator: TwhoPosted;
}
export interface IUpdateCommentDataBoby {
  content: string;
}
// export interface IPostDataBoby {
//   postData: ICreatePost;
//   fileModal: TFileModal;
//   pictureModal: IPictureModal;
// }

export interface IPictureModal {
  name: string;
  url: string;
}

export interface ICreatePost {
  id?: number;
  title: string;
  content: string;
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
