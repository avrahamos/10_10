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
): Promise<Response> => {
  try {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
      return res
        .status(400)
        .json({ message: "Title, content, and author are required" });
    }

    const newPost = await createPostFromService(req.body);
    return res.status(201).json({ newPost });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error creating post", error: err });
  }
};

// Delete a post
export const deletePost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const postId = req.params.id;
    const { userIdToDeletePost } = req.body;

    if (!userIdToDeletePost) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const deletedPost = await deletePostById(postId, userIdToDeletePost);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res
      .status(200)
      .json({ message: "Post deleted successfully", post: deletedPost });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting post", error: err });
  }
};

// Get all posts
export const getPosts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const posts = await getAllPosts();
    return res.status(200).json(posts);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching posts", error: err });
  }
};

// Get a single post by ID
export const getPost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const post = await getPostById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching post", error: err });
  }
};

// Update a post
export const updatePost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id: string = req.params.id;
    const { title, content } = req.body;

    if (!title && !content) {
      return res.status(400).json({
        message: "Either title or content must be provided to update",
      });
    }

    const updatedPost = await updatePostById(id, req.body);

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res
      .status(200)
      .json({ message: "Post updated successfully", post: updatedPost });
  } catch (err) {
    return res.status(500).json({ message: "Error updating post", error: err });
  }
};

// Add a comment to a post
export const addComment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const postId = req.params.id;
    const newComment = req.body;

    if (!newComment.content || !newComment.author) {
      return res
        .status(400)
        .json({ message: "Content and author are required" });
    }

    const comment = await addCommentById(postId, newComment);

    if (!comment) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res
      .status(201)
      .json({ message: "Comment added successfully", comment });
  } catch (err) {
    console.log("Error adding comment:", err);
    return res
      .status(500)
      .json({ message: "Error adding comment", error: err });
  }
};
