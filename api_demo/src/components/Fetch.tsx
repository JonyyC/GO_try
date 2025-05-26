interface FileNode {
  name: string;
  type: string;
  children?: FileNode[];
}

interface FetchProp {
  handleLoading: (loading: boolean) => void;
  setTree: (tree: FileNode) => void;
}

export default function Fetch({handleLoading, setTree}: FetchProp){
    
    function handleFetch(){
        handleLoading(true);
        setTimeout(() => {
            handleLoading(false);
        }, 5000);

        // call for backend;
        fetch("http://localhost:8081/api/tree")
        .then((res) => res.json())
        .then((data) => {
            const tree = {...data};
            setTree(tree);
            console.log("the tree inside fetch :" , tree)
        })
        .catch((err) => {
            console.error("Failed to fetch:", err);
        });
    }
    
    return(
        <section className="fetch">
            <h2>Press here to fetch the files</h2>
            <button className="fetch-button" onClick={handleFetch}>Fetch</button>
        </section>
    )
}