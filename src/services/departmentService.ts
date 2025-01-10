import {
  ICreateDepartmentData,
  IDepartmentData,
  IGetAllSubjectsFromCourse,
  IRemoveCourseFromDepartment,
  IRemoveSubjectFromCourse,
} from "../interfaces";
import { prismaService } from "./prismaService";

export class DepartmentService {
  async create({ courses, name }: ICreateDepartmentData) {
    const departmentAlreadyExist =
      await prismaService.prisma.department.findFirst({
        where: { name },
      });

    if (departmentAlreadyExist) {
      return;
    }

    for (const course of courses) {
      const existingCourse = await prismaService.prisma.course.findFirst({
        where: { name: course.name },
      });

      if (existingCourse) {
        return;
      }

      for (const subject of course.subjects) {
        const subjectAlreadyExist =
          await prismaService.prisma.subject.findFirst({
            where: { name: subject.name },
          });

        if (subjectAlreadyExist) {
          return;
        }
      }
    }

    const department = await prismaService.prisma.department.create({
      data: {
        name,
        courses: {
          create: courses.map((course) => ({
            name: course.name,
            subjects: {
              create: course.subjects.map((subject) => ({
                name: subject.name,
              })),
            },
          })),
        },
      },
      select: {
        id: true,
        name: true,
        courses: {
          select: {
            id: true,
            name: true,
            departmentId: true,
            subjects: true,
          },
        },
      },
    });

    return department;
  }

  async update({ id, courses, name }: IDepartmentData) {
    const department = await prismaService.prisma.department.findFirst({
      where: { id },
    });

    if (!department) return;

    const updatedDepartment = await prismaService.prisma.department.update({
      where: { id },
      data: {
        name,
        courses: {
          upsert: courses.map((course) => ({
            where: { id: course.id ?? 0 },
            create: {
              name: course.name,
              subjects: {
                create: course.subjects.map((subject) => ({
                  name: subject.name,
                })),
              },
            },
            update: {
              name: course.name,
              subjects: {
                upsert: course.subjects.map((subject) => ({
                  where: { id: subject.id ?? 0 },
                  create: { name: subject.name },
                  update: { name: subject.name },
                })),
              },
            },
          })),
        },
      },
      select: {
        id: true,
        name: true,
        courses: {
          select: {
            id: true,
            name: true,
            departmentId: true,
            subjects: true,
          },
        },
      },
    });

    return updatedDepartment;
  }

  async delete(id: number) {
    const department = await prismaService.prisma.department.findFirst({
      where: { id },
    });

    if (!department) return;

    const departmentDeleted = await prismaService.prisma.department.delete({
      where: { id },
    });

    return departmentDeleted;
  }

  async removeCourseFromDepartment({
    courseId,
    departmentId,
  }: IRemoveCourseFromDepartment) {
    const existingCourse = await prismaService.prisma.course.findFirst({
      where: { id: courseId, departmentId },
    });

    if (!existingCourse) return;

    const department = await prismaService.prisma.department.findFirst({
      where: { id: departmentId },
    });

    if (!department) return;

    const course = await prismaService.prisma.course.findFirst({
      where: { id: courseId },
    });

    if (!course) return;

    const updatedDepartment = await prismaService.prisma.department.update({
      where: { id: departmentId },
      data: {
        courses: {
          delete: {
            id: courseId,
            departmentId: departmentId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        courses: {
          select: {
            id: true,
            name: true,
            departmentId: true,
            subjects: true,
          },
        },
      },
    });

    return updatedDepartment;
  }

  async removeSubjectFromCourse({
    courseId,
    departmentId,
    subjectId,
  }: IRemoveSubjectFromCourse) {
    const existingCourse = await prismaService.prisma.course.findFirst({
      where: { id: courseId, departmentId },
      select: {
        id: true,
        subjects: true,
        departmentId: true,
        students: true,
      },
    });

    if (!existingCourse) return;

    const isSubjectConnected = existingCourse.subjects.some(
      (subject) => subject.id === subjectId
    );

    if (!isSubjectConnected) return;

    const department = await prismaService.prisma.department.findFirst({
      where: { id: departmentId },
    });

    if (!department) return;

    const course = await prismaService.prisma.course.findFirst({
      where: { id: courseId },
    });

    if (!course) return;

    const subject = await prismaService.prisma.subject.findFirst({
      where: { id: subjectId },
    });

    if (!subject) return;
    const updatedDepartment = await prismaService.prisma.department.update({
      where: { id: departmentId },
      data: {
        courses: {
          update: {
            where: { id: courseId },
            data: {
              subjects: {
                delete: {
                  id: subjectId,
                },
              },
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        courses: {
          select: {
            id: true,
            name: true,
            departmentId: true,
            subjects: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return updatedDepartment;
  }

  async getOneDepartment(id: number) {
    const department = await prismaService.prisma.department.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        coordinators: {
          select: {
            id: true,
            username: true,
            profile: {
              select: {
                id: true,
                photo: {
                  select: {
                    url: true,
                    name: true,
                  },
                },
              },
            },
            role: true,
            course: true,
            contact: true,
            email: true,
          },
        },
        posts: true,
        courses: {
          select: {
            id: true,
            name: true,
            subjects: true,
          },
        },
      },
    });

    if (!department) return;

    return department;
  }

  async getAllCoursesFromDepartments(departmentId: number) {
    const courses = await prismaService.prisma.course.findMany({
      where: { departmentId },
      select: {
        id: true,
        name: true,
        students: true,
        coordinatorId: true,
        departmentId: true,
        subjects: true,
      },
    });

    return courses;
  }

  async getAllSubjectsFromCourse({ courseId }: IGetAllSubjectsFromCourse) {
    const courses = await prismaService.prisma.course.findFirst({
      where: { id: courseId },
      select: {
        id: true,
        name: true,
        subjects: true,
        students: true,
      },
    });

    return courses;
  }

  async getAllDepartments() {
    const departments = await prismaService.prisma.department.findMany({
      select: {
        id: true,
        name: true,
        coordinators: {
          select: {
            id: true,
            username: true,
            role: true,
            course: true,
            contact: true,
            email: true,
          },
        },
        posts: true,
        courses: {
          select: {
            id: true,
            name: true,
            subjects: true,
          },
        },
      },
    });

    return departments;
  }

  async getAllCouses() {
    const allCourses = await prismaService.prisma.course.findMany();

    return allCourses;
  }
}
