import { TAdminModal } from "../@types";
import { prismaService } from "./prismaService";
export default class AdminService {
  async create(adminModal: TAdminModal) {
    const { contact, email, username, password } = adminModal;

    const admin = await prismaService.prisma.admin.findFirst({
      where: { email },
    });

    if (admin) {
      return;
    }

    const adminCreated = await prismaService.prisma.admin.create({
      data: {
        email,
        username,
        contact,
        password,
      },
      select: {
        username: true,
        email: true,
        contact: true,
      },
    });

    return adminCreated;
  }
}
