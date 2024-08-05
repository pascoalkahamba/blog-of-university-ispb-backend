import { ICreatePost, IPictureModal } from "../interfaces";
import { prismaService } from "./prismaService";

export default class PostService {
  async createPost(
    createPost: ICreatePost,
    pictureModal: IPictureModal | undefined
  ) {
    const { createrPostId, content, title, whoPosted, nameOfDepartment } =
      createPost;

    const postTitle = await prismaService.prisma.post.findFirst({
      where: { title },
    });

    if (postTitle) {
      return;
    }

    const post = await prismaService.prisma.post.create({
      data: {
        title,
        content,
        adminId: whoPosted === "admin" ? createrPostId : null,
        coordinatorId: whoPosted === "coordinator" ? createrPostId : null,
        picure: {
          create: {
            url: pictureModal ? pictureModal.url : "",
            name: pictureModal ? pictureModal.name : "",
            adminId: whoPosted === "admin" ? createrPostId : null,
            coordinatorId: whoPosted === "coordinator" ? createrPostId : null,
          },
        },
        departments: {
          create: {
            name: nameOfDepartment,
          },
        },
      },
      select: {
        title: true,
        content: true,
        favorite: true,
        views: true,
        createdAt: true,
        updatedAt: true,
        adminId: true,
        coordinatorId: true,
        picure: true,
        departments: true,
      },
    });

    return post;
  }

  async updatePost(
    createPost: ICreatePost,
    pictureModal: IPictureModal | undefined
  ) {
    const { createrPostId, content, title, whoPosted, nameOfDepartment, id } =
      createPost;

    const postTitle = await prismaService.prisma.post.findFirst({
      where: { id },
    });

    if (!postTitle) {
      return;
    }

    const postUpdated = await prismaService.prisma.post.update({
      where: { id: postTitle.id },
      data: {
        title,
        content,
        adminId: whoPosted === "admin" ? createrPostId : null,
        coordinatorId: whoPosted === "coordinator" ? createrPostId : null,
        picure: {
          create: {
            url: pictureModal ? pictureModal.url : "",
            name: pictureModal ? pictureModal.name : "",
            adminId: whoPosted === "admin" ? createrPostId : null,
            coordinatorId: whoPosted === "coordinator" ? createrPostId : null,
          },
        },
        departments: {
          create: {
            name: nameOfDepartment,
          },
        },
      },
      select: {
        title: true,
        content: true,
        favorite: true,
        views: true,
        createdAt: true,
        updatedAt: true,
        adminId: true,
        coordinatorId: true,
        picure: true,
        departments: true,
      },
    });

    return postUpdated;
  }

  async deletePost(id: number) {
    const post = await prismaService.prisma.post.findFirst({
      where: { id },
    });

    if (!post) {
      return;
    }

    const postDeleted = await prismaService.prisma.post.delete({
      where: { id },
    });

    return postDeleted;
  }

  async getAllPosts() {
    const allPosts = await prismaService.prisma.post.findMany();

    return allPosts;
  }

  async getOnePost(id: number) {
    const onePost = await prismaService.prisma.post.findFirst({
      where: { id },
    });

    if (!onePost) {
      return;
    }

    return onePost;
  }
}
