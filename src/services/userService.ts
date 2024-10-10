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
    const users: mongoose.Document[] = await userModel.find();
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

export const getUserByName = async (
  userName: string
): Promise<mongoose.Document | null> => {
  try {
    const user = await userModel.findOne({ username: userName });

    if (!user) {
      return null;
    }

    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
};
