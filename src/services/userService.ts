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

const getAllUsers = async (): Promise<void> => {
  try {
  } catch (err) {
    console.log(err);
  }
};

const getUserById = async (userId: string): Promise<void> => {
  try {
  } catch (err) {
    console.log(err);
  }
};
