import { TFileModal, TKindOfFile, TPictureModal } from "../@types";
import { ICreatePost } from "../interfaces";
import { prismaService } from "./prismaService";
import fs from "fs";

export default class PostService {
  async createPost(
    createPost: ICreatePost,
    fileModal: TFileModal | undefined,
    pictureModal: TPictureModal | undefined,
    kindOfFile: TKindOfFile
  ) {
    let fileContent = fs.readFileSync("");
    let photoContent = fs.readFileSync("");
    let fileStats = fs.statSync("");
    let photoStats = fs.statSync("");

    const mimeTypePhoto = "image/jpeg";
    const mimeTypeFile = "application/pdf";
    const emptyBuffer = fs.readFileSync("");

    if (fileModal) {
      fileContent = fs.readFileSync(fileModal.content);
      fileStats = fs.statSync(fileModal.mimeType);
    }

    if (pictureModal) {
      photoContent = fs.readFileSync(pictureModal.content);
      photoStats = fs.statSync(pictureModal.mimeType);
    }

    const { createrPostId, content, title, whoPosted, nameOfDepartment } =
      createPost;

    const postTitle = await prismaService.prisma.post.findFirst({
      where: { title },
    });

    if (postTitle) {
      return;
    }

    const post = await prismaService.prisma.post.create({
      data: {
        title,
        content,
        adminId: whoPosted === "admin" ? createrPostId : null,
        coordinatorId: whoPosted === "coordinator" ? createrPostId : null,
        picure: {
          create: {
            content: kindOfFile === "photo" ? photoContent : emptyBuffer,
            mimeType: kindOfFile === "photo" ? mimeTypePhoto : "",
            size: kindOfFile === "photo" ? photoStats.size : 0,
            height:
              kindOfFile === "photo" ? (pictureModal?.height as number) : 0,
            width: kindOfFile === "photo" ? (pictureModal?.width as number) : 0,
          },
        },
        file: {
          create: {
            content: kindOfFile === "file" ? fileContent : emptyBuffer,
            mimeType: kindOfFile === "file" ? mimeTypeFile : "",
            size: kindOfFile === "file" ? fileStats.size : 0,
            name: fileModal?.name as string,
          },
        },
        departments: {
          create: {
            name: nameOfDepartment,
          },
        },
      },
    });

    return post;
  }

  async updatePost(
    createPost: ICreatePost,
    fileModal: TFileModal | undefined,
    pictureModal: TPictureModal | undefined,
    kindOfFile: TKindOfFile
  ) {
    let fileContent = fs.readFileSync("");
    let photoContent = fs.readFileSync("");
    let fileStats = fs.statSync("");
    let photoStats = fs.statSync("");

    const mimeTypePhoto = "image/jpeg";
    const mimeTypeFile = "application/pdf";
    const emptyBuffer = fs.readFileSync("");

    if (fileModal) {
      fileContent = fs.readFileSync(fileModal.content);
      fileStats = fs.statSync(fileModal.mimeType);
    }

    if (pictureModal) {
      photoContent = fs.readFileSync(pictureModal.content);
      photoStats = fs.statSync(pictureModal.mimeType);
    }

    const { createrPostId, content, title, whoPosted, nameOfDepartment } =
      createPost;

    const postTitle = await prismaService.prisma.post.findFirst({
      where: { title },
    });

    if (!postTitle) {
      return;
    }

    const postUpdated = await prismaService.prisma.post.update({
      where: { id: postTitle.id },
      data: {
        title,
        content,
        adminId: whoPosted === "admin" ? createrPostId : null,
        coordinatorId: whoPosted === "coordinator" ? createrPostId : null,
        picure: {
          create: {
            content: kindOfFile === "photo" ? photoContent : emptyBuffer,
            mimeType: kindOfFile === "photo" ? mimeTypePhoto : "",
            size: kindOfFile === "photo" ? photoStats.size : 0,
            height:
              kindOfFile === "photo" ? (pictureModal?.height as number) : 0,
            width: kindOfFile === "photo" ? (pictureModal?.width as number) : 0,
          },
        },
        file: {
          create: {
            content: kindOfFile === "file" ? fileContent : emptyBuffer,
            mimeType: kindOfFile === "file" ? mimeTypeFile : "",
            size: kindOfFile === "file" ? fileStats.size : 0,
            name: fileModal?.name as string,
          },
        },
        departments: {
          create: {
            name: nameOfDepartment,
          },
        },
      },
    });

    return postUpdated;
  }

  async deletePost(title: string) {
    const post = await prismaService.prisma.post.findFirst({
      where: { title },
    });

    if (!post) {
      return;
    }

    const postDeleted = await prismaService.prisma.post.delete({
      where: { id: post.id },
    });

    return postDeleted;
  }
}
