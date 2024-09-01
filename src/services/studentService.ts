import { TStudentLogin, TStudentModal } from "../@types";
import { IUpdateProfile } from "../interfaces";
import { DEFAULT_SELECT } from "./adminService";
import { prismaService } from "./prismaService";
import bcrypt from "bcrypt";

export default class StudentService {
  async create(StudentModal: TStudentModal) {
    const { contact, email, password, username, registrationNumber } =
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

    if (student || StudentN) {
      return;
    }

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
            bio: "Aqui você pode falar um pouco de ti Cordenador.",
            photo: {
              create: {
                url: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
                name: "Default_Name_Of_Photo",
              },
            },
          },
        },
        course: {
          create: {
            name: "Escreva o seu curso.",
            department: {
              create: {
                name: "Escreva o nome do seu departamento.",
              },
            },
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
      select: { ...DEFAULT_SELECT, password: true, id: true },
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
      photo,
      registrationNumber,
      username,
    } = newData;
    const student = await prismaService.prisma.student.findFirst({
      where: { id },
    });

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

    if (email !== student.email && studentEmail) return;
    if (contact !== student.contact && studentContact) return;
    if (
      registrationNumber !== student.registrationNumber &&
      studentRegistraionNumber
    )
      return;

    const studentUpdated = await prismaService.prisma.student.update({
      where: { id },
      data: {
        username,
        contact,
        password,
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
    });
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
        profile: true,
        course: true,
      },
    });

    if (!student) {
      return;
    }

    return student;
  }
}
