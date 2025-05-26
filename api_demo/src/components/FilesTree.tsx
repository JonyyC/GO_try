import {useEffect, useState } from "react";

interface FileNode {
  name: string;
  type: string;
  children?: FileNode[];
}
interface FilesTreeProps {
  tree: FileNode;
}
interface Rendertree {
  node: FileNode;
  level:number;
  filter:string;
}

export default function FilesTree({tree}:FilesTreeProps){
    const [inputValue, setInput] = useState("");
    const [filter, setFilter] = useState("");
    useEffect(()=>{
      const timeOutDebounce = setTimeout(()=>{
        setFilter(inputValue.toLowerCase());
      }, 400)

      return () => clearTimeout(timeOutDebounce);
    },[inputValue])

    return(
      <>
        <div className="filter"><input
          type="text"
          placeholder="Filter by name..."
          value={inputValue}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
        <div className="tree">
          <RenderTree key={0} node={tree} level={0} filter={filter}></RenderTree>
        </div>
      </>

    )

}

function RenderTree({node, level, filter} : Rendertree){
  const [isPressed, setIsPressed] = useState(true);
  function handleButton(){
    setIsPressed(prev => !prev);
  }
  const isFolder = node.type === "folder";
  let paddingLeft;
  if(isFolder){
    level +=1;
    paddingLeft = `${(level-1) * 20}px`;
  }else{
    paddingLeft = `${level * 20}px`;
  }

  const filteredChildren = node.children?.filter((child) => filterNodes(child, filter));
  if(!filterNodes(node, filter) && (!filteredChildren || filteredChildren.length ===0)){
    return null;
  }

  return (
    <div style={{paddingLeft}}>
        <span> {level > 0 ? '|': ''} {'---'} 
          {isFolder ? <button className="folder-button" onClick={handleButton}>
            📁
          </button> : "📄"} 
          {node.name} 
          {isFolder ? ' \\' : '' }
        </span>
        {isFolder && 
        isPressed && 
        node.children?.map((child,index) =>(
          <RenderTree key={index + 1} node={child} level={level} filter={filter}></RenderTree>
        ))}
    </div>

  )
}

function filterNodes(node:FileNode, filter:string): boolean{
  if(node.name.toLowerCase().includes(filter)){
    return true;
  }
  if (node.children){
    return node.children.some((child) => filterNodes(child, filter));
  }
  return false;
}