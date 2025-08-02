const gradientCombos = [
  "from-green-500 to-blue-500",
  "from-pink-500 to-rose-500",
  "from-blue-500 to-indigo-500",
  "from-emerald-500 to-teal-500",
  "from-violet-500 to-purple-500",
];

export function getRandomGradient(): string {
  return gradientCombos[Math.floor(Math.random() * gradientCombos.length)];
}

export const countFiles = (nodes: any) => {
  let count = 0;
  nodes.forEach((node: any) => {
    if (node.type === "file") {
      count++;
    } else if (node.children) {
      count += countFiles(node.children);
    }
  });
  return count;
};

export const getTotalSize = (nodes: any) => {
  let totalBytes = 0;
  nodes.forEach((node: any) => {
    if (node.type === "file" && node.content) {
      totalBytes += new Blob([node.content]).size;
    } else if (node.children) {
      totalBytes += getTotalSize(node.children) as unknown as number;
    }
  });

  if (totalBytes < 1024) return `${totalBytes} B`;
  if (totalBytes < 1024 * 1024) return `${(totalBytes / 1024).toFixed(1)} KB`;
  return `${(totalBytes / (1024 * 1024)).toFixed(1)} MB`;
};
