import { ICreatePost, IPictureModal } from "../interfaces";
import { prismaService } from "./prismaService";

export default class PostService {
  async createPost(
    createPost: ICreatePost,
    pictureModal: IPictureModal | undefined
  ) {
    const { content, title, nameOfDepartment, createrPostId, whoPosted } =
      createPost;

    const postTitle = await prismaService.prisma.post.findFirst({
      where: { title },
    });

    if (postTitle) {
      return;
    }

    if (whoPosted === "admin") {
      const postAdmin = await prismaService.prisma.post.create({
        data: {
          title,
          content,
          admin: {
            connect: {
              id: createrPostId,
            },
          },
          picture: {
            create: {
              url: pictureModal ? pictureModal.url : "",
              name: pictureModal ? pictureModal.name : "",
            },
          },
          department: {
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
          picture: true,
          department: true,
        },
      });

      return postAdmin;
    }

    const postCoordinator = await prismaService.prisma.post.create({
      data: {
        title,
        content,
        coordinator: {
          connect: {
            id: createrPostId,
          },
        },
        picture: {
          create: {
            url: pictureModal ? pictureModal.url : "",
            name: pictureModal ? pictureModal.name : "",
          },
        },
        department: {
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
        picture: true,
        department: true,
      },
    });

    return postCoordinator;
  }

  async updatePost(
    createPost: ICreatePost,
    pictureModal: IPictureModal | undefined
  ) {
    const { content, title, nameOfDepartment, id } = createPost;

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
        picture: {
          update: {
            url: pictureModal ? pictureModal.url : "",
            name: pictureModal ? pictureModal.name : "",
          },
        },
        department: {
          update: {
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
        picture: true,
        department: true,
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
    const allPosts = await prismaService.prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        favorite: true,
        views: true,
        createdAt: true,
        updatedAt: true,
        adminId: true,
        likes: true,
        unlikes: true,
        admin: {
          select: {
            username: true,
            role: true,
            profile: true,
          },
        },
        coordinator: {
          select: {
            username: true,
            role: true,
            profile: true,
          },
        },
        coordinatorId: true,
        picture: true,
        department: true,
      },
    });

    return allPosts;
  }

  async getOnePost(id: number) {
    const onePost = await prismaService.prisma.post.findFirst({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        favorite: true,
        views: true,
        createdAt: true,
        updatedAt: true,
        adminId: true,
        likes: true,
        unlikes: true,
        admin: {
          select: {
            username: true,
            role: true,
            profile: true,
          },
        },
        coordinator: {
          select: {
            username: true,
            role: true,
            profile: true,
          },
        },
        coordinatorId: true,
        picture: true,
        department: true,
      },
    });

    if (!onePost) {
      return;
    }

    return onePost;
  }
}
