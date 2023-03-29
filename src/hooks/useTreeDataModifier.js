function useTreeDataModifier() {
  function handleInsertNode(tree, Id, item, typeOfAdd) {
    if (tree.id === Id) {
      const newNode = {
        name: item,
        id: new Date().getTime(),
        items: [],
        isFolder: typeOfAdd === 'folder' ? true : false,
      };
      tree.items.unshift(newNode);
      return tree;
    } else {
      const finalResultTree = tree.items.map((node) => {
        return handleInsertNode(node, Id, item, typeOfAdd);
      });
      return { ...tree, items: finalResultTree };
    }
  }

  return { handleInsertNode };
}

export default useTreeDataModifier;
