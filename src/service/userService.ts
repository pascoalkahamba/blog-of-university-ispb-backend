import { PostDataT } from "../@types";
import { PostDataI } from "../interfaces";
import { modalPostDataSchema } from "../model/postDataSchema";

export default class UserService {
  async create(newPost: PostDataI) {
    const { content, date, favorite, image, title, college, views, isChanged } =
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
      college,
      views,
      isChanged,
    });

    return posted;
  }

  async allPosts() {
    const allPosts = await modalPostDataSchema.find();

    return allPosts;
  }

  async onePost(id: string) {
    const post = await modalPostDataSchema.findOne({ _id: id });

    if (!post) {
      console.log("One post ", post);
      return;
    }

    return post;
  }

  async updatePost(id: string, newInfoPost: PostDataT) {
    const { content, image, title, college, isChanged } = newInfoPost;
    const postUpdated = await modalPostDataSchema.findOne({ _id: id });

    if (!postUpdated) {
      return;
    }

    (postUpdated.title = title),
      (postUpdated.content = content),
      (postUpdated.college = college),
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

    return postDeleted;
  }

  async favoritePosts(favorite: boolean) {
    const bestPosts = await modalPostDataSchema.find({ favorite });

    return bestPosts;
  }

  async favoritePostsOfOneCollege(favorite: boolean, college: string) {
    const bestPostsOfCollege = await modalPostDataSchema.find({
      favorite,
      college,
    });

    return bestPostsOfCollege;
  }

  async collegePosts(college: string) {
    const collegePosts = await modalPostDataSchema.find({ college });

    return collegePosts;
  }
}
