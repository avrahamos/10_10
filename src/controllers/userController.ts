import { Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import {
  createUserService,
  getAllUsers,
  getUserByName,
} from "../services/userService";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newUser = await createUserService(req.body);
    res.status(201).json({
      newUser,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userName = req.params.username;
    const user = await getUserByName(userName);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Optionally, add DELETE and EDIT functions
