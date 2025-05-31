// This type repeats itself - extrac
interface FileNode {
  name: string;
  type: string;
  children?: FileNode[];
}

interface FetchProp {
  handleLoading: (loading: boolean) => void;
  setTree: (tree: FileNode) => void;
}

export default function Fetch({ handleLoading, setTree }: FetchProp) {
  function handleFetch() {
    handleLoading(true);
    setTimeout(() => {
      handleLoading(false);
    }, 5000);

    // Hardcoded URL should be in an environment variable or config file
    fetch("http://localhost:8081/api/tree")
      .then((res) => res.json())
      .then((data) => {
        // Unnecessary object spread, can just use data directly
        const tree = { ...data };
        setTree(tree);
        // Console.log statements should be removed in production code
        console.log("the tree inside fetch :", tree);
      })
      .catch((err) => {
        console.error("Failed to fetch:", err);
        // Missing error handling UI - should show error message to user
      });
  }

  return (
    <section className="fetch">
      <h2>Press here to fetch the files</h2>
      <button className="fetch-button" onClick={handleFetch}>
        Fetch
      </button>
    </section>
  );
}
