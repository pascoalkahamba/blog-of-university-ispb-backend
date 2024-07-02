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

export interface AdminInfo {
  username: string;
  email: string;
  password: string;
}
