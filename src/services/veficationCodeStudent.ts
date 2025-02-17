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
}
