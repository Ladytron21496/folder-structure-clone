import React, { useState } from 'react';
import './style.css';
import { explorerData } from './data/folderData.js';
import Folder from './Components/Folder.js';
import useTreeDataModifier from './hooks/useTreeDataModifier.js';

export default function App() {
  const [treeData, setTreeData] = useState(explorerData);
  const { handleInsertNode } = useTreeDataModifier();
  const handleInsertionNode = (id, item, isFolder) => {
    const finalTreeData = handleInsertNode(treeData, id, item, isFolder);
    setTreeData(finalTreeData);
  };

  return (
    <div>
      <h3>Folder Structure</h3>
      <div>
        <Folder addNode={handleInsertionNode} explorerData={treeData} />
      </div>
    </div>
  );
}
