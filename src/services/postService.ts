import {
  IAddLike,
  IAddUnlike,
  ICreatePost,
  IPictureModal,
} from "../interfaces";
import { prismaService } from "./prismaService";

export default class PostService {
  async createPost(createPost: ICreatePost, pictureModal: IPictureModal) {
    const { content, title, departmentId, createrPostId, whoPosted } =
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
          likes: 0,
          unlikes: 0,
          statusLike: false,
          statusUnlike: false,
          admin: {
            connect: {
              id: createrPostId,
            },
          },
          picture: {
            create: {
              url: pictureModal.url ? pictureModal.url : "",
              name: pictureModal.name ? pictureModal.name : "",
            },
          },
          department: {
            connect: {
              id: departmentId,
            },
          },
        },
        select: {
          title: true,
          content: true,
          favorite: true,
          views: true,
          createdAt: true,
          comments: true,
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
        likes: 0,
        unlikes: 0,
        statusLike: false,
        statusUnlike: false,
        coordinator: {
          connect: {
            id: createrPostId,
          },
        },
        picture: {
          create: {
            url: pictureModal.url ? pictureModal.url : "",
            name: pictureModal.name ? pictureModal.name : "",
          },
        },
        department: {
          connect: {
            id: departmentId,
          },
        },
      },
      select: {
        title: true,
        content: true,
        favorite: true,
        views: true,
        createdAt: true,
        comments: true,
        updatedAt: true,
        adminId: true,
        coordinatorId: true,
        picture: true,
        department: true,
      },
    });

    return postCoordinator;
  }

  async updatePost(createPost: ICreatePost, pictureModal: IPictureModal) {
    const { content, title, departmentId, id } = createPost;

    const postTitle = await prismaService.prisma.post.findFirst({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        favorite: true,
        views: true,
        createdAt: true,
        updatedAt: true,
        comments: true,
        adminId: true,
        coordinatorId: true,
        picture: true,
        department: true,
      },
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
            url: pictureModal?.url ? pictureModal.url : postTitle.picture?.url,
            name: pictureModal?.name
              ? pictureModal.name
              : postTitle.picture?.name,
          },
        },
        departmentId: departmentId,
      },
      select: {
        title: true,
        content: true,
        favorite: true,
        views: true,
        createdAt: true,
        updatedAt: true,
        comments: true,
        adminId: true,
        coordinatorId: true,
        picture: true,
        department: true,
      },
    });

    return postUpdated;
  }

  async addLike({ id, like, statusLike }: IAddLike) {
    const post = await prismaService.prisma.post.findFirst({
      where: { id },
    });

    if (!post) {
      return;
    }
    const postLiked = await prismaService.prisma.post.update({
      where: { id },
      data: {
        likes: like,
        statusLike,
      },
    });

    return postLiked;
  }

  async addUnlike({ id, unlike, statusUnlike }: IAddUnlike) {
    const post = await prismaService.prisma.post.findFirst({
      where: { id },
    });

    if (!post) {
      return;
    }
    const postUnLiked = await prismaService.prisma.post.update({
      where: { id },
      data: {
        unlikes: unlike,
        statusUnlike,
      },
    });

    return postUnLiked;
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

  async getAllPosts(departmentId: number | null) {
    if (departmentId) {
      const allPostsDepartments = await prismaService.prisma.post.findMany({
        where: { departmentId },
        select: {
          id: true,
          title: true,
          content: true,
          favorite: true,
          views: true,
          createdAt: true,
          comments: true,
          updatedAt: true,
          adminId: true,
          likes: true,
          unlikes: true,
          statusLike: true,
          statusUnlike: true,
          department: true,

          admin: {
            select: {
              id: true,
              username: true,
              role: true,
              profile: {
                select: {
                  id: true,
                  photo: true,
                  adminId: true,
                  coordinatorId: true,
                  studentId: true,
                },
              },
            },
          },
          coordinator: {
            select: {
              id: true,
              username: true,
              role: true,
              profile: {
                select: {
                  id: true,
                  photo: true,
                  adminId: true,
                  coordinatorId: true,
                  studentId: true,
                },
              },
            },
          },
          coordinatorId: true,
          picture: true,
        },
      });

      return allPostsDepartments;
    }
    const allPosts = await prismaService.prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        favorite: true,
        views: true,
        createdAt: true,
        comments: true,
        updatedAt: true,
        adminId: true,
        likes: true,
        unlikes: true,
        statusLike: true,
        statusUnlike: true,
        department: true,

        admin: {
          select: {
            id: true,
            username: true,
            role: true,
            profile: {
              select: {
                id: true,
                photo: true,
                adminId: true,
                coordinatorId: true,
                studentId: true,
              },
            },
          },
        },
        coordinator: {
          select: {
            id: true,
            username: true,
            role: true,
            profile: {
              select: {
                id: true,
                photo: true,
                adminId: true,
                coordinatorId: true,
                studentId: true,
              },
            },
          },
        },
        coordinatorId: true,
        picture: true,
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
        statusLike: true,
        statusUnlike: true,
        views: true,
        comments: {
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            statusLike: true,
            statusUnlike: true,
            content: true,
            replies: {
              select: {
                id: true,
                commentId: true,
                content: true,
                likes: true,
                unlikes: true,
                statusLike: true,
                statusUnlike: true,
                createdAt: true,
                updatedAt: true,
                admin: {
                  select: {
                    id: true,
                    username: true,
                    profile: {
                      select: {
                        id: true,
                        photo: true,
                        adminId: true,
                        coordinatorId: true,
                        studentId: true,
                      },
                    },
                    role: true,
                  },
                },
                student: {
                  select: {
                    id: true,
                    username: true,
                    profile: {
                      select: {
                        id: true,
                        photo: true,
                        adminId: true,
                        coordinatorId: true,
                        studentId: true,
                      },
                    },
                    role: true,
                    registrationNumber: true,
                  },
                },
                coordinatorId: true,
                adminId: true,
                studentId: true,
                coordinator: {
                  select: {
                    id: true,
                    username: true,
                    profile: {
                      select: {
                        id: true,
                        photo: true,
                        adminId: true,
                        coordinatorId: true,
                        studentId: true,
                      },
                    },
                    role: true,
                  },
                },
              },
            },
            likes: true,
            unlikes: true,
            adminId: true,
            admin: {
              select: {
                id: true,
                username: true,
                profile: {
                  select: {
                    id: true,
                    photo: true,
                    adminId: true,
                    coordinatorId: true,
                    studentId: true,
                  },
                },
                role: true,
              },
            },
            coordinatorId: true,
            coordinator: {
              select: {
                id: true,
                username: true,
                profile: {
                  select: {
                    id: true,
                    photo: true,
                    adminId: true,
                    coordinatorId: true,
                    studentId: true,
                  },
                },
                role: true,
              },
            },
            studentId: true,
            student: {
              select: {
                id: true,
                username: true,
                profile: {
                  select: {
                    id: true,
                    photo: true,
                    adminId: true,
                    coordinatorId: true,
                    studentId: true,
                  },
                },
                role: true,
              },
            },
          },
        },
        createdAt: true,
        updatedAt: true,
        adminId: true,
        likes: true,
        unlikes: true,
        admin: {
          select: {
            id: true,
            username: true,
            role: true,
            profile: {
              select: {
                id: true,
                photo: true,
                adminId: true,
                coordinatorId: true,
                studentId: true,
              },
            },
          },
        },
        coordinator: {
          select: {
            id: true,
            username: true,
            role: true,
            profile: {
              select: {
                id: true,
                photo: true,
                adminId: true,
                coordinatorId: true,
                studentId: true,
              },
            },
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

  async getAllPostsFromDepartment(departmentId: number) {
    if (!departmentId) return;
    const posts = await prismaService.prisma.post.findMany({
      where: { departmentId },
    });

    return posts;
  }
}
