import { IReplyData } from "../interfaces";
import { prismaService } from "./prismaService";

export default class ReplyService {
  async create({ commentId, content, creatorId, whoCreator }: IReplyData) {
    if (whoCreator === "admin") {
      const adminReply = await prismaService.prisma.reply.create({
        data: {
          content,
          likes: 0,
          unlikes: 0,
          comment: {
            connect: {
              id: commentId,
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
          content: true,
          likes: true,
          commentId: true,
          unlikes: true,
          createdAt: true,
          updatedAt: true,
          admin: {
            select: {
              id: true,
              username: true,
              email: true,
              role: true,
              contact: true,
            },
          },
          adminId: true,
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

      return adminReply;
    }
    if (whoCreator === "coordinator") {
      const coordinatorReply = await prismaService.prisma.reply.create({
        data: {
          content,
          likes: 0,
          unlikes: 0,
          comment: {
            connect: {
              id: commentId,
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
          content: true,
          likes: true,
          commentId: true,
          unlikes: true,
          createdAt: true,
          updatedAt: true,
          admin: {
            select: {
              id: true,
              username: true,
              email: true,
              role: true,
              contact: true,
            },
          },
          adminId: true,
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

      return coordinatorReply;
    }
    if (whoCreator === "studant") {
      const studantReply = await prismaService.prisma.reply.create({
        data: {
          content,
          likes: 0,
          unlikes: 0,
          comment: {
            connect: {
              id: commentId,
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
          commentId: true,
          content: true,
          likes: true,
          unlikes: true,
          createdAt: true,
          updatedAt: true,
          admin: {
            select: {
              id: true,
              username: true,
              email: true,
              role: true,
              contact: true,
            },
          },
          adminId: true,
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

      return studantReply;
    }
  }

  async udpate(id: number, content: string) {
    const reply = await prismaService.prisma.reply.findFirst({
      where: {
        id,
      },
    });

    if (!reply) {
      return;
    }

    const replyUpdated = await prismaService.prisma.reply.update({
      where: {
        id,
      },
      data: {
        content,
      },
      select: {
        id: true,
        content: true,
        likes: true,
        unlikes: true,
        createdAt: true,
        updatedAt: true,
        commentId: true,
        admin: {
          select: {
            id: true,
            username: true,
            email: true,
            role: true,
            contact: true,
          },
        },
        adminId: true,
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

    return replyUpdated;
  }

  async delete(id: number) {
    const reply = await prismaService.prisma.reply.findFirst({
      where: {
        id,
      },
    });

    if (!reply) {
      return;
    }

    const replyDeleted = await prismaService.prisma.reply.delete({
      where: {
        id,
      },
    });

    return replyDeleted;
  }

  async addLike(id: number, like: number) {
    const reply = await prismaService.prisma.reply.findFirst({
      where: { id },
    });

    if (!reply) {
      return;
    }
    const replyUnLiked = await prismaService.prisma.reply.update({
      where: { id },
      data: {
        likes: like,
      },
    });

    return replyUnLiked;
  }

  async addUnlike(id: number, Unlike: number) {
    const reply = await prismaService.prisma.reply.findFirst({
      where: { id },
    });

    if (!reply) {
      return;
    }
    const replyUnliked = await prismaService.prisma.reply.update({
      where: { id },
      data: {
        unlikes: Unlike,
      },
    });

    return replyUnliked;
  }
}
