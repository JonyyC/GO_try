import { useState } from 'react'
import './App.css'
import Main from './components/Main';
import Loader from './components/Loader';

interface FileNode {
  name: string;
  type: string;
  children?: FileNode[];
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [tree, setTree] = useState<FileNode | null>(null);


  return (
    <>
    {isLoading ?  <Loader /> : <Main handleLoading={setIsLoading} setTree={setTree} tree={tree}/> }

    </>
  )
}

export default App
