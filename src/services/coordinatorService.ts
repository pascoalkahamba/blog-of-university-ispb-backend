import { TCoordinatorInfoUpdate, TCoordinatorLogin } from "../@types";
import { ICoordinatorData } from "../interfaces";
import { DEFAULT_SELECT } from "./adminService";
import { prismaService } from "./prismaService";
import bcrypt from "bcrypt";

export default class CoordinatorService {
  async create(coordinatorData: ICoordinatorData) {
    const { contact, email, password, username, departmentId, courseId } =
      coordinatorData;
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

    const courses = await prismaService.prisma.course.findMany({
      where: { departmentId },
    });

    const existingCourse = courses.some((course) => course.id === courseId);

    if (!existingCourse) return "noCourse";

    const coordinatorCreated = await prismaService.prisma.coordinator.create({
      data: {
        email,
        username,
        password: hashPassword,

        course: {
          connect: {
            id: courseId,
          },
        },
        contact,
        profile: {
          create: {
            bio: "Aqui você pode falar um pouco de ti Cordenador.",
            photo: {
              create: {
                url: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
                name: "Default_Name_Of_Photo",
              },
            },
          },
        },
        department: {
          connect: {
            id: departmentId,
          },
        },
      },
      select: DEFAULT_SELECT,
    });

    return coordinatorCreated;
  }

  async updateInfoProfileCoordinator(
    id: number,
    newData: TCoordinatorInfoUpdate
  ) {
    const {
      bio,
      contact,
      email,
      password,
      photo,
      username,
      department,
      course,
    } = newData;
    const coordinator = await prismaService.prisma.coordinator.findFirst({
      where: { id },
    });

    if (!coordinator) return;

    const coordinatorEmail = await prismaService.prisma.coordinator.findFirst({
      where: { email },
    });
    const coordinatorContact = await prismaService.prisma.coordinator.findFirst(
      {
        where: { contact },
      }
    );

    if (email !== coordinator.email && coordinatorEmail) return;
    if (contact !== coordinator.contact && coordinatorContact) return;

    const coordinatorUpdated = await prismaService.prisma.coordinator.update({
      where: { id },
      data: {
        username,
        password,
        contact,
        email,
        departmentId: department.id,
        course: {
          update: {
            id: course.id,
          },
        },
        profile: {
          update: {
            bio,
            photo: {
              update: {
                name: photo.name,
                url: photo.url,
              },
            },
          },
        },
      },
      select: {
        ...DEFAULT_SELECT,
        department: true,
        course: true,
        profile: {
          select: {
            id: true,
            coordinatorId: true,
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

    return coordinatorUpdated;
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

  async getOneCoordinator(id: number) {
    const coordinator = await prismaService.prisma.coordinator.findFirst({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        contact: true,
        role: true,
        department: true,
        course: true,
        departmentId: true,
        profile: {
          select: {
            id: true,
            bio: true,
            photo: true,
            adminId: true,
            coordinatorId: true,
            studentId: true,
          },
        },
      },
    });

    if (!coordinator) {
      return;
    }

    return coordinator;
  }

  async deleteCoordinator(id: number) {
    const coordinator = await prismaService.prisma.coordinator.findFirst({
      where: { id },
    });

    if (!coordinator) return;

    const deletedCoordinator = await prismaService.prisma.coordinator.delete({
      where: { id },
    });

    return deletedCoordinator;
  }
}
