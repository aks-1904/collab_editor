import {
  Code,
  File,
  FileText,
  Folder,
  FolderOpen,
  Image,
  Settings,
} from "lucide-react";

const FileIcon = ({ node, isOpen }: any) => {
  if (node.type === "folder") {
    return isOpen ? (
      <FolderOpen className="w-4 h-4 text-blue-400" />
    ) : (
      <Folder className="w-4 h-4 text-blue-400" />
    );
  }

  // Use language field if available, otherwise fallback to file extension
  const language = node.language || node.name.split(".").pop()?.toLowerCase();
  const iconProps = { className: "w-4 h-4" };

  switch (language) {
    case "javascript":
    case "js":
    case "jsx":
      return <Code {...iconProps} className="w-4 h-4 text-yellow-400" />;
    case "typescript":
    case "ts":
    case "tsx":
      return <Code {...iconProps} className="w-4 h-4 text-blue-400" />;
    case "json":
      return <Settings {...iconProps} className="w-4 h-4 text-green-400" />;
    case "markdown":
    case "md":
    case "txt":
    case "text":
      return <FileText {...iconProps} className="w-4 h-4 text-gray-400" />;
    case "css":
    case "scss":
    case "sass":
      return <Code {...iconProps} className="w-4 h-4 text-pink-400" />;
    case "html":
      return <Code {...iconProps} className="w-4 h-4 text-orange-400" />;
    case "python":
    case "py":
      return <Code {...iconProps} className="w-4 h-4 text-green-400" />;
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "svg":
      return <Image {...iconProps} className="w-4 h-4 text-purple-400" />;
    default:
      return <File {...iconProps} className="w-4 h-4 text-gray-400" />;
  }
};

export default FileIcon;
