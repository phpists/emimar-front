import React, { useState, useEffect, useRef, useMemo } from "react";
import { Tree } from "antd";
const { DirectoryTree } = Tree;

function findPathById(tree, id, path = [], keys = [], keyPath = "") {
  if (tree) {
    for (const node of tree) {
      const newPath = [...path, node];
      const newKeys = [
        ...keys,
        keyPath ? `${keyPath}/${node.name}` : node.name,
      ];
      if (node.id === id) {
        return { path: newPath, keys: newKeys };
      }
      if (node.children && node.children.length) {
        const result = findPathById(
          node.children,
          id,
          newPath,
          newKeys,
          keyPath ? `${keyPath}/${node.name}` : node.name
        );
        if (result) return result;
      }
    }
  }
  return null;
}

// Helper function to get all keys from the tree structure
function getAllKeys(nodes) {
  let keys = [];
  nodes.forEach(node => {
    keys.push(node.key);
    if (node.children && node.children.length) {
      keys = keys.concat(getAllKeys(node.children));
    }
  });
  return keys;
}

export function transformTree(data, parentPath = "") {
  return (
    data?.response?.tree?.map((item) => {
      const currentPath = parentPath ? `${parentPath}/${item.name}` : item.name;

      return {
        title: item.name,
        key: currentPath,
        id: item?.id,
        path: currentPath,
        children: transformTree(
          { response: { tree: item.children } },
          currentPath
        ),
      };
    }) || []
  );
}

export const FileThree = ({ nodes, selected, onSelect }) => {
  const [expandedKeys, setExpandedKeys] = useState([]);
  const hasExpandedOnce = useRef(false); // Flag to ensure default expansion only happens once

  const tree = useMemo(() => transformTree(nodes), [nodes]); // Memoize tree creation

  useEffect(() => {
    // Only expand all if nodes data is available and we haven't done it before
    if (nodes?.response?.tree && !hasExpandedOnce.current) {
      const allKeys = getAllKeys(tree);
      setExpandedKeys(allKeys);
      hasExpandedOnce.current = true; // Set flag to true after initial expansion
    }
  }, [nodes, tree]); // Depend on nodes and memoized tree

  useEffect(() => {
    // This effect handles selection, should run independently
    if (selected && nodes?.response?.tree) {
      const res = findPathById(nodes?.response?.tree, selected);
      if (res) {
        setExpandedKeys((prev) => {
          const newExpandedKeys = Array.from(new Set([...prev, ...res.keys.slice(0, -1)]));
          // Only update if truly different to avoid unnecessary re-renders
          if (JSON.stringify(newExpandedKeys) !== JSON.stringify(prev)) { // Deep comparison for arrays
            return newExpandedKeys;
          }
          return prev;
        });
      }
    }
  }, [selected, nodes]); // Don't depend on `tree` or `expandedKeys` directly here to avoid loops

  const onSelectFile = (keys, info) => {
    onSelect?.(info.node.id);
  };

  const onExpand = (newKeys) => {
    setExpandedKeys(newKeys);
  };

  const active = findPathById(nodes?.response?.tree, selected);
  const selectedKey = active?.keys?.[active.keys.length - 1] || "";

  return (
    <DirectoryTree
      onSelect={onSelectFile}
      onExpand={onExpand}
      treeData={tree}
      expandedKeys={expandedKeys}
      selectedKeys={selectedKey ? [selectedKey] : []}
    />
  );
};

// export function transformTree(data) {
//   return (
//     data?.response?.tree?.map((item, index) => ({
//       title: item.name,
//       key: `0-${index}`,
//       id: item?.id,
//       children: transformTree({ response: { tree: item.children } }),
//     })) || []
//   );
// }
