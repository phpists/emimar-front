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
  const tree = transformTree(nodes);

  const selectedId = typeof selected === "object" ? selected?.id : selected;
  const active = findPathById(nodes?.response?.tree, selectedId);
  const selectedKey = active?.keys?.[active.keys.length - 1] || "";

  useEffect(() => {
    if (selectedId && active?.keys) {
      setExpandedKeys((prev) => {
        return Array.from(new Set([...prev, ...active.keys.slice(0, -1)]));
      });
    }
  }, [selectedId]);

  const onSelectFile = (keys, info) => {
    if (info.node?.id) {
      onSelect?.({ id: info.node.id });
    }
  };

  const onExpand = (newKeys) => {
    setExpandedKeys(newKeys);
  };

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
