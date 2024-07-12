import { TAdminLogin, TAdminModal } from "../@types";
import { prismaService } from "./prismaService";
import bcrypt from "bcrypt";

export const DEFAULT_SELECT = {
  username: true,
  email: true,
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
      },
      select: DEFAULT_SELECT,
    });

    return adminCreated;
  }

  async login(adminInfo: TAdminLogin) {
    const { email, password } = adminInfo;

    const logged = await prismaService.prisma.admin.findFirst({
      where: { email },
      select: {
        id: true,
        username: true,
        password: true,
        email: true,
        contact: true,
      },
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

  async updateInfo(adminModal: TAdminModal, id: number) {
    const { username, password, contact, email } = adminModal;

    const admin = await prismaService.prisma.admin.findFirst({
      where: { id },
    });

    if (admin) {
      return;
    }

    const adminUpdated = await prismaService.prisma.admin.update({
      where: { id },
      data: {
        username,
        password,
        email,
        contact,
      },
      select: DEFAULT_SELECT,
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
