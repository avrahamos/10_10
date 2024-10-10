import { Request, Response, NextFunction } from "express";
import {
  addCommentById,
  createPostFromService,
  deletePostById,
  getAllPosts,
  getPostById,
  updatePostById,
} from "../services/postService";

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
): Promise<void> => {
  try {
    const postId = req.params.id;
    const userIdToDeletePost = req.body;
    const deletePost = await deletePostById(postId, userIdToDeletePost);
    res.status(200).json(deletePost);
  } catch (err) {
    res.status(400).json(err);
  }
};

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
export const getPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await getPostById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(200).json(err);
  }
};

// Update a post
export const updatePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.params.id;
    const title: string | undefined = req.body.title;
    const content: string | undefined = req.body.content;
    const updatePostFile = await updatePostById(id, req.body);
    res.status(200).json(updatePostFile);
  } catch (err) {
    res.status(200).json(err);
  }
};

// Add a comment to a post
export const addComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const postId = req.params.id;
    const newComment = req.body;

    if (!newComment.content || !newComment.author) {
      res.status(400).json({ message: "Content and author are required" });
    }

    const comment = await addCommentById(postId, newComment);

    if (!comment) {
      res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(comment);
  } catch (err) {
    console.log("Error adding comment:", err);
    res.status(500).json({ message: "Error adding comment", error: err });
  }
};
