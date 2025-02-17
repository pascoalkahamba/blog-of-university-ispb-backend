import {
  TCoordinatorModal,
  TOperation,
  TStudentModal,
  TwhoPosted,
} from "../@types";

export interface IPostDataBoby {
  title: string;
  content: string;
  departmentId: number;
  whoPosted: TwhoPosted;
}

export interface ICodeStudent {
  id: number;
  code: string;
}

export interface IAddCodeStudent {
  email: string;
  code: string;
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

export interface IDepartmentData {
  id: number;
  name: string;
  courses: ICourse[];
}
export interface ICreateDepartmentData {
  name: string;
  courses: ICourse[];
}

export interface ICoordinatorData extends TCoordinatorModal {
  departmentId: number;
  courseId: number;
}

export interface ISubjects {
  id?: number;
  name: string;
}

export interface IRemoveCourseFromDepartment {
  departmentId: number;
  courseId: number;
}

export interface IRemoveSubjectFromCourse {
  departmentId: number;
  courseId: number;
  subjectId: number;
}

export interface ICourse {
  id?: number;
  name: string;
  subjects: ISubjects[];
}

export interface IAddLike {
  id: number;
  like: number;
  statusLike: boolean;
}
export interface IAddUnlike {
  id: number;
  unlike: number;
  statusUnlike: boolean;
}

export interface IUpdateProfile {
  username: string;
  password: string;
  bio: string;
  photo: IPictureModal;
  courseId: number;
  registrationNumber?: string;
  email: string;
  contact: string;
}

export interface ISaveVerificationCode {
  email: string;
  operation: TOperation;
}
export interface IValidateVerificationCode {
  email: string;
  code: string;
  operation: TOperation;
}
export interface ISendEmail {
  userEmail: string;
  validateCode: string;
  subject: string;
}

export interface IUpdateProfileCoordinator extends IUpdateProfile {
  departmentId: number;
}

export interface ILike {
  like: number;
  statusLike: boolean;
}
export interface IUnlike {
  unlike: number;
  statusUnlike: boolean;
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

export interface IGetAllSubjectsFromCourse {
  subjectId: number;
  courseId: number;
}

export interface ICreatePost {
  id?: number;
  title: string;
  content: string;
  createrPostId: number;
  whoPosted: TwhoPosted;
  departmentId: number;
}

export interface AdminInfoI {
  username: string;
  email: string;
  password: string;
}

export interface ParamsId {
  id: number;
}

export interface IStudentData extends TStudentModal {
  courseId: number;
}

export interface AdminInfoResultI {
  username: string;
  email: string;
}
