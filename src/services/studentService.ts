import { TStudentLogin, TStudentModal } from "../@types";
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
}
