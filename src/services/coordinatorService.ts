import { TCoordinatorLogin, TCoordinatorModal } from "../@types";
import { DEFAULT_SELECT } from "./adminService";
import { prismaService } from "./prismaService";
import bcrypt from "bcrypt";

export default class CoordinatorService {
  async create(coordinatorModal: TCoordinatorModal, nameOfDepartment: string) {
    const { contact, email, password, username } = coordinatorModal;
    const hashPassword = await bcrypt.hash(password, 10);
    const coordinator = await prismaService.prisma.coordinator.findFirst({
      where: {
        email,
      },
    });
    const coordinatorN = await prismaService.prisma.coordinator.findFirst({
      where: {
        contact,
      },
    });

    if (coordinator || coordinatorN) {
      return;
    }

    const coordinatorCreated = await prismaService.prisma.coordinator.create({
      data: {
        email,
        username,
        password: hashPassword,
        contact,
        department: {
          create: {
            name: nameOfDepartment,
          },
        },
      },
      select: DEFAULT_SELECT,
    });

    return coordinatorCreated;
  }

  async login(coordinatorLogin: TCoordinatorLogin) {
    const { email, password } = coordinatorLogin;

    const coordinator = await prismaService.prisma.coordinator.findFirst({
      where: { email },
      select: { ...DEFAULT_SELECT, password: true, id: true },
    });

    if (!coordinator) {
      return;
    }

    const samePassword = await bcrypt.compare(password, coordinator.password);

    if (!samePassword) {
      return;
    }

    const { password: _, ...coordinatorInfo } = coordinator;

    return coordinatorInfo;
  }

  async forgotPassword(email: string, newPassword: string) {
    const hashPassword = await bcrypt.hash(newPassword, 10);

    const coordinator = await prismaService.prisma.coordinator.findFirst({
      where: { email },
    });

    if (!coordinator) {
      return;
    }

    const passwordUpdated = await prismaService.prisma.coordinator.update({
      where: { email },
      data: {
        password: hashPassword,
      },
      select: DEFAULT_SELECT,
    });

    return passwordUpdated;
  }
}
