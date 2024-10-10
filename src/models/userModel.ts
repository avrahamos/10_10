import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";

export interface IUser extends Document {
  username: string;
  email: string;
  profile: {
    bio?: string;
    socialLinks?: string[];
  };
  posts: Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "Invalid email address",
      },
    },
    profile: {
      bio: { type: String, default: "" },
      socialLinks: [{ type: String }],
    },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", UserSchema);
