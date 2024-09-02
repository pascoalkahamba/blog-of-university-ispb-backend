import { TAdminInfoUpdate, TAdminLogin, TAdminModal } from "../@types";
import { prismaService } from "./prismaService";
import bcrypt from "bcrypt";

export const DEFAULT_SELECT = {
  username: true,
  email: true,
  role: true,
  contact: true,
};
export default class AdminService {
  async create(adminModal: TAdminModal) {
    const { contact, email, username, password } = adminModal;
    const hashPassword = await bcrypt.hash(password, 10);

    const admin = await prismaService.prisma.admin.findFirst({
      where: { email },
    });
    const contactOfAdmin = await prismaService.prisma.admin.findFirst({
      where: { contact },
    });

    if (admin || contactOfAdmin) {
      return;
    }

    const adminCreated = await prismaService.prisma.admin.create({
      data: {
        email,
        username,
        contact,
        password: hashPassword,
        profile: {
          create: {
            bio: "Aqui você pode falar um pouco de ti Administrador.",
            photo: {
              create: {
                url: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
                name: "Default_Name_Of_Photo",
              },
            },
          },
        },
      },
      select: DEFAULT_SELECT,
    });

    return adminCreated;
  }

  async getOneAdmin(id: number) {
    const admin = await prismaService.prisma.admin.findFirst({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        contact: true,
        role: true,
        profile: {
          select: {
            id: true,
            bio:true,
            photo: true,
            adminId: true,
            coordinatorId: true,
            studentId: true,
          },
        },
      },
    });

    if (!admin) {
      return;
    }

    return admin;
  }

  async login(adminInfo: TAdminLogin) {
    const { email, password } = adminInfo;

    const logged = await prismaService.prisma.admin.findFirst({
      where: { email },
      select: { ...DEFAULT_SELECT, password: true, id: true },
    });

    if (!logged) {
      return;
    }

    const samePassword = await bcrypt.compare(password, logged.password);

    if (!samePassword) {
      return;
    }

    const { password: _, ...admin } = logged;

    return admin;
  }

  async updateInfo(adminModal: TAdminInfoUpdate, id: number) {
    const { username, password, contact, email, bio, photo } = adminModal;

    const admin = await prismaService.prisma.admin.findFirst({
      where: { id },
    });
    if (!admin) return;

    const sameEmail = await prismaService.prisma.admin.findFirst({
      where: { email },
    });
    const sameContact = await prismaService.prisma.admin.findFirst({
      where: { contact },
    });

    if (email !== admin.email && sameEmail) return;
    if (contact !== admin.contact && sameContact) return;

    const adminUpdated = await prismaService.prisma.admin.update({
      where: { id },
      data: {
        username,
        password,
        email,
        contact,
        profile: {
          update: {
            bio,
            photo: {
              update: {
                url: photo.url,
                name: photo.name,
              },
            },
          },
        },
      },
      select: {
        ...DEFAULT_SELECT,
        profile: {
          select: {
            id: true,
            adminId: true,
            photo: {
              select: {
                id: true,
                url: true,
                name: true,
                profileId: true,
              },
            },
          },
        },
      },
    });

    return adminUpdated;
  }

  async forgotPassword(email: string, newPassword: string) {
    const hashPassword = await bcrypt.hash(newPassword, 10);

    const admin = await prismaService.prisma.admin.findFirst({
      where: { email },
    });

    if (!admin) {
      return;
    }

    const passwordUpdated = await prismaService.prisma.admin.update({
      where: { email },
      data: {
        password: hashPassword,
      },
      select: DEFAULT_SELECT,
    });

    return passwordUpdated;
  }

  async deleteCoordinator(email: string) {
    const coordinator = await prismaService.prisma.coordinator.findFirst({
      where: { email },
    });

    if (!coordinator) {
      return;
    }

    const coordinatorDeleted = await prismaService.prisma.coordinator.delete({
      where: { email },
      select: DEFAULT_SELECT,
    });

    return coordinatorDeleted;
  }

  async deleteStudent(registrationNumber: string) {
    const student = await prismaService.prisma.student.findFirst({
      where: { registrationNumber },
    });

    if (!student) {
      return;
    }

    const studentDeleted = await prismaService.prisma.student.delete({
      where: { registrationNumber },
      select: DEFAULT_SELECT,
    });

    return studentDeleted;
  }
}
