import mongoose, { Schema, Document } from "mongoose";

export type FileType = "file" | "folder";

export interface BaseNode {
  id: string;
  name: string;
  type: FileType;
  createdAt: string;
  updatedAt: string;
}

export interface FileNode extends BaseNode {
  type: "file";
  content?: string;
  language?: string;
}

export interface FolderNode extends BaseNode {
  type: "folder";
  children: FileStructureNode[];
}

type FileStructureNode = FileNode | FolderNode;

// Project document interface
export interface IProject extends Document {
  name: string;
  description: string;
  owner: string; // userId
  members: string[]; // Array of userId
  fileStructure?: FileStructureNode;
  isPublic: boolean;
  stars: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    owner: {
      type: String,
      required: true,
    },
    members: {
      type: [String],
      default: [],
    },
    fileStructure: {
      type: Schema.Types.Mixed, // Stored as raw JSON
      required: true,
      default: {},
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    stars: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model<IProject>("Project", ProjectSchema);
