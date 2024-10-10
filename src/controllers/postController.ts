import { Request, Response, NextFunction } from "express";
import Post, { IPost } from "../models/postModel";
import User from "../models/userModel";

// Create a new post
export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {};

// Delete a post
export const deletePost = async (
  req: Request,
  res: Response
): Promise<void> => {};

// Get all posts
export const getPosts = async (
  req: Request,
  res: Response
): Promise<void> => {};

// Get a single post by ID
export const getPost = async (req: Request, res: Response): Promise<void> => {};

// Update a post
export const updatePost = async (
  req: Request,
  res: Response
): Promise<void> => {};

// Add a comment to a post
export const addComment = async (
  req: Request,
  res: Response
): Promise<void> => {};
