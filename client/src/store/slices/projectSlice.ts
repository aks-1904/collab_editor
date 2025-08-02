import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type FileType = "file" | "folder";

interface BaseNode {
  id: string;
  name: string;
  type: FileType;
  createdAt: string;
  updatedAt: string;
}

interface FileNode extends BaseNode {
  type: "file";
  content?: string;
  language?: string;
}

interface FolderNode extends BaseNode {
  type: "folder";
  children: FileStructureNode[];
}

type FileStructureNode = FileNode | FolderNode;

export interface Project {
  _id: string;
  name: string;
  description: string;
  fileStructure?: FileStructureNode;
  owner: string;
  techs?: string[];
  members?: string[];
  isPublic: boolean;
  stars: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface ProjectSliceState {
  my_projects: Project[];
  collaborative_projects: Project[];
}

const initialState: ProjectSliceState = {
  my_projects: [],
  collaborative_projects: [],
};

const projectSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMyProjects: (state, action: PayloadAction<Project[]>) => {
      state.my_projects = action.payload;
    },
    setCollabProjects: (state, action: PayloadAction<Project[]>) => {
      state.collaborative_projects = action.payload;
    },
    addMyProject: (state, action: PayloadAction<Project>) => {
      state.my_projects.push(action.payload);
    },
    addCollabProjects: (state, action: PayloadAction<Project>) => {
      state.collaborative_projects.push(action.payload);
    },
  },
});

export const {
  setMyProjects,
  setCollabProjects,
  addMyProject,
  addCollabProjects,
} = projectSlice.actions;
export default projectSlice;
