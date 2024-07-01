export interface PostDataI {
  title: string;
  university: string;
  favorite: boolean;
  content: string;
  date: Date | string;
  image: Buffer | string;
  views: number;
}
