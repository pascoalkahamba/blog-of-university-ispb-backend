import { PostDataT } from "../@types";
import { PostDataI } from "../interfaces";
import { modalPostDataSchema } from "../model/postDataSchema";

export default class UserService {
  async create(newPost: PostDataI) {
    const {
      content,
      date,
      favorite,
      image,
      title,
      university,
      views,
      isChanged,
    } = newPost;

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
      isChanged,
    });

    return posted;
  }

  async getAllPosts() {
    const allPosts = await modalPostDataSchema.find();

    return allPosts;
  }

  async getOnePost(id: string) {
    const post = await modalPostDataSchema.findOne({ _id: id });

    if (!post) {
      return;
    }

    return post;
  }

  async updatePost(id: string, newInfoPost: PostDataT) {
    const { content, image, title, university, isChanged } = newInfoPost;
    const postUpdated = await modalPostDataSchema.findOne({ _id: id });

    if (!postUpdated) {
      return;
    }

    (postUpdated.title = title),
      (postUpdated.content = content),
      (postUpdated.university = university),
      (postUpdated.image = image),
      (postUpdated.isChanged = isChanged);

    postUpdated.save();

    return postUpdated;
  }

  async deletePost(id: string) {
    const postDeleted = await modalPostDataSchema.findByIdAndDelete({
      _id: id,
    });

    if (!postDeleted) {
      return;
    }

    await postDeleted.save();

    return postDeleted;
  }
}
