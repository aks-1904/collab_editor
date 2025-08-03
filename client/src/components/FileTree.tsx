import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import FileIcon from "./icons/File";

const FileTree = ({ nodes, level = 0, onFileSelect, selectedFileId }: any) => {
  const [openFolders, setOpenFolders] = useState(
    new Set(["src-folder", "components-folder"])
  );

  const toggleFolder = (folderId: string) => {
    const newOpenFolders = new Set(openFolders);
    if (newOpenFolders.has(folderId)) {
      newOpenFolders.delete(folderId);
    } else {
      newOpenFolders.add(folderId);
    }
    setOpenFolders(newOpenFolders);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getFileSize = (content: string) => {
    if (!content) return "";
    const bytes = new Blob([content]).size;
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div>
      {nodes?.map((node: any) => (
        <div key={node?.id}>
          <div
            className={`flex items-center space-x-2 py-2 px-3 hover:bg-gray-800/30 rounded-lg cursor-pointer transition-all duration-200 ${
              node.type === "folder" ? "font-medium" : ""
            } ${
              selectedFileId === node.id
                ? "bg-blue-500/20 border border-blue-500/30"
                : ""
            }`}
            style={{ paddingLeft: `${level * 20 + 12}px` }}
            onClick={() => {
              if (node.type === "folder") {
                toggleFolder(node.id);
              } else {
                onFileSelect && onFileSelect(node);
              }
            }}
          >
            {node.type === "folder" && (
              <button className="text-gray-400 hover:text-white">
                {openFolders.has(node.id) ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </button>
            )}
            <FileIcon node={node} isOpen={openFolders.has(node.id)} />
            <span className="text-gray-300 text-sm flex-1">{node.name}</span>
            {node.type === "file" && node.content && (
              <span className="text-gray-500 text-xs">
                {getFileSize(node.content)}
              </span>
            )}
            <span
              className="text-gray-500 text-xs ml-2"
              title={`Updated: ${formatDate(node.updatedAt)}`}
            >
              {formatDate(node.updatedAt)}
            </span>
          </div>
          {node.type === "folder" &&
            node.children &&
            openFolders.has(node.id) && (
              <FileTree
                nodes={node.children}
                level={level + 1}
                onFileSelect={onFileSelect}
                selectedFileId={selectedFileId}
              />
            )}
        </div>
      ))}
    </div>
  );
};

export default FileTree;
