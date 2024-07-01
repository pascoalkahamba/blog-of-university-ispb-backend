import { PostDataI } from "../interfaces";
import { modalPostDataSchema } from "../model/postDataSchema";

export default class UserService {
  async create(newPost: PostDataI) {
    const { content, date, favorite, image, title, university, views } =
      newPost;

    const post = await modalPostDataSchema.findOne({ title });

    if (post) {
      return;
    }
    const posted = await modalPostDataSchema.create({
      title,
      content,
      date,
      favorite,
      image,
      university,
      views,
    });

    return posted;
  }
}
