import { ICommentDataBoby } from "../interfaces";
import { prismaService } from "./prismaService";

export default class CommentService {
  async create({ content, creatorId, postId, whoCreator }: ICommentDataBoby) {
    if (whoCreator === "admin") {
      const adminComment = await prismaService.prisma.comment.create({
        data: {
          content,
          likes: 0,
          unlikes: 0,
          post: {
            connect: {
              id: postId,
            },
          },
          admin: {
            connect: {
              id: creatorId,
            },
          },
        },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          replies: true,
          likes: true,
          content: true,
          postId: true,
          unlikes: true,
          adminId: true,
          admin: {
            select: {
              id: true,
              username: true,
              profile: true,
              email: true,
              role: true,
              contact: true,
            },
          },
          coordinator: {
            select: {
              id: true,
              username: true,
              profile: true,
              email: true,
              role: true,
              contact: true,
            },
          },
          coordinatorId: true,
          student: {
            select: {
              id: true,
              username: true,
              profile: true,
              email: true,
              role: true,
              contact: true,
              registrationNumber: true,
            },
          },
          studentId: true,
        },
      });

      return adminComment;
    }
    if (whoCreator === "coordinator") {
      const coordinatorComment = await prismaService.prisma.comment.create({
        data: {
          content,
          likes: 0,
          unlikes: 0,
          post: {
            connect: {
              id: postId,
            },
          },
          coordinator: {
            connect: {
              id: creatorId,
            },
          },
        },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          likes: true,
          postId: true,
          content: true,
          unlikes: true,
          adminId: true,
          replies: true,
          admin: {
            select: {
              id: true,
              username: true,
              profile: true,
              email: true,
              role: true,
              contact: true,
            },
          },
          coordinator: {
            select: {
              id: true,
              username: true,
              profile: true,
              email: true,
              role: true,
              contact: true,
            },
          },
          coordinatorId: true,
          student: {
            select: {
              id: true,
              username: true,
              profile: true,
              email: true,
              role: true,
              contact: true,
              registrationNumber: true,
            },
          },
          studentId: true,
        },
      });

      return coordinatorComment;
    }
    if (whoCreator === "studant") {
      const studantComment = await prismaService.prisma.comment.create({
        data: {
          content,
          likes: 0,
          unlikes: 0,
          post: {
            connect: {
              id: postId,
            },
          },
          student: {
            connect: {
              id: creatorId,
            },
          },
        },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          replies: true,
          likes: true,
          content: true,
          unlikes: true,
          postId: true,
          adminId: true,
          admin: {
            select: {
              id: true,
              username: true,
              profile: true,
              email: true,
              role: true,
              contact: true,
            },
          },
          coordinator: {
            select: {
              id: true,
              username: true,
              profile: true,
              email: true,
              role: true,
              contact: true,
            },
          },
          coordinatorId: true,
          student: {
            select: {
              id: true,
              username: true,
              profile: true,
              email: true,
              role: true,
              registrationNumber: true,
              contact: true,
            },
          },
          studentId: true,
        },
      });

      return studantComment;
    }
  }

  async addLike(id: number, like: number) {
    const comment = await prismaService.prisma.comment.findFirst({
      where: { id },
    });

    if (!comment) {
      return;
    }
    const commentUnLiked = await prismaService.prisma.comment.update({
      where: { id },
      data: {
        likes: like,
      },
    });

    return commentUnLiked;
  }

  async addUnlike(id: number, Unlike: number) {
    const comment = await prismaService.prisma.comment.findFirst({
      where: { id },
    });

    if (!comment) {
      return;
    }
    const commentUnLiked = await prismaService.prisma.comment.update({
      where: { id },
      data: {
        unlikes: Unlike,
      },
    });

    return commentUnLiked;
  }

  async update(id: number, content: string) {
    const comment = await prismaService.prisma.comment.findFirst({
      where: {
        id,
      },
    });

    if (!comment) {
      return;
    }

    const commentUpdated = await prismaService.prisma.comment.update({
      where: {
        id,
      },
      data: {
        content,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        likes: true,
        replies: true,
        postId: true,
        content: true,
        unlikes: true,
        adminId: true,
        admin: {
          select: {
            id: true,
            username: true,
            email: true,
            role: true,
            contact: true,
          },
        },
        coordinator: {
          select: {
            id: true,
            username: true,
            email: true,
            role: true,
            contact: true,
          },
        },
        coordinatorId: true,
        student: {
          select: {
            id: true,
            username: true,
            email: true,
            role: true,
            registrationNumber: true,
            contact: true,
          },
        },
        studentId: true,
      },
    });

    return commentUpdated;
  }

  async delete(id: number) {
    const comment = await prismaService.prisma.comment.findFirst({
      where: {
        id,
      },
    });

    if (!comment) {
      return;
    }

    const commentDeleted = await prismaService.prisma.comment.delete({
      where: {
        id,
      },
    });

    return commentDeleted;
  }
}
