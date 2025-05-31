import Fetch from "./Fetch";
import FilesTree from "./FilesTree";

// Consider moving this interface to a shared types file to avoid duplication
interface FileNode {
  name: string;
  type: string;
  children?: FileNode[];
}
interface MainProps {
  handleLoading: (loading: boolean) => void;
  setTree: (loading: FileNode) => void;
  // Avoid using 'any' type - should use FileNode | null to match App.tsx
  tree: any;
}

export default function Main({ handleLoading, setTree, tree }: MainProps) {
  // Remove
  console.log("Main tree state:", tree);

  return (
    <main>
      <Fetch handleLoading={handleLoading} setTree={setTree} />
      {tree && <FilesTree tree={tree} />}
    </main>
  );
}
