import postModel, { IPost, IComment } from "../models/postModel";
import mongoose from "mongoose";
import userModel from "../models/userModel";

const createPostFromService = async (
  newPost: IPost
): Promise<mongoose.Document | null> => {
  try {
    const { title, content, author, comments } = newPost;
    const postDb = new postModel({
      title,
      content,
      author,
      comments,
    });
    const userToPost = await userModel.findByIdAndUpdate(
      author,
      { $push: { posts: postDb._id } },
      { new: true }
    );
    if (!updatePostById) {
      throw new Error("user not found");
    }

    postDb.save();
    return postDb;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getAllPosts = async (): Promise<mongoose.Document[] | null> => {
  try {
    const posts: mongoose.Document[] = await postModel.find();
    if (!posts) {
      return null;
    }
    return posts;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getPostById = async (
  postId: string
): Promise<mongoose.Document | null> => {
  try {
    const post = await postModel.findById(postId);
    if (!post) {
      console.log("post not found");
      return null;
    }
    return post;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const updatePostById = async (
  postId: string,
  title?: string,
  content?: string
): Promise<mongoose.Document | null> => {
  try {
    if (!title && !content) {
      console.log("no parameter to update");
      return null;
    }

    const updateFields: { [key: string]: string | undefined } = {};
    if (title) updateFields.title = title;
    if (content) updateFields.content = content;

    const updatedPost = await postModel.findByIdAndUpdate(
      postId,
      { $set: updateFields },
      { new: true }
    );
    if (!updateFields) {
      console.log("post not found");
      return null;
    }
    return updatedPost;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const addCommentById = async (postId: string, newComment: IComment) => {
  try {
    const post = await postModel.findById(postId);
    if (!post) {
      console.error("Post not found");
      return null;
    }

    post.comments.push({
      content: newComment.content,
      author: newComment.author,
      createdAt: new Date(),
    });

    await post.save();
    return post;
  } catch (err) {
    console.log("Error adding comment:", err);
    return null;
  }
};

const deletePostById = async (
  postId: string,
  author: string
): Promise<mongoose.Document | null> => {
  try {
    const deletedPost = await postModel.findByIdAndDelete(postId);

    if (!deletedPost) {
      console.error("Post not found");
      return null;
    }

    const userToUpdate = await userModel.findByIdAndUpdate(author, {
      $pull: { posts: deletedPost._id },
    });

    if (!userToUpdate) {
      console.error("User not found or update failed");
      return null;
    }

    return deletedPost;
  } catch (err) {
    console.log("Error occurred:", err);
    return null;
  }
};

export {
  createPostFromService,
  getAllPosts,
  getPostById,
  addCommentById,
  deletePostById,
  updatePostById,
};
