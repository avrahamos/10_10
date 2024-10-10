import mongoose from "mongoose";
import userModel, { IUser } from "../models/userModel";

export const createUserService = async (
  newUser: IUser
): Promise<mongoose.Document | null> => {
  try {
    const { username, email, profile, posts } = newUser;
    const dbUser = new userModel({
      username,
      email,
      profile,
      posts,
    });
    dbUser.save();
    return dbUser;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getAllUsers = async (): Promise<mongoose.Document[] | null> => {
  try {
    const users = await userModel.find();
    console.log(users);
    if (!users) {
      return null;
    }
    return users;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getUserById = async (userId: string): Promise<void> => {
  try {
  } catch (err) {
    console.log(err);
  }
};
