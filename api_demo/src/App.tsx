import { useState } from "react";
import "./App.css";
import Main from "./components/Main";
import Loader from "./components/Loader";

// Consider moving this interface to a shared types file since it's used in multiple components
interface FileNode {
  name: string;
  type: string;
  children?: FileNode[];
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  // Consider initializing with an empty tree structure instead of null for consistency
  const [tree, setTree] = useState<FileNode | null>(null);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Main handleLoading={setIsLoading} setTree={setTree} tree={tree} />
      )}
    </>
  );
}

export default App;
