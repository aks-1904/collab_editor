import { Schema, model } from "mongoose";

// File Schema
const FileSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["file", "folder"], required: true },
  content: { type: String, default: "" }, // For files only
  children: [{ type: Schema.Types.ObjectId, ref: "File" }], // For folders
  parent: { type: Schema.Types.ObjectId, ref: "File" }, // For tree structure
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Project Schema
const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },

    // Store MySQL user IDs as strings (or number if you're using INT)
    ownerId: { type: String, required: true }, // MySQL user ID

    members: [
      {
        userId: { type: String }, // MySQL user ID
        role: {
          type: String,
          enum: ["admin", "editor", "viewer"],
          default: "editor",
        },
      },
    ],

    rootFile: { type: Schema.Types.ObjectId, ref: "File" },

    isPublic: { type: Boolean, default: false },
    lastAccessed: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Export models
export const File = model("File", FileSchema);
export const Project = model("Project", ProjectSchema);
