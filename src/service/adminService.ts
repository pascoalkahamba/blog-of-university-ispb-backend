import { AdminInfoLoginT } from "../@types";
import { AdminInfoI } from "../interfaces";
import { modalUserAdminSchema } from "../model/postDataSchema";
import bcript from "bcrypt";
import jwtToken from "jsonwebtoken";

export default class AdminService {
  async create(adminInfo: AdminInfoI) {
    const { email, password, username } = adminInfo;
    const hashPassword = bcript.hash(password, 10);
    const safePassword = await hashPassword;
    const admin = await modalUserAdminSchema.findOne({ email });

    if (admin) {
      return;
    }

    const adminCreated = await modalUserAdminSchema.create({
      username,
      email,
      password: safePassword,
    });

    const safeAdminInfo = modalUserAdminSchema
      .findById(adminCreated._id)
      .select("email username")
      .lean();

    return safeAdminInfo;
  }

  async login(adminInfoLogin: AdminInfoLoginT) {
    const { email, password } = adminInfoLogin;

    const logged = await modalUserAdminSchema.findOne({ email });

    if (!logged) {
      return;
    }

    const hashPassword = bcript.compare(password, logged.password as string);
    const acceptPassword = await hashPassword;

    if (!acceptPassword) {
      return;
    }

    const token = jwtToken.sign(
      { id: logged._id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "8h" }
    );

    const safeAdminInfo = modalUserAdminSchema
      .findById(logged._id)
      .select("username email")
      .lean();

    return {
      safeAdminInfo,
      token,
    };
  }

  async forgotPassword(email: string, newPassword: string) {
    const admin = await modalUserAdminSchema.findOne({ email });
    const hashPassword = bcript.hash(newPassword, 10);
    const password = await hashPassword;

    if (!admin) {
      return;
    }

    admin.password = password;
    await admin.save();

    const safeAdminInfo = modalUserAdminSchema
      .findById(admin._id)
      .select("username email")
      .lean();

    return safeAdminInfo;
  }

  async updateAdminInfo(newAdminInfo: AdminInfoI, id: string) {
    const { email, password, username } = newAdminInfo;
    const hashPassword = bcript.hash(password, 10);
    const newPassword = await hashPassword;

    const currAdmin = await modalUserAdminSchema.findById({ _id: id });

    if (!currAdmin) {
      return;
    }

    currAdmin.username = username;
    currAdmin.password = newPassword;
    currAdmin.email = email;
    await currAdmin.save();

    const safeAdminInfo = modalUserAdminSchema
      .findById(currAdmin._id)
      .select("username email")
      .lean();

    return safeAdminInfo;
  }

  async oneAdmin(id: string) {
    const admin = await modalUserAdminSchema.findById({ _id: id });

    if (!admin) {
      return;
    }

    const safeAdminInfo = modalUserAdminSchema
      .findById(admin._id)
      .select("username email")
      .lean();

    return safeAdminInfo;
  }

  async allAdmins() {
    const allAdmins = await modalUserAdminSchema.find();

    return allAdmins;
  }

  async deleteAdmin(id: string) {
    const adminDeleted = await modalUserAdminSchema.findOneAndDelete({
      _id: id,
    });

    if (!adminDeleted) {
      return;
    }

    const safeAdminInfo = modalUserAdminSchema
      .findById(adminDeleted._id)
      .select("username email")
      .lean();

    return safeAdminInfo;
  }
}
