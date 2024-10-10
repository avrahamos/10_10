import mongoose, { Schema, Document, Types } from "mongoose";
import { compileFunction } from "vm";

export interface IComment {
  content: string;
  author: Types.ObjectId;
  createdAt: Date;
}

export interface IPost extends Document {
  _id: Types.ObjectId;
  title: string;
  content: string;
  author: Types.ObjectId;
  comments: IComment[];
}

const CommentSchema = new Schema<IComment>({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const PostSchema = new Schema<IPost>({
  title: String,
  content: String,
  author: Types.ObjectId,
  comments: [CommentSchema],
});

export default mongoose.model<IPost>("Post", PostSchema);
