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
    await userModel.findByIdAndUpdate(
      author,
      { $push: { posts: postDb._id } },
      { new: true }
    );
    postDb.save();
    return postDb;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getAllPosts = async () => {
  try {
  } catch (err) {}
};

const getPostById = async (postId: string) => {
  try {
  } catch (err) {}
};

const updatePostById = async (
  postId: string,
  title?: string,
  content?: string
) => {
  try {
  } catch (err) {}
};

const addCommentById = async (postId: string, newComment: IComment) => {
  try {
  } catch (err) {}
};

const deletePostById = async (postId: string) => {
  try {
  } catch (err) {}
};

export {
  createPostFromService,
  getAllPosts,
  getPostById,
  addCommentById,
  deletePostById,
};
