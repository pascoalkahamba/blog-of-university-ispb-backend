export interface PostDataI {
  title: string;
  university: string;
  favorite: boolean;
  content: string;
  date: string;
  image: string;
  isChanged?: boolean;
  // date: Date | string;
  // image: Buffer | string;
  views: number;
}
