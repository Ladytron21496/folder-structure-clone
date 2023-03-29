import React, { useState } from 'react';
export default function Folder({ explorerData, addNode = () => {} }) {
  const [showFolderData, setShowFolderData] = useState(false);
  const [showInputBox, setShowInputBox] = useState(false);
  const [typeOfAdd, setTypeOfAdd] = useState(null);

  const handleAddButton = (type) => {
    setShowInputBox(!showInputBox);
    setTypeOfAdd(type);
  };

  const handleAddition = (e, typeOfAdd, folderId) => {
    if (e.key === 'Enter' && e.target.value != '') {
      addNode(folderId, e.target.value, typeOfAdd);
      setShowInputBox(false);
    }
  };

  if (explorerData.isFolder) {
    return (
      <div>
        <div
          style={{ backgroundColor: 'grey', padding: '5px', cursor: 'pointer' }}
          onClick={() => {
            setShowFolderData(!showFolderData);
          }}
        >
          <span style={{ marginRight: '10px' }}>📁 {explorerData.name} </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddButton('folder', explorerData.id);
            }}
          >
            Add Folder
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddButton('file', explorerData.id);
            }}
          >
            Add File
          </button>
        </div>
        <div style={{ paddingLeft: '10px' }}>
          {showInputBox && (
            <>
              <span>{typeOfAdd === 'folder' ? '📁' : '📄'} </span>
              <input
                onKeyDown={(e) => {
                  handleAddition(e, typeOfAdd, explorerData.id);
                }}
                autoFocus
                onBlur={() => {
                  setShowInputBox(false);
                }}
                type="text"
              />
            </>
          )}
        </div>
        <div
          style={{
            display: showFolderData ? 'block' : 'none',
            paddingLeft: '10px',
          }}
        >
          {explorerData.items.map((exp) => {
            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
                key={exp.id}
              >
                <Folder addNode={addNode} explorerData={exp} />
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div
          style={{
            backgroundColor: 'lightgrey',
            padding: '5px',
          }}
        >
          <span>📄 {explorerData.name}</span>
        </div>
      </div>
    );
  }
}
