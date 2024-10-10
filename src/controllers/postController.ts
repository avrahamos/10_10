import { Request, Response, NextFunction } from "express";
import Post, { IPost } from "../models/postModel";
import User from "../models/userModel";
import { createPostFromService, getAllPosts } from "../services/postService";

// Create a new post
export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newPost = await createPostFromService(req.body);
    res.status(201).json({ newPost });
  } catch (err) {
    console.log(err);
    res.status(400).send("filed");
  }
};

// Delete a post
export const deletePost = async (
  req: Request,
  res: Response
): Promise<void> => {};

// Get all posts
export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json(err);
  }
};

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
