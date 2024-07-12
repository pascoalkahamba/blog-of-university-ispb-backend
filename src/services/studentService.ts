import { TStudentLogin, TStudentModal } from "../@types";
import { DEFAULT_SELECT } from "./adminService";
import { prismaService } from "./prismaService";
import bcrypt from "bcrypt";

export default class StudentService {
  async create(StudentModal: TStudentModal) {
    const { contact, email, password, username } = StudentModal;
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
        registrationNumber: "não definido",
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
      select: { ...DEFAULT_SELECT, password: true },
    });

    if (!student) {
      return;
    }

    const samePassword = await bcrypt.compare(password, student.password);

    if (!samePassword) {
      return;
    }

    return student;
  }
}
