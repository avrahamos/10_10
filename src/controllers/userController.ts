import { Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import { createUserService } from "../services/userService";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newUser = await createUserService(req.body);
    res.status(201).json({
      msg: "user created",
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getUsers = async (req: Request, res: Response) => {};

export const getUser = async (req: Request, res: Response) => {};

// Optionally, add DELETE and EDIT functions
