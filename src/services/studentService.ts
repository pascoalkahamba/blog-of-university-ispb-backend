import { TStudentLogin } from "../@types";
import { IStudentData, IUpdateProfile } from "../interfaces";
import { DEFAULT_SELECT } from "./adminService";
import { prismaService } from "./prismaService";
import bcrypt from "bcrypt";

export default class StudentService {
  async create(StudentModal: IStudentData) {
    const { contact, email, password, username, registrationNumber, courseId } =
      StudentModal;
    const hashPassword = await bcrypt.hash(password, 10);
    const student = await prismaService.prisma.student.findFirst({
      where: {
        email,
      },
    });
    const StudentN = await prismaService.prisma.student.findFirst({
      where: {
        contact,
      },
    });

    const registrationStudent = await prismaService.prisma.student.findFirst({
      where: {
        registrationNumber,
      },
    });

    if (registrationStudent) {
      return "registrationAlreadyExist";
    }

    const course = await prismaService.prisma.course.findFirst({
      where: { id: courseId },
    });

    if (student || StudentN) {
      return;
    }

    if (!course) return "noCourse";

    const studentCreated = await prismaService.prisma.student.create({
      data: {
        email,
        username,
        password: hashPassword,
        contact,
        active: true,
        registrationNumber,
        year: "não definido",
        profile: {
          create: {
            bio: "Aqui você pode falar um pouco de ti estudante.",
            photo: {
              create: {
                url: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
                name: "Default_Name_Of_Photo",
              },
            },
          },
        },
        course: {
          connect: {
            id: courseId,
          },
        },
      },
      select: DEFAULT_SELECT,
    });

    return studentCreated;
  }

  async login(studentLogin: TStudentLogin) {
    const { email, password } = studentLogin;

    const student = await prismaService.prisma.student.findFirst({
      where: { email },
      select: {
        ...DEFAULT_SELECT,
        password: true,
        id: true,
        profile: {
          select: {
            id: true,
            adminId: true,
            studentId: true,
            coordinatorId: true,
            photo: true,
          },
        },
      },
    });

    if (!student) {
      return;
    }

    const samePassword = await bcrypt.compare(password, student.password);

    if (!samePassword) {
      return;
    }

    const { password: _, ...studentInfo } = student;

    return studentInfo;
  }

  async updateInfoStudent(id: number, newData: IUpdateProfile) {
    const {
      bio,
      contact,
      email,
      password,
      courseId,
      photo,
      registrationNumber,
      username,
    } = newData;
    const student = await prismaService.prisma.student.findFirst({
      where: { id },
    });

    const hashPassword = await bcrypt.hash(password, 10);

    if (!student) return;

    const studentEmail = await prismaService.prisma.student.findFirst({
      where: { email },
    });
    const studentContact = await prismaService.prisma.student.findFirst({
      where: { contact },
    });
    const studentRegistraionNumber =
      await prismaService.prisma.student.findFirst({
        where: { registrationNumber },
      });

    const courses = await prismaService.prisma.course.findFirst({
      where: { id: courseId },
    });

    if (!courses) return;

    const course = await prismaService.prisma.course.update({
      where: {
        studentId: student.id,
      },
      data: {
        studentId: null,
      },
    });

    if (!course) return;

    await prismaService.prisma.course.update({
      where: { id: courseId },
      data: {
        studentId: student.id,
      },
    });

    if (email !== student.email && studentEmail) return;
    if (contact !== student.contact && studentContact) return;
    if (
      registrationNumber !== student.registrationNumber &&
      studentRegistraionNumber
    )
      return;

    const updatedStudent = await prismaService.prisma.student.update({
      where: { id },
      data: {
        username,
        contact,
        password: hashPassword,
        registrationNumber,

        email,
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
        id: true,
        username: true,
        email: true,
        contact: true,
        registrationNumber: true,
        profile: {
          select: {
            id: true,
            photo: {
              select: {
                id: true,
                name: true,
                url: true,
              },
            },
            student: {
              select: {
                id: true,
                role: true,
              },
            },
            studentId: true,
          },
        },
        course: {
          select: {
            id: true,
            name: true,
            department: true,
          },
        },
      },
    });

    return updatedStudent;
  }

  async forgotPassword(email: string, newPassword: string) {
    const hashPassword = await bcrypt.hash(newPassword, 10);

    const student = await prismaService.prisma.student.findFirst({
      where: { email },
    });

    if (!student) {
      return;
    }

    const passwordUpdated = await prismaService.prisma.student.update({
      where: { email },
      data: {
        password: hashPassword,
      },
      select: DEFAULT_SELECT,
    });

    return passwordUpdated;
  }

  async getOneStudent(id: number) {
    const student = await prismaService.prisma.student.findFirst({
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
            bio: true,
            photo: true,
            adminId: true,
            coordinatorId: true,
            studentId: true,
          },
        },
        course: true,
      },
    });

    if (!student) {
      return;
    }

    return student;
  }

  async deleteStudent(id: number) {
    const student = await prismaService.prisma.student.findFirst({
      where: { id },
    });

    if (!student) return;

    const deletedStudent = await prismaService.prisma.student.delete({
      where: { id },
    });

    return deletedStudent;
  }
}
