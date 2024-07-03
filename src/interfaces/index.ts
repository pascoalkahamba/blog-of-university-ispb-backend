export interface PostDataI {
  title: string;
  college: string;
  favorite: boolean;
  content: string;
  date: string;
  image: string;
  isChanged?: boolean;
  // date: Date | string;
  // image: Buffer | string;
  views: number;
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
