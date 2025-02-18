import { IAddCodeStudent } from "../interfaces";
import { prismaService } from "./prismaService";

export default class VeficationCodeStudent {
  async addCodeStudent({ code, email }: IAddCodeStudent) {
    const admin = await prismaService.prisma.admin.findFirst({
      where: { email },
      select: {
        role: true,
      },
    });

    if (!admin) return;

    if (admin?.role !== "ADMIN") return "userCannotAddCode";

    const codeStudentAlreadyExist =
      await prismaService.prisma.verificationCodeStudent.findFirst({
        where: { code },
      });
    if (codeStudentAlreadyExist) return "codeStudentAlreadyExist";

    const newCode = await prismaService.prisma.verificationCodeStudent.create({
      data: {
        code,
      },
    });

    return newCode;
  }

  async getAllCodeStudent() {
    const allCodeStudent =
      await prismaService.prisma.verificationCodeStudent.findMany();
    return allCodeStudent;
  }

  async deleteCodeStudent(id: number) {
    const codeStudent =
      await prismaService.prisma.verificationCodeStudent.findFirst({
        where: { id },
      });
    if (!codeStudent) return;

    const deleteCodeStudent =
      await prismaService.prisma.verificationCodeStudent.delete({
        where: { id },
      });

    return deleteCodeStudent;
  }

  async getCodeStudent(id: number) {
    const getCodeStudent =
      await prismaService.prisma.verificationCodeStudent.findUnique({
        where: { id },
      });

    if (!getCodeStudent) return;
    return getCodeStudent;
  }

  async updateCodeStudent(id: number, code: string) {
    const codeStudent =
      await prismaService.prisma.verificationCodeStudent.findFirst({
        where: { id },
      });
    if (!codeStudent) return;

    const codeStudentAlreadyExist =
      await prismaService.prisma.verificationCodeStudent.findFirst({
        where: { code },
      });

    if (codeStudentAlreadyExist && codeStudentAlreadyExist.id !== id)
      return "codeStudentAlreadyExist";
    const updateCodeStudent =
      await prismaService.prisma.verificationCodeStudent.update({
        where: { id },
        data: { code },
      });
    return updateCodeStudent;
  }
}
