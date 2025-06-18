import React, { useState, useEffect } from "react";
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

export function transformTree(data, parentPath = "") {
  return (
    data?.response?.tree?.map((item) => {
      const currentPath = parentPath ? `${parentPath}/${item.name}` : item.name;

      return {
        title: item.full_name,
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

function collectAllKeys(tree) {
  const keys = [];

  function traverse(nodes) {
    if (!nodes) return;
    for (const node of nodes) {
      keys.push(node.key);
      if (node.children) traverse(node.children);
    }
  }

  traverse(tree);
  return keys;
}

export const FileThree = ({ nodes, selected, onSelect }) => {
  const [expandedKeys, setExpandedKeys] = useState([]);

  const tree = transformTree(nodes);

  useEffect(() => {
    if (tree.length > 0) {
      const allKeys = collectAllKeys(tree);
      // Перевіряємо: чи вже всі ключі є в expandedKeys
      if (expandedKeys.length === 0) {
        setExpandedKeys(allKeys);
      }
    }
  }, [tree , expandedKeys.length]);

  useEffect(() => {
    if (selected && nodes?.response?.tree) {
      const res = findPathById(nodes?.response?.tree, selected);
      if (res) {
        const keysToAdd = res.keys.slice(0, -1).filter(k => !expandedKeys.includes(k));
        if (keysToAdd.length > 0) {
          setExpandedKeys(prev => Array.from(new Set([...prev, ...keysToAdd])));
        }
      }
    }
  }, [selected, nodes , expandedKeys]);

  const onSelectFile = (keys, info) => {
      const clickedId = info.node.id;
    onSelect?.(clickedId);
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
