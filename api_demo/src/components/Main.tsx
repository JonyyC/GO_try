
import Fetch from "./Fetch";
import FilesTree from "./FilesTree";

interface FileNode {
  name: string;
  type: string;
  children?: FileNode[];
}
interface MainProps {
  handleLoading: (loading: boolean) => void;
  setTree: (loading: FileNode) => void;
  tree:any;
}

export default function Main({handleLoading,setTree, tree}:MainProps){
    console.log("Main tree state:", tree);

    return(
        <main>
            <Fetch handleLoading={handleLoading} setTree={setTree} />
            {tree && <FilesTree tree={tree}/>}
        </main>
    )
}